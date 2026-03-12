// ---------------------------------------------------------------------------
// Webhook handler: Shopify order created → create Sales Order in ERPNext
// ---------------------------------------------------------------------------

import { prisma } from "@/lib/db";
import { createSalesOrder } from "@/lib/erp/erpnext";

interface ShopifyLineItem {
  sku: string;
  quantity: number;
  price: string;
}

interface ShopifyOrderPayload {
  id: number;
  email: string;
  line_items: ShopifyLineItem[];
}

export async function handleOrderCreated(payload: ShopifyOrderPayload) {
  const syncEvent = await prisma.syncEvent.create({
    data: {
      type: "order_sync",
      direction: "shopify_to_erp",
      status: "processing",
      externalId: String(payload.id),
      payload: payload as unknown as Record<string, unknown>,
    },
  });

  try {
    // Map Shopify SKUs to ERPNext item codes via SkuMapping table
    const mappedItems: { itemCode: string; qty: number; rate: number }[] = [];
    const unmappedSkus: string[] = [];

    for (const item of payload.line_items) {
      const mapping = await prisma.skuMapping.findFirst({
        where: { shopifyVariantId: item.sku },
      });

      if (mapping) {
        mappedItems.push({
          itemCode: mapping.erpItemCode,
          qty: item.quantity,
          rate: parseFloat(item.price),
        });
      } else {
        unmappedSkus.push(item.sku);
      }
    }

    if (unmappedSkus.length > 0) {
      console.warn(`Unmapped SKUs for order ${payload.id}: ${unmappedSkus.join(", ")}`);
    }

    if (mappedItems.length === 0) {
      throw new Error(`No items could be mapped for order ${payload.id}`);
    }

    const salesOrder = await createSalesOrder({
      customerEmail: payload.email,
      items: mappedItems,
    });

    await prisma.syncEvent.update({
      where: { id: syncEvent.id },
      data: {
        status: "completed",
        processedAt: new Date(),
        externalId: `shopify:${payload.id}|erp:${salesOrder.name}`,
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
