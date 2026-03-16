# B2B Powerhouse — Project Context

## Overview

AI-powered B2B wholesale platform for premium gym equipment. Business buyers browse products, see customer-specific pricing, place orders, and reorder via an AI assistant. The platform orchestrates three external systems through a Next.js App Router frontend backed by PostgreSQL.

**Tech Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · Prisma 7 · PostgreSQL (Neon) · pg-boss

---

## Architecture

```
┌─────────────┐   ┌──────────────┐   ┌────────────────┐
│  Sanity CMS  │   │   Shopify    │   │    ERPNext     │
│  (content)   │   │  (commerce)  │   │  (inventory/   │
│  FREE tier   │   │  DEV store   │   │   fulfillment) │
└──────┬───────┘   └──────┬───────┘   └───────┬────────┘
       │                  │                    │
       └──────────┬───────┴────────────┬───────┘
                  │                    │
           ┌──────▼────────────────────▼──────┐
           │     Next.js App Router           │
           │     Vercel Hobby (FREE)          │
           │   ┌───────────┐ ┌─────────────┐  │
           │   │ API Routes│ │  Server      │  │
           │   │ (webhooks,│ │  Components  │  │
           │   │  proxy)   │ │  (pages)     │  │
           │   └───────────┘ └─────────────┘  │
           │   ┌───────────┐ ┌─────────────┐  │
           │   │ pg-boss   │ │ Neon Postgres│  │
           │   │ (jobs)    │ │  FREE tier   │  │
           │   └───────────┘ └─────────────┘  │
           └──────────────┬───────────────────┘
                          │
                   ┌──────▼──────┐
                   │  B2B Buyer  │
                   └─────────────┘
```

### Data Ownership

| System | Owns |
|--------|------|
| **Shopify** | Pricing, cart, checkout, payment terms (net-30/60), company accounts, B2B catalogs |
| **Sanity CMS** | Product descriptions, spec sheets (PDFs), compliance docs, rich media |
| **ERPNext** | Inventory levels, warehouse locations, sales orders, purchase orders, fulfillment |
| **Next.js + Postgres** | SKU mappings, sync status, webhook logs, AI conversation history |

---

## Core Data Flows

### Order Creation
1. Customer creates order in Shopify (B2B buyer)
2. Shopify fires `orders/create` webhook → `POST /api/webhooks/shopify/order-created`
3. HMAC verified, idempotency checked via `WebhookLog`
4. Job enqueued to pg-boss `order-created` queue
5. Handler maps Shopify SKUs → ERPNext item codes via `SkuMapping` table
6. Sales Order created in ERPNext
7. `SyncEvent` logged with `externalId: "shopify:{id}|erp:{so_name}"`

### Fulfillment
1. ERPNext manager submits Delivery Note (marks items shipped)
2. ERPNext fires webhook → `POST /api/webhooks/erpnext/fulfillment-update`
3. Handler finds original Shopify order via `SyncEvent` lookup
4. Matches DN line items to fulfillment order line items by SKU
5. Creates Shopify fulfillment with tracking info
6. `FulfillmentSync` record created

### Inventory Sync
1. ERPNext warehouse stock changes
2. Webhook → `POST /api/webhooks/erpnext/stock-update`
3. Handler looks up Shopify `inventoryItemId` via `SkuMapping`
4. Calls Shopify Admin API `setInventoryQuantity()` at configured location
5. `SyncEvent` logged

---

## Database Schema (Prisma / PostgreSQL)

| Model | Purpose | Key Unique Fields |
|-------|---------|-------------------|
| `SkuMapping` | Links Shopify variant ↔ ERPNext item ↔ Sanity handle | `shopifyVariantId`, `erpItemCode` |
| `SyncEvent` | Audit trail for all cross-system syncs | — (indexed on `status`, `type+direction`) |
| `WebhookLog` | Idempotency + audit for inbound webhooks | `idempotencyKey` |
| `FulfillmentSync` | Maps ERPNext Delivery Note ↔ Shopify Fulfillment | `erpDeliveryNoteName` |
| `Conversation` | AI reorder assistant chat history (Phase 3) | — (indexed on `customerId`) |

---

## Key Architectural Patterns

1. **Three-System Sync** — Shopify (commerce) ↔ Next.js (orchestrator) ↔ ERPNext (inventory). Sanity provides content separately.
2. **Webhook-Driven Async Processing** — Inbound webhooks verify signature → enqueue pg-boss job → handler processes → logs to DB. Retries (5x) with exponential backoff.
3. **Idempotency Everywhere** — Shopify uses `x-shopify-webhook-id`, ERPNext uses delivery note name. `WebhookLog` table prevents duplicate processing.
4. **SKU Mapping as System Spine** — `SkuMapping` is the central truth linking all three systems. Every sync operation resolves through it.
5. **Server-Side API Proxies** — `/api/inventory` proxies ERPNext (hides secrets, caches 60s, validates with Zod).
6. **Cookie-Based B2B Auth** — `b2b_session` cookie (base64 JSON) carries `{ customerId, companyId, email }`. Middleware protects `/account/*` and `/admin/*`.

---

## External Services & APIs

| Service | API Version | Auth Method |
|---------|-------------|-------------|
| Shopify Storefront API | 2025-01 | Public access token |
| Shopify Admin API | 2025-01 | `X-Shopify-Access-Token` header |
| Sanity CMS | 2025-01-01 | Optional API token |
| ERPNext REST API | — | API key + secret (token auth) |

---

## Environment Variables

| Variable | Service | Purpose |
|----------|---------|---------|
| `SHOPIFY_STORE_DOMAIN` | Shopify | Store domain (e.g., `acme.myshopify.com`) |
| `SHOPIFY_STOREFRONT_TOKEN` | Shopify | Public storefront API token |
| `SHOPIFY_ADMIN_TOKEN` | Shopify | Admin API token (server-side) |
| `SHOPIFY_WEBHOOK_SECRET` | Shopify | HMAC secret for webhook verification |
| `SHOPIFY_LOCATION_ID` | Shopify | Primary warehouse location ID |
| `SANITY_PROJECT_ID` | Sanity | Project ID |
| `SANITY_DATASET` | Sanity | Dataset name (default: `production`) |
| `SANITY_API_TOKEN` | Sanity | API token (optional) |
| `ERPNEXT_URL` | ERPNext | Base URL |
| `ERPNEXT_API_KEY` | ERPNext | API key |
| `ERPNEXT_API_SECRET` | ERPNext | API secret |
| `ERPNEXT_WEBHOOK_SECRET` | ERPNext | Shared secret for webhook verification |
| `DATABASE_URL` | Postgres | Neon connection string |

---

## Development Phase Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | Foundation — Product catalog, cart, webhooks, order sync | In progress |
| **Phase 2** | Full B2B — Company accounts, pricing rules, purchase orders | Planned |
| **Phase 3** | AI — Groq/Ollama reorder assistant, predictive forecasting | Placeholder APIs exist |
| **Phase 4** | Analytics — Sync dashboard, performance metrics | Placeholder pages exist |

---

## Commands

```bash
npm run dev          # Start dev server (Next.js)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npx prisma generate  # Regenerate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Database GUI
```
