// ---------------------------------------------------------------------------
// Webhook: ERPNext Delivery Note submitted → create Shopify fulfillment
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

  // Validate required fields
  if (!payload.delivery_note || !payload.sales_order) {
    return NextResponse.json(
      { error: "Missing required fields: delivery_note, sales_order" },
      { status: 400 },
    );
  }

  // Use delivery_note name as idempotency key (one fulfillment per DN)
  const idempotencyKey = `erpnext-fulfillment-${payload.delivery_note}`;

  // Check for duplicate
  const existing = await prisma.webhookLog.findUnique({
    where: { idempotencyKey },
  });
  if (existing) {
    return NextResponse.json({ status: "duplicate" }, { status: 200 });
  }

  // Log the webhook
  await prisma.webhookLog.create({
    data: {
      source: "erpnext",
      event: "fulfillment_update",
      idempotencyKey,
      status: "received",
    },
  });

  // Enqueue for async processing
  await enqueueWebhookJob("fulfillment-update", payload, idempotencyKey);

  return NextResponse.json({ ok: true });
}
