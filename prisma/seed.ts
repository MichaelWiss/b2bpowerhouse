// ---------------------------------------------------------------------------
// Prisma seed — populate SKU mappings between Shopify ↔ ERPNext
// ---------------------------------------------------------------------------

import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Example seed data — replace with your actual SKU mappings
  const mappings = [
    {
      shopifyProductId: "gid://shopify/Product/1",
      shopifyVariantId: "gid://shopify/ProductVariant/1",
      shopifyInventoryItemId: "gid://shopify/InventoryItem/1",
      erpItemCode: "ITEM-001",
      sanityHandle: "example-product",
    },
  ];

  for (const mapping of mappings) {
    await prisma.skuMapping.upsert({
      where: { shopifyVariantId: mapping.shopifyVariantId },
      update: mapping,
      create: mapping,
    });
  }

  console.log(`Seeded ${mappings.length} SKU mappings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
