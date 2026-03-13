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

// ---------------------------------------------------------------------------
// Fulfillment — create a fulfillment on a Shopify order with tracking info
// ---------------------------------------------------------------------------

interface FulfillmentLineItem {
  id: string;       // Shopify fulfillment order line item ID
  quantity: number;
}

interface CreateFulfillmentResult {
  fulfillmentCreateV2: {
    fulfillment: { id: string; status: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
}

// Get the fulfillment order(s) for a Shopify order — needed before creating fulfillments
export async function getFulfillmentOrders(orderId: string) {
  const query = `
    query getFulfillmentOrders($orderId: ID!) {
      order(id: $orderId) {
        fulfillmentOrders(first: 10) {
          edges {
            node {
              id
              status
              lineItems(first: 50) {
                edges {
                  node {
                    id
                    remainingQuantity
                    lineItem {
                      sku
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return shopifyAdminFetch<{
    order: {
      fulfillmentOrders: {
        edges: {
          node: {
            id: string;
            status: string;
            lineItems: {
              edges: {
                node: {
                  id: string;
                  remainingQuantity: number;
                  lineItem: { sku: string | null };
                };
              }[];
            };
          };
        }[];
      };
    };
  }>(query, { orderId });
}

// Create a fulfillment with optional tracking info
export async function createFulfillment(
  fulfillmentOrderId: string,
  lineItems: FulfillmentLineItem[],
  trackingInfo?: { number: string; company: string; url?: string },
) {
  const mutation = `
    mutation fulfillmentCreateV2($fulfillment: FulfillmentV2Input!) {
      fulfillmentCreateV2(fulfillment: $fulfillment) {
        fulfillment {
          id
          status
        }
        userErrors { field message }
      }
    }
  `;

  const fulfillment: Record<string, unknown> = {
    lineItemsByFulfillmentOrder: [
      {
        fulfillmentOrderId,
        fulfillmentOrderLineItems: lineItems.map((li) => ({
          id: li.id,
          quantity: li.quantity,
        })),
      },
    ],
    notifyCustomer: true,
  };

  if (trackingInfo) {
    fulfillment.trackingInfo = {
      number: trackingInfo.number,
      company: trackingInfo.company,
      ...(trackingInfo.url && { url: trackingInfo.url }),
    };
  }

  const result = await shopifyAdminFetch<CreateFulfillmentResult>(mutation, {
    fulfillment,
  });

  if (result.fulfillmentCreateV2.userErrors.length > 0) {
    throw new Error(
      `Shopify fulfillment error: ${result.fulfillmentCreateV2.userErrors.map((e) => e.message).join(", ")}`,
    );
  }

  return result.fulfillmentCreateV2.fulfillment;
}
