// ---------------------------------------------------------------------------
// Webhook: ERPNext stock update → update Shopify inventory
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import { verifyErpNextWebhook } from "@/lib/webhooks/verify";
import { enqueueWebhookJob } from "@/lib/webhooks/queue";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  // Verify shared secret
  const authHeader = req.headers.get("authorization");
  if (!verifyErpNextWebhook(authHeader)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const idempotencyKey = `erpnext-stock-${payload.item_code}-${Date.now()}`;

  // Log the webhook
  await prisma.webhookLog.create({
    data: {
      source: "erpnext",
      event: "stock_update",
      idempotencyKey,
      status: "received",
    },
  });

  // Enqueue for async processing
  await enqueueWebhookJob("stock-update", payload, idempotencyKey);

  return NextResponse.json({ ok: true });
}
