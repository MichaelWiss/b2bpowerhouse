// ---------------------------------------------------------------------------
// ERPNext REST API client — typed, safe (no string interpolation in filters)
// ---------------------------------------------------------------------------

import type { ErpStockLevel, ErpSalesOrder, ErpDeliveryNote } from "./types";

const ERP_BASE = process.env.ERPNEXT_URL;
const ERP_KEY = process.env.ERPNEXT_API_KEY;
const ERP_SECRET = process.env.ERPNEXT_API_SECRET;

async function erpFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (!ERP_BASE || !ERP_KEY || !ERP_SECRET) {
    throw new Error("Missing ERPNext env vars (ERPNEXT_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET)");
  }

  const res = await fetch(`${ERP_BASE}/api/resource/${endpoint}`, {
    ...options,
    headers: {
      Authorization: `token ${ERP_KEY}:${ERP_SECRET}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`ERPNext API error ${res.status}: ${res.statusText} — ${body}`);
  }

  return res.json() as Promise<T>;
}

// Get stock level for an item — uses URLSearchParams, not string interpolation
export async function getStockLevel(itemCode: string): Promise<ErpStockLevel | null> {
  const params = new URLSearchParams({
    filters: JSON.stringify([["item_code", "=", itemCode]]),
    fields: JSON.stringify(["actual_qty", "warehouse", "item_code"]),
  });

  const data = await erpFetch<{ data: ErpStockLevel[] }>(`Bin?${params}`);
  return data.data[0] ?? null;
}

// Create a Sales Order from a Shopify order
export async function createSalesOrder(order: {
  customerEmail: string;
  items: { itemCode: string; qty: number; rate: number }[];
  shopifyOrderId?: string;
}): Promise<ErpSalesOrder> {
  const deliveryDate = new Date(Date.now() + 7 * 86_400_000)
    .toISOString()
    .split("T")[0];

  const data = await erpFetch<{ data: ErpSalesOrder }>("Sales Order", {
    method: "POST",
    body: JSON.stringify({
      customer: order.customerEmail,
      delivery_date: deliveryDate,
      ...(order.shopifyOrderId && { custom_shopify_order_id: order.shopifyOrderId }),
      items: order.items.map((item) => ({
        item_code: item.itemCode,
        qty: item.qty,
        rate: item.rate,
      })),
    }),
  });

  return data.data;
}

// Get order history for a customer
export async function getOrderHistory(customerId: string): Promise<ErpSalesOrder[]> {
  const params = new URLSearchParams({
    filters: JSON.stringify([["customer", "=", customerId]]),
    fields: JSON.stringify(["name", "customer", "grand_total", "status", "creation"]),
    order_by: "creation desc",
    limit_page_length: "50",
  });

  const data = await erpFetch<{ data: ErpSalesOrder[] }>(`Sales Order?${params}`);
  return data.data;
}

// Get Delivery Notes for a Sales Order (supports partial fulfillment)
export async function getDeliveryNotes(salesOrderName: string): Promise<ErpDeliveryNote[]> {
  const params = new URLSearchParams({
    filters: JSON.stringify([["items.against_sales_order", "=", salesOrderName]]),
    fields: JSON.stringify([
      "name", "customer", "status", "docstatus", "posting_date",
      "custom_tracking_number", "custom_carrier", "custom_shopify_order_id",
    ]),
    order_by: "posting_date desc",
  });

  const data = await erpFetch<{ data: ErpDeliveryNote[] }>(`Delivery Note?${params}`);
  return data.data;
}

// Get a single Delivery Note with its line items
export async function getDeliveryNote(name: string): Promise<ErpDeliveryNote> {
  const data = await erpFetch<{ data: ErpDeliveryNote }>(`Delivery Note/${encodeURIComponent(name)}`);
  return data.data;
}
