// ---------------------------------------------------------------------------
// Webhook: Shopify order/created → enqueue for ERPNext sync
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import { verifyShopifyWebhook } from "@/lib/webhooks/verify";
import { enqueueWebhookJob } from "@/lib/webhooks/queue";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const hmac = req.headers.get("x-shopify-hmac-sha256") ?? "";
  const webhookId = req.headers.get("x-shopify-webhook-id") ?? "";

  // Verify HMAC signature
  if (!verifyShopifyWebhook(rawBody, hmac)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Idempotency check
  if (webhookId) {
    const existing = await prisma.webhookLog.findUnique({
      where: { idempotencyKey: webhookId },
    });
    if (existing) {
      return NextResponse.json({ status: "duplicate" }, { status: 200 });
    }
  }

  // Log the webhook
  const idempotencyKey = webhookId || `shopify-order-${Date.now()}`;
  await prisma.webhookLog.create({
    data: {
      source: "shopify",
      event: "orders/create",
      idempotencyKey,
      status: "received",
    },
  });

  // Enqueue for async processing (pg-boss handles retries)
  const payload = JSON.parse(rawBody);
  await enqueueWebhookJob("order-created", payload, idempotencyKey);

  return NextResponse.json({ ok: true });
}
