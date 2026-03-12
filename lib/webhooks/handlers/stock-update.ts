// ---------------------------------------------------------------------------
// Webhook handler: ERPNext stock update → update Shopify inventory
// ---------------------------------------------------------------------------

import { prisma } from "@/lib/db";
import { setInventoryQuantity } from "@/lib/shopify/admin";

interface StockUpdatePayload {
  item_code: string;
  actual_qty: number;
}

export async function handleStockUpdate(payload: StockUpdatePayload) {
  const syncEvent = await prisma.syncEvent.create({
    data: {
      type: "inventory_sync",
      direction: "erp_to_shopify",
      status: "processing",
      externalId: payload.item_code,
      payload: payload as unknown as Record<string, unknown>,
    },
  });

  try {
    // Look up Shopify inventory item ID from SKU mapping
    const mapping = await prisma.skuMapping.findUnique({
      where: { erpItemCode: payload.item_code },
    });

    if (!mapping || !mapping.shopifyInventoryItemId) {
      throw new Error(`No SKU mapping found for ERPNext item: ${payload.item_code}`);
    }

    const locationId = process.env.SHOPIFY_LOCATION_ID;
    if (!locationId) throw new Error("Missing SHOPIFY_LOCATION_ID env var");

    await setInventoryQuantity(
      mapping.shopifyInventoryItemId,
      locationId,
      payload.actual_qty,
    );

    await prisma.syncEvent.update({
      where: { id: syncEvent.id },
      data: {
        status: "completed",
        processedAt: new Date(),
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
    throw error;
  }
}
