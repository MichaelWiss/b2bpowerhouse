import { createStorefrontApiClient } from "@shopify/storefront-api-client";

if (!process.env.SHOPIFY_STORE_DOMAIN) {
  throw new Error("Missing SHOPIFY_STORE_DOMAIN env var");
}
if (!process.env.SHOPIFY_STOREFRONT_TOKEN) {
  throw new Error("Missing SHOPIFY_STOREFRONT_TOKEN env var");
}

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: "2025-01",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
});
