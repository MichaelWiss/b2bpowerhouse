// ---------------------------------------------------------------------------
// Webhook handler: ERPNext Delivery Note submitted → create Shopify fulfillment
// ---------------------------------------------------------------------------

import { prisma } from "@/lib/db";
import { getDeliveryNote } from "@/lib/erp/erpnext";
import { getFulfillmentOrders, createFulfillment } from "@/lib/shopify/admin";

interface FulfillmentUpdatePayload {
  delivery_note: string;        // ERPNext Delivery Note name (e.g., "MAT-DN-00001")
  sales_order: string;          // ERPNext Sales Order name
  tracking_number?: string;
  carrier?: string;
}

export async function handleFulfillmentUpdate(payload: FulfillmentUpdatePayload) {
  // Check if we've already processed this Delivery Note
  const existing = await prisma.fulfillmentSync.findUnique({
    where: { erpDeliveryNoteName: payload.delivery_note },
  });
  if (existing?.status === "fulfilled") return;

  const syncEvent = await prisma.syncEvent.create({
    data: {
      type: "fulfillment_sync",
      direction: "erp_to_shopify",
      status: "processing",
      externalId: payload.delivery_note,
      payload: payload as unknown as Record<string, unknown>,
    },
  });

  try {
    // Fetch the full Delivery Note from ERPNext to get line items
    const deliveryNote = await getDeliveryNote(payload.delivery_note);

    // Look up the Shopify order ID from the Sales Order mapping
    // We stored it as "shopify:{id}|erp:{name}" in SyncEvent when the order was created
    const orderSyncEvent = await prisma.syncEvent.findFirst({
      where: {
        type: "order_sync",
        status: "completed",
        externalId: { contains: `erp:${payload.sales_order}` },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!orderSyncEvent?.externalId) {
      throw new Error(`No completed order sync found for Sales Order: ${payload.sales_order}`);
    }

    // Extract Shopify order ID from "shopify:123456|erp:SO-00001"
    const shopifyOrderNumericId = orderSyncEvent.externalId.split("|")[0]?.replace("shopify:", "");
    if (!shopifyOrderNumericId) {
      throw new Error(`Could not parse Shopify order ID from: ${orderSyncEvent.externalId}`);
    }
    const shopifyOrderGid = `gid://shopify/Order/${shopifyOrderNumericId}`;

    // Create or update FulfillmentSync record
    const fulfillmentSync = existing
      ? existing
      : await prisma.fulfillmentSync.create({
          data: {
            erpDeliveryNoteName: payload.delivery_note,
            erpSalesOrderName: payload.sales_order,
            shopifyOrderId: shopifyOrderGid,
            trackingNumber: payload.tracking_number ?? deliveryNote.custom_tracking_number,
            carrier: payload.carrier ?? deliveryNote.custom_carrier,
            status: "pending",
          },
        });

    // Get Shopify fulfillment orders for this order
    const fulfillmentData = await getFulfillmentOrders(shopifyOrderGid);
    const fulfillmentOrders = fulfillmentData.order.fulfillmentOrders.edges;

    if (fulfillmentOrders.length === 0) {
      throw new Error(`No fulfillment orders found for Shopify order: ${shopifyOrderGid}`);
    }

    // Match Delivery Note items to Shopify fulfillment order line items by SKU
    const deliveryItemSkus = new Map<string, number>();
    for (const item of deliveryNote.items) {
      // Look up Shopify variant ID from ERPNext item code
      const mapping = await prisma.skuMapping.findUnique({
        where: { erpItemCode: item.item_code },
      });
      if (mapping) {
        deliveryItemSkus.set(mapping.shopifyVariantId, item.qty);
      }
    }

    // Find the first fulfillment order with OPEN or IN_PROGRESS status
    const openFO = fulfillmentOrders.find(
      (fo) => fo.node.status === "OPEN" || fo.node.status === "IN_PROGRESS",
    );

    if (!openFO) {
      throw new Error(`No open fulfillment orders for Shopify order: ${shopifyOrderGid}`);
    }

    // Map line items to fulfill based on SKU match
    const lineItemsToFulfill = openFO.node.lineItems.edges
      .filter((li) => {
        const sku = li.node.lineItem.sku;
        return sku && deliveryItemSkus.has(sku) && li.node.remainingQuantity > 0;
      })
      .map((li) => ({
        id: li.node.id,
        quantity: Math.min(
          deliveryItemSkus.get(li.node.lineItem.sku!)!,
          li.node.remainingQuantity,
        ),
      }));

    if (lineItemsToFulfill.length === 0) {
      throw new Error(
        `No matching line items to fulfill for Delivery Note: ${payload.delivery_note}`,
      );
    }

    // Build tracking info if available
    const trackingNumber = payload.tracking_number ?? deliveryNote.custom_tracking_number;
    const carrier = payload.carrier ?? deliveryNote.custom_carrier;
    const trackingInfo = trackingNumber && carrier
      ? { number: trackingNumber, company: carrier }
      : undefined;

    // Create the fulfillment in Shopify (triggers buyer notification automatically)
    const fulfillment = await createFulfillment(
      openFO.node.id,
      lineItemsToFulfill,
      trackingInfo,
    );

    // Update FulfillmentSync with Shopify fulfillment ID
    await prisma.fulfillmentSync.update({
      where: { id: fulfillmentSync.id },
      data: {
        shopifyFulfillmentId: fulfillment?.id ?? null,
        trackingNumber: trackingNumber ?? null,
        carrier: carrier ?? null,
        status: "fulfilled",
      },
    });

    await prisma.syncEvent.update({
      where: { id: syncEvent.id },
      data: {
        status: "completed",
        processedAt: new Date(),
        externalId: `dn:${payload.delivery_note}|fulfillment:${fulfillment?.id ?? "unknown"}`,
      },
    });
  } catch (error) {
    await prisma.syncEvent.update({
      where: { id: syncEvent.id },
      data: {
        status: "failed",
        lastError: error instanceof Error ? error.message : String(error),
        retryCount: { increment: 1 },
      },
    });
    throw error; // pg-boss will retry
  }
}
