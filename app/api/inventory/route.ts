// ---------------------------------------------------------------------------
// API Route: ERP inventory proxy (for client-side stock checks)
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import { getStockLevel } from "@/lib/erp/erpnext";
import { z } from "zod";

const querySchema = z.object({
  sku: z.string().min(1).max(100),
});

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("sku");
  const parsed = querySchema.safeParse({ sku: raw });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid SKU parameter" }, { status: 400 });
  }

  try {
    const stock = await getStockLevel(parsed.data.sku);
    return NextResponse.json(
      stock ?? { actual_qty: 0, warehouse: null, item_code: parsed.data.sku },
      { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" } },
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 502 });
  }
}
