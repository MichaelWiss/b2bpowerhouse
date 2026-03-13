// ---------------------------------------------------------------------------
// ERPNext types
// ---------------------------------------------------------------------------

export interface ErpStockLevel {
  item_code: string;
  actual_qty: number;
  warehouse: string;
}

export interface ErpSalesOrderItem {
  item_code: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface ErpSalesOrder {
  name: string;
  customer: string;
  grand_total: number;
  status: string;
  creation: string;
  delivery_date?: string;
  items?: ErpSalesOrderItem[];
  custom_shopify_order_id?: string;
}

// ---------------------------------------------------------------------------
// Delivery Note — created from a Sales Order when items ship
// ---------------------------------------------------------------------------

export interface ErpDeliveryNoteItem {
  item_code: string;
  qty: number;
  against_sales_order: string; // Sales Order name this fulfills
  rate: number;
  amount: number;
}

export interface ErpDeliveryNote {
  name: string;
  customer: string;
  status: string;              // "Draft" | "To Bill" | "Completed" | "Cancelled"
  docstatus: number;           // 0=Draft, 1=Submitted, 2=Cancelled
  posting_date: string;
  custom_tracking_number?: string;
  custom_carrier?: string;
  custom_shopify_order_id?: string;
  against_sales_order?: string;
  items: ErpDeliveryNoteItem[];
}
