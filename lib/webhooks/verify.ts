// ---------------------------------------------------------------------------
// Webhook verification — HMAC (Shopify) and shared secret (ERPNext)
// ---------------------------------------------------------------------------

import crypto from "crypto";

// Verify Shopify webhook HMAC-SHA256 signature
export function verifyShopifyWebhook(rawBody: string, hmacHeader: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) throw new Error("Missing SHOPIFY_WEBHOOK_SECRET env var");

  const hash = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  return crypto.timingSafeEqual(
    Buffer.from(hash, "base64"),
    Buffer.from(hmacHeader, "base64"),
  );
}

// Verify ERPNext webhook shared secret
export function verifyErpNextWebhook(authHeader: string | null): boolean {
  const secret = process.env.ERPNEXT_WEBHOOK_SECRET;
  if (!secret) throw new Error("Missing ERPNEXT_WEBHOOK_SECRET env var");
  if (!authHeader) return false;

  const token = authHeader.replace(/^Bearer\s+/i, "");

  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(secret),
  );
}
