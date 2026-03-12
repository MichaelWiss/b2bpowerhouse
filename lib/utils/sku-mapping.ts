// ---------------------------------------------------------------------------
// SKU mapping helpers — look up mappings between Shopify ↔ ERPNext
// ---------------------------------------------------------------------------

import { prisma } from "@/lib/db";

export async function getErpItemCode(shopifyVariantId: string): Promise<string | null> {
  const mapping = await prisma.skuMapping.findUnique({
    where: { shopifyVariantId },
  });
  return mapping?.erpItemCode ?? null;
}

export async function getShopifyVariantId(erpItemCode: string): Promise<string | null> {
  const mapping = await prisma.skuMapping.findUnique({
    where: { erpItemCode },
  });
  return mapping?.shopifyVariantId ?? null;
}

export async function getInventoryItemId(erpItemCode: string): Promise<string | null> {
  const mapping = await prisma.skuMapping.findUnique({
    where: { erpItemCode },
  });
  return mapping?.shopifyInventoryItemId ?? null;
}
