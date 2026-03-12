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
}
