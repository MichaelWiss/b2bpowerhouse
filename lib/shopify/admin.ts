// ---------------------------------------------------------------------------
// Shopify Admin API client — used for inventory sync (server-side only)
// ---------------------------------------------------------------------------

const SHOPIFY_ADMIN_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-01/graphql.json`;

export async function shopifyAdminFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(SHOPIFY_ADMIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify Admin API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify Admin GraphQL error: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

// Update inventory for a specific item at a specific location
export async function setInventoryQuantity(
  inventoryItemId: string,
  locationId: string,
  quantity: number,
) {
  const mutation = `
    mutation inventorySetQuantities($input: InventorySetQuantitiesInput!) {
      inventorySetQuantities(input: $input) {
        inventoryAdjustmentGroup {
          reason
        }
        userErrors { field message }
      }
    }
  `;

  return shopifyAdminFetch(mutation, {
    input: {
      reason: "correction",
      name: "available",
      quantities: [
        {
          inventoryItemId,
          locationId,
          quantity: Math.floor(quantity),
        },
      ],
    },
  });
}
