# B2B Powerhouse — Implementation Plan

## AI-Powered B2B Wholesale Platform (All Free Tier)

Build a self-serve B2B wholesale portal where business buyers browse products, see customer-specific pricing, place orders, and reorder via AI assistant. Shopify handles commerce, Sanity CMS handles content, ERPNext handles inventory/fulfillment, Next.js ties it together.

---

## Cost Breakdown: $0/month

| Service | Free Option | Limits |
|---|---|---|
| **Shopify** | Shopify Partners dev store (free forever for dev/testing) | Unlimited products, full API access, no real payment processing |
| **Storefront API** | Included with any Shopify store — no extra cost | No additional charge for headless access |
| **Next.js hosting** | Vercel Hobby (free) | 100GB bandwidth/mo, serverless functions, edge |
| **Sanity CMS** | Free plan | 3 users, 500K API CDN requests/mo, 10K non-CDN/mo, 10GB assets |
| **ERPNext** | Self-hosted via Docker (free, open-source) | Unlimited — runs on your machine or free VPS |
| **PostgreSQL** | Neon free tier | 0.5GB storage, 190 compute hours/mo, 1 project |
| **AI** | Groq free tier (Llama 3, Mixtral) | 30 req/min, 14.4K req/day — or use Ollama locally (unlimited) |
| **Domain** | localhost / Vercel subdomain | `.vercel.app` subdomain free |

> **Note on Shopify**: The Storefront API (headless access) is included free with every Shopify plan. A Shopify Partners development store gives you full API access at $0. For production with real payments, you'd need a Shopify plan ($39+/mo) — but the entire build, testing, and demo phase costs nothing.

---

## Architecture

```
┌─────────────┐   ┌──────────────┐   ┌────────────────┐
│  Sanity CMS  │   │   Shopify    │   │    ERPNext     │
│  (content)   │   │  (commerce)  │   │  (inventory/   │
│  FREE tier   │   │  DEV store   │   │   fulfillment) │
│              │   │  FREE        │   │  self-hosted   │
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

**Data Ownership:**
- **Shopify** → pricing, cart, checkout, payment terms (net-30/60), company accounts, B2B catalogs
- **Sanity CMS** → product descriptions, spec sheets, PDFs, compliance docs, rich media
- **ERPNext** → inventory levels, warehouse locations, sales orders, purchase orders, fulfillment
- **Next.js + Postgres** → SKU mappings, sync status, webhook logs, AI conversation history

---

## Phase 1: Foundation (Core Commerce)

### Step 1: Project Scaffold

Initialize the project with all tooling.

```bash
npx create-next-app@latest B2Bpowerhouse --typescript --tailwind --app --src-dir=false
cd B2Bpowerhouse

# Shopify
npm install @shopify/storefront-api-client

# CMS
npm install next-sanity @sanity/client @sanity/image-url

# Database
npm install prisma @prisma/client
npx prisma init

# Utilities
npm install zod

# Dev
npm install -D @types/node
```

**Project structure:**

```
B2Bpowerhouse/
├── app/
│   ├── layout.tsx                          # Root layout
│   ├── page.tsx                            # Landing page
│   ├── globals.css                         # Tailwind styles
│   │
│   ├── (storefront)/                       # Public routes
│   │   ├── products/
│   │   │   ├── page.tsx                    # Product catalog
│   │   │   └── [handle]/
│   │   │       └── page.tsx                # Product detail
│   │   └── cart/
│   │       └── page.tsx                    # Cart
│   │
│   ├── (account)/                          # Protected routes
│   │   ├── layout.tsx                      # Auth guard
│   │   ├── account/
│   │   │   ├── page.tsx                    # Dashboard
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx                # Order history
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx            # Order detail
│   │   │   └── reorder/
│   │   │       └── page.tsx                # AI chat (Phase 3)
│   │   └── admin/
│   │       └── sync-status/
│   │           └── page.tsx                # Sync dashboard (Phase 4)
│   │
│   └── api/
│       ├── webhooks/
│       │   ├── shopify/
│       │   │   └── order-created/
│       │   │       └── route.ts            # Shopify order webhook
│       │   └── erpnext/
│       │       └── stock-update/
│       │           └── route.ts            # ERPNext inventory webhook
│       ├── inventory/
│       │   └── route.ts                    # ERP inventory proxy
│       ├── chat/
│       │   └── route.ts                    # AI assistant (Phase 3)
│       └── cron/
│           └── reorder-forecast/
│               └── route.ts                # Predictive alerts (Phase 3)
│
├── lib/
│   ├── shopify/
│   │   ├── client.ts                       # Storefront API client
│   │   ├── queries.ts                      # GraphQL queries
│   │   ├── mutations.ts                    # Cart mutations
│   │   ├── admin.ts                        # Admin API client (inventory)
│   │   └── types.ts                        # Shopify types
│   │
│   ├── cms/
│   │   ├── sanity.ts                       # Sanity client
│   │   ├── queries.ts                      # GROQ queries
│   │   └── types.ts                        # CMS types
│   │
│   ├── erp/
│   │   ├── erpnext.ts                      # ERPNext API client
│   │   └── types.ts                        # ERP types
│   │
│   ├── db/
│   │   └── index.ts                        # Prisma client singleton
│   │
│   ├── webhooks/
│   │   ├── verify.ts                       # HMAC / shared secret verification
│   │   ├── queue.ts                        # pg-boss job queue
│   │   └── handlers/
│   │       ├── order-created.ts            # Order sync handler
│   │       └── stock-update.ts             # Inventory sync handler
│   │
│   ├── auth/
│   │   └── session.ts                      # Auth helpers
│   │
│   └── utils/
│       └── sku-mapping.ts                  # SKU lookup helpers
│
├── components/
│   ├── ui/                                 # Shared UI components
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetail.tsx
│   │   └── StockIndicator.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   └── CartLineItem.tsx
│   ├── chat/
│   │   └── ReorderChat.tsx                 # AI chat UI (Phase 3)
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Sidebar.tsx
│
├── prisma/
│   ├── schema.prisma                       # Database schema
│   └── seed.ts                             # Seed SKU mappings
│
├── public/                                 # Static assets
├── .env.local                              # Secrets (gitignored)
├── .env.example                            # Template
├── middleware.ts                            # Auth middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Step 2: Shopify Storefront Client *(parallel with Step 3)*

Create typed client for Shopify's Storefront API (free with any store, including dev stores).

**Key files:**
- `lib/shopify/client.ts` — `createStorefrontApiClient` with env vars
- `lib/shopify/queries.ts` — GraphQL: products list, single product by handle, collections, B2B company context
- `lib/shopify/mutations.ts` — `cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove`
- `lib/shopify/types.ts` — TypeScript interfaces for all Shopify responses

**B2B-specific — UPDATED:**

Shopify's Storefront API returns **DTC retail prices** by default. B2B catalog pricing, volume price breaks, quantity rules, and payment terms are only activated when every request carries a `buyerIdentity` with a `companyLocationId`. This ID comes from the Customer Account API after the buyer logs in (Step 6).

Two request modes:

| Mode | When | How |
|---|---|---|
| **Unauthenticated** | Pre-login product browsing | `shopifyClient` with public access token only |
| **Buyer-contextualized** | After login — pricing, cart, checkout | Pass `buyerIdentity: { companyLocationId, customerAccessToken }` on every request |

**`lib/shopify/queries.ts` — add `buyerIdentity` + `quantityPriceBreaks`:**
```graphql
# Every product query must accept buyerIdentity to return B2B catalog prices
query GetProduct($handle: String!, $buyerIdentity: BuyerIdentityInput) {
  product(handle: $handle) {
    variants(first: 50) {
      edges {
        node {
          id
          title
          sku
          price { amount currencyCode }
          # Real volume pricing from Shopify B2B catalogs (replaces hardcoded tiers)
          quantityPriceBreaks(first: 10) {
            nodes {
              minimumQuantity
              price { amount currencyCode }
            }
          }
          # Quantity rules: min order, max order, increment (case pack)
          quantityRule {
            minimum
            maximum
            increment
          }
        }
      }
    }
  }
}
```

**`lib/shopify/mutations.ts` — cart must carry buyer identity:**
```graphql
# cartCreate must include buyerIdentity to activate B2B checkout
mutation CartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      buyerIdentity {
        companyLocation { id name }
      }
      lines(first: 50) { ... }
    }
  }
}

# companyLocationAssign ties an existing cart to a company location
mutation CompanyLocationAssign($cartId: ID!, $companyLocationId: ID!) {
  cartBuyerIdentityUpdate(
    cartId: $cartId
    buyerIdentity: { companyLocationId: $companyLocationId }
  ) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}
```

**Key mutations to implement:**
- `cartCreate` — always include `buyerIdentity` if session has `companyLocationId`
- `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove` — unchanged in shape
- `cartBuyerIdentityUpdate` — used when session is established after cart already exists

**Effect chain:** setting `buyerIdentity.companyLocationId` on the cart causes Shopify to:
1. Apply the company's assigned catalog (customer-specific pricing)
2. Return `quantityPriceBreaks` on variants (live volume tiers, not hardcoded)
3. Enforce `quantityRule` min/max/increment at checkout
4. Apply the company location's payment terms (net-30/60) at checkout
5. Route the buyer through B2B checkout instead of DTC checkout

- Redirect to `checkoutUrl` from cart (Shopify hosted checkout — PCI compliant, free)

### Step 3: Sanity CMS Setup *(parallel with Step 2)*

Sanity free tier: 3 users, 500K CDN requests/mo, 10GB assets.

**Schemas to define in Sanity Studio:**
- `product` — `shopifyHandle` (string, indexed), `richDescription` (portable text), `specSheets` (file array), `complianceDocs` (file array), `gallery` (image array)
- `category` — `title`, `slug`, `description`, `products` (references)

**Key files:**
- `lib/cms/sanity.ts` — `createClient` with CDN enabled
- `lib/cms/queries.ts` — GROQ: `getProductContent(handle)`, `getCategories()`

**Pattern:** Store `shopifyHandle` in Sanity as the foreign key. This links CMS content to Shopify products without tight coupling.

### Step 4: Database & SKU Mapping *(depends on Step 1)*

Neon Postgres free tier: 0.5GB storage, 190 compute hours/mo.

**Prisma schema:**

```prisma
model SkuMapping {
  id                    String   @id @default(cuid())
  shopifyProductId      String
  shopifyVariantId      String   @unique
  shopifyInventoryItemId String?
  erpItemCode           String   @unique
  sanityHandle          String
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}

model SyncEvent {
  id          String   @id @default(cuid())
  type        String   // "order_sync" | "inventory_sync"
  direction   String   // "shopify_to_erp" | "erp_to_shopify"
  status      String   // "pending" | "processing" | "completed" | "failed"
  externalId  String?  // Shopify order ID or ERPNext doc name
  payload     Json
  retryCount  Int      @default(0)
  lastError   String?
  createdAt   DateTime @default(now())
  processedAt DateTime?
}

model WebhookLog {
  id            String   @id @default(cuid())
  source        String   // "shopify" | "erpnext"
  event         String   // "orders/create" | "stock_update"
  idempotencyKey String  @unique
  status        String   // "received" | "processed" | "duplicate" | "failed"
  createdAt     DateTime @default(now())
  processedAt   DateTime?
}
```

### Step 5: Core Pages *(depends on Steps 2, 3)*

| Route | Data Sources | Description |
|---|---|---|
| `/` | Static | Landing page |
| `/products` | Shopify (product list) | Catalog with filters |
| `/products/[handle]` | Shopify (product) + Sanity (content) + ERPNext (stock) | Unified product detail |
| `/cart` | Shopify (cart) | Cart with line items, checkout redirect |
| `/account` | Shopify (customer) + ERPNext (order history) | B2B buyer dashboard |
| `/account/orders` | ERPNext (sales orders) | Order history |
| `/account/orders/[id]` | ERPNext (single order) | Order detail |

**Critical fix from original plan:** The product page calls ERPNext stock via a **direct server-side function**, NOT a relative `fetch('/api/...')` (which doesn't work in Server Components).

```tsx
// app/(storefront)/products/[handle]/page.tsx
// CORRECT: direct function call in Server Component
const [product, content, stock] = await Promise.all([
  getShopifyProduct(params.handle),
  getProductContent(params.handle),
  getStockLevel(skuMapping.erpItemCode),  // direct call, not fetch()
]);
```

### Step 6: Auth — Customer Account API (PKCE OAuth) *(depends on Step 2)*

> The Customer Account API is a **separate API** from the Storefront API. It has its own endpoint, its own OAuth flow, and its own access token. Without it, `companyLocationId` is never known and all Storefront API calls return DTC prices.

**Why PKCE?** The Customer Account API uses OAuth 2.0 with PKCE (Proof Key for Code Exchange). There is no client secret stored in your app — the security comes from a one-time `codeVerifier`/`codeChallenge` pair generated per login attempt. This is the correct approach for apps that cannot safely store a client secret server-side (which Next.js Hobby on Vercel is, since env vars are visible at build time to the deployment environment).

**Flow:**
```
1. Buyer clicks "Log In"
   └→ GET /api/auth/login
        → generate codeVerifier (random 64 bytes, store in httpOnly cookie)
        → generate codeChallenge = base64url(sha256(codeVerifier))
        → redirect to Customer Account API OAuth URL:
             {SHOPIFY_CUSTOMER_ACCOUNT_URL}/oauth/authorize
               ?client_id={SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID}
               &redirect_uri={APP_URL}/api/auth/callback
               &response_type=code
               &code_challenge={codeChallenge}
               &code_challenge_method=S256
               &scope=openid+email+https://api.customers.com/auth/customer.graphql

2. Shopify authenticates the buyer, redirects to:
   GET /api/auth/callback?code={authCode}&state=...
        → read codeVerifier from httpOnly cookie (single use, then delete)
        → POST to Customer Account API token endpoint:
             exchangeCode({ code, codeVerifier }) → { accessToken, idToken }
        → Use accessToken to call Customer Account API GraphQL:
             query { customer { companyContacts { nodes { companyLocation { id company { id name } } } } } }
        → Extract companyLocationId + companyId + email
        → Set httpOnly session cookie:
             { customerId, companyId, companyLocationId, accessToken, email }
        → Redirect to /account

3. All subsequent Storefront API calls:
        → Read companyLocationId from session cookie (server-side)
        → Pass as buyerIdentity on every product query and cart mutation
        → Shopify returns B2B catalog prices, volume tiers, payment terms
```

**New API routes:**
- `app/api/auth/login/route.ts` — generate PKCE pair, redirect to Shopify OAuth
- `app/api/auth/callback/route.ts` — exchange code, fetch company context, set session
- `app/api/auth/logout/route.ts` — clear session cookie, redirect to `/`

**Updated `lib/auth/session.ts`:**
```ts
export interface Session {
  customerId: string;
  companyId: string;          // was: string | null — now always populated post-login
  companyLocationId: string;  // NEW — required for all Storefront API B2B calls
  accessToken: string;        // NEW — Customer Account API token
  email: string;
}
```

**Updated `middleware.ts`:** unchanged in structure — still redirects `/account/*` and `/admin/*` to `/` if no session cookie. The cookie now carries more fields but middleware only checks its existence.

**New env vars needed:**
```bash
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=   # From Shopify Partners > Customer Account API
SHOPIFY_CUSTOMER_ACCOUNT_URL=         # e.g. https://shopify.com/{shop-id}
```

**Security note:** `codeVerifier` must only be stored in a `httpOnly; SameSite=Lax; Secure` cookie and deleted immediately after the callback. Never log or expose it.

### Step 6b: Admin API — B2B Company & Catalog Setup *(parallel with Step 6)*

> The Customer Account API handles buyer **authentication**. The Admin API handles the **setup** of the B2B structure those buyers authenticate into: companies, locations, catalogs, and payment terms. Without this setup, there are no companies for buyers to belong to and no catalogs to assign B2B pricing from.

This step is a mix of one-time seeding scripts (run once per store setup) and admin-facing mutations (run when onboarding new wholesale accounts).

**Admin API objects involved:**

| Object | Purpose |
|---|---|
| `Company` | Represents a wholesale buyer organisation (e.g. "GymChain Ltd") |
| `CompanyLocation` | A physical or billing location under a company — this is what gets the `companyLocationId` used in Step 6 |
| `CompanyContact` | A person (customer) attached to a company, with a role (admin, buyer) |
| `Catalog` / `CompanyLocationCatalog` | A price list assigned to one or more company locations |
| `PriceList` | Customer-specific prices and % adjustments per SKU |
| `PaymentTerms` | Net-30, net-60, etc. attached to a company location |

**Scripts location:** `scripts/shopify-b2b-seed.ts` (run with `npx ts-node`)

**Mutations to implement in `lib/shopify/admin.ts`:**

```graphql
# 1. Create a company (one per wholesale account)
mutation CompanyCreate($input: CompanyCreateInput!) {
  companyCreate(input: $input) {
    company { id name }
    userErrors { field message }
  }
}

# 2. Create a location under that company
mutation CompanyLocationCreate($companyId: ID!, $input: CompanyLocationInput!) {
  companyLocationCreate(companyId: $companyId, input: $input) {
    companyLocation { id name }
    userErrors { field message }
  }
}

# 3. Assign a catalog (price list) to the company location
mutation CompanyLocationCatalogAssign($companyLocationId: ID!, $catalogId: ID!) {
  companyLocationAssignCatalogs(
    companyLocationId: $companyLocationId
    catalogIds: [$catalogId]
  ) {
    companyCatalogs { catalog { id title } }
    userErrors { field message }
  }
}

# 4. Set payment terms on the company location (net-30, net-60, etc.)
mutation PaymentTermsCreate($referenceId: ID!, $paymentTermsAttributes: PaymentTermsInput!) {
  paymentTermsCreate(
    referenceId: $referenceId
    paymentTermsAttributes: $paymentTermsAttributes
  ) {
    paymentTerms { id paymentTermsName dueInDays }
    userErrors { field message }
  }
}

# 5. Create a B2B catalog with a price list
mutation CatalogCreate($input: CatalogCreateInput!) {
  catalogCreate(input: $input) {
    catalog { id title }
    userErrors { field message }
  }
}
```

**Seeding flow for a new wholesale account:**
```
1. companyCreate         → get companyId
2. companyLocationCreate → get companyLocationId (save to DB / share with buyer)
3. catalogCreate         → create or reuse a price list catalog (e.g. "Tier 1 Wholesale")
4. companyLocationCatalogAssign → link price list to this location
5. paymentTermsCreate    → attach net-30 or net-60 to the location
6. companyContactCreate  → attach customer email to the company with "buyer" role
```

**Where `companyLocationId` flows:**
- Stored in buyer's session after login (Step 6)
- Passed as `buyerIdentity.companyLocationId` on all Storefront API calls (Step 2)
- This is what causes Shopify to return catalog prices, volume tiers, and payment terms

**Admin queries for dashboard (`/admin/sync-status`, Phase 4):**
```graphql
# Fetch all companies and their locations
query Companies($first: Int!) {
  companies(first: $first) {
    nodes {
      id name
      locations(first: 10) {
        nodes {
          id name
          paymentTerms { paymentTermsName dueInDays }
          catalogs(first: 5) { nodes { catalog { id title } } }
        }
      }
    }
  }
}
```

---

## Phase 2: ERP Integration (Inventory & Order Sync)

### Step 7: ERPNext Client *(parallel with Step 8)*

Self-hosted ERPNext via Docker (free, open-source).

```bash
# Local ERPNext setup
git clone https://github.com/frappe/frappe_docker
cd frappe_docker
docker compose -f pwd.yml up -d
# Access at http://localhost:8080
```

**Key files:**
- `lib/erp/erpnext.ts` — typed REST client

**Critical fix:** No string interpolation in filters. Use proper URL encoding:

```ts
// BAD (injection risk):
`Bin?filters=[["item_code","=","${itemCode}"]]`

// GOOD (safe):
const params = new URLSearchParams({
  filters: JSON.stringify([["item_code", "=", itemCode]]),
  fields: JSON.stringify(["actual_qty", "warehouse"]),
});
const data = await erpFetch(`Bin?${params}`);
```

**Functions:**
- `getStockLevel(itemCode)` — query `Bin` for actual_qty
- `createSalesOrder(order)` — create Sales Order from Shopify order data
- `getOrderHistory(customerId)` — fetch past Sales Orders
- `updateFulfillmentStatus(orderName, status)` — update order status

### Step 8: Webhook Infrastructure *(parallel with Step 7)*

**Webhook handler base (`lib/webhooks/verify.ts`):**
- HMAC SHA-256 verification for Shopify webhooks
- Shared secret header check for ERPNext webhooks
- Idempotency key extraction (Shopify: `X-Shopify-Webhook-Id`)
- Check `WebhookLog` for duplicate before processing

**Job queue (`lib/webhooks/queue.ts`):**
- pg-boss (Postgres-backed job queue — no extra service, uses Neon free tier)
- Jobs are enqueued by webhook handlers, processed async
- Retry with exponential backoff (max 5 retries)
- Failed jobs move to dead letter queue
- Each handler logs to `SyncEvent` table

### Step 9: Shopify → ERPNext Order Sync *(depends on Steps 7, 8)*

**Flow:**
```
Shopify order/created webhook
  → POST /api/webhooks/shopify/order-created
  → Verify HMAC (reject if invalid)
  → Check idempotency key (skip if duplicate)
  → Enqueue "order_sync" job
  → pg-boss worker picks up job
  → Map line items via SkuMapping table
  → Create Sales Order in ERPNext
  → Log result to SyncEvent
```

**Edge cases handled:**
- Unmapped SKUs → log error, create partial order, alert admin
- ERPNext down → job stays in queue, retried with backoff
- Duplicate webhook → caught by idempotency key check

### Step 10: ERPNext → Shopify Inventory Sync *(depends on Steps 7, 8)*

**Flow:**
```
ERPNext stock changes (Stock Entry, Purchase Receipt, etc.)
  → ERPNext Server Script fires
  → POST to /api/webhooks/erpnext/stock-update
  → Verify shared secret (ERPNEXT_WEBHOOK_SECRET)
  → Look up SkuMapping for Shopify inventoryItemId
  → Update Shopify inventory via Admin API (inventorySetQuantities)
  → Log to SyncEvent
```

**Critical fix from original plan:** The ERPNext webhook endpoint **verifies a shared secret** — the original conversation had no auth on this endpoint.

### Step 11: Inventory Display *(depends on Steps 5, 7)*

- Server-side `getStockLevel()` called directly in product page Server Component
- Cached with `unstable_cache` or Next.js `fetch` revalidate at 60s
- Shows: stock level, lead time, warehouse location
- Graceful fallback if ERPNext is unreachable (show "Contact for availability")

### Step 12: Fulfillment Sync — ERPNext → Shopify *(depends on Steps 9, 10)*

**Cost: $0 — uses ERPNext native Delivery Notes + Shopify fulfillmentCreateV2 API**

**Architecture:**
- ERPNext is the source of truth for fulfillment (warehouse picks, packs, ships)
- Delivery Note submission in ERPNext triggers a webhook to our app
- Our app creates a Shopify fulfillment (with tracking number + carrier)
- Shopify automatically sends the buyer a "Your order has shipped" email
- Supports partial fulfillment (multiple Delivery Notes per Sales Order)

**Flow:**
```
Warehouse submits Delivery Note in ERPNext (with tracking + carrier)
  → ERPNext Server Script on Delivery Note on_submit fires
  → POST to /api/webhooks/erpnext/fulfillment-update
  → Verify shared secret (ERPNEXT_WEBHOOK_SECRET)
  → Idempotency check (one fulfillment per Delivery Note name)
  → Enqueue "fulfillment-update" job (pg-boss)
  → pg-boss worker picks up job:
      ├─ Fetch full Delivery Note from ERPNext API
      ├─ Look up Shopify order GID via SyncEvent (from order creation)
      ├─ Get Shopify fulfillment orders for this order
      ├─ Match Delivery Note items → Shopify line items by SKU
      ├─ Call fulfillmentCreateV2 with tracking info
      ├─ Save FulfillmentSync record (erpDeliveryNote ↔ shopifyFulfillment)
      └─ Log to SyncEvent
```

**Key files:**
- `lib/erp/types.ts` — `ErpDeliveryNote`, `ErpDeliveryNoteItem` types
- `lib/erp/erpnext.ts` — `getDeliveryNote()`, `getDeliveryNotes()` functions
- `lib/shopify/admin.ts` — `getFulfillmentOrders()`, `createFulfillment()` functions
- `lib/webhooks/handlers/fulfillment-update.ts` — business logic
- `app/api/webhooks/erpnext/fulfillment-update/route.ts` — webhook endpoint

**Database:**
- `FulfillmentSync` Prisma model — maps ERPNext Delivery Note ↔ Shopify Fulfillment
- Indexed on `shopifyOrderId` and `erpSalesOrderName` for fast lookups
- Prevents duplicate fulfillments via unique `erpDeliveryNoteName`

**ERPNext Setup Required:**
1. Add custom fields to Sales Order: `custom_shopify_order_id` (Data)
2. Add custom fields to Delivery Note: `custom_tracking_number` (Data), `custom_carrier` (Data), `custom_shopify_order_id` (Data)
3. Create Server Script on Delivery Note `on_submit`:
```python
import requests, json, frappe

doc = frappe.get_doc("Delivery Note", frappe.flags.current_doc_name)
sales_order = doc.items[0].against_sales_order if doc.items else None

payload = {
    "delivery_note": doc.name,
    "sales_order": sales_order,
    "tracking_number": doc.custom_tracking_number,
    "carrier": doc.custom_carrier
}

requests.post(
    "https://yourdomain.com/api/webhooks/erpnext/fulfillment-update",
    json=payload,
    headers={"Authorization": f"Bearer {frappe.conf.webhook_secret}"},
    timeout=10
)
```

**Partial Fulfillment:**
- A Sales Order with 100 units can ship as 3 Delivery Notes (40 + 40 + 20)
- Each DN creates a separate Shopify fulfillment
- Shopify tracks remaining unfulfilled quantities automatically
- Buyer receives a shipping notification for each shipment

**Edge cases:**
- DN with no matching SKU mappings → error logged, pg-boss retries
- Shopify order already fully fulfilled → Shopify returns error, logged
- Tracking number added after DN submission → manual re-trigger or update

---

## Phase 3: AI Features

### Step 12: AI Reorder Assistant *(depends on Phase 2)*

**Free AI option:** Groq free tier (30 req/min, Llama 3.3 70B or Mixtral) — or Ollama running locally (unlimited, free).

```bash
# Option A: Groq (free API)
npm install ai @ai-sdk/groq

# Option B: Ollama (free local)
# Install Ollama, pull a model
ollama pull llama3.3
npm install ai ollama-ai-provider
```

**Chat UI:**
- `components/chat/ReorderChat.tsx` — uses Vercel AI SDK `useChat` hook
- `app/api/chat/route.ts` — `streamText` with tools

**Tools available to AI:**
- `getOrderHistory` — fetch past orders from ERPNext
- `searchProducts` — search Shopify catalog by keyword
- `buildCart` — assemble proposed cart items, return to user for **confirmation** (NOT auto-submitted)

**Guardrails:**
- Maximum 50 items per cart
- Spending cap per order (configurable)
- Cart must be explicitly confirmed by user before checkout
- Conversation history saved to Postgres

### Step 13: Predictive Reorder Alerts *(depends on Phase 2)*

**Approach: statistics first, NOT LLM.**

- Daily cron job (Vercel Cron — free on Hobby plan, 1 per day)
- For each active customer: calculate average order interval per SKU
- If `days_since_last_order > avg_interval * 0.9` → trigger alert
- Send email via Resend free tier (100 emails/day) or log for manual review
- Include one-click reorder link

**Why not LLM for forecasting?** Sending order history to GPT for statistical analysis is expensive, slow, and less accurate than a simple moving average. LLM adds no value here.

### Step 14: Smart Search *(depends on Steps 5, 12)*

- Combine Shopify product search + Sanity full-text search
- Present unified results
- Optional Phase 3b: vector embeddings for semantic search (using free Hugging Face models)

---

## Phase 4: Production Hardening

### Step 15: Observability

- Structured logging with `pino` (free, outputs JSON)
- Sentry free tier (5K errors/mo) for error tracking
- Admin page at `/admin/sync-status` showing SyncEvent table status
- Health check endpoint: `GET /api/health` → pings ERPNext, Shopify, Sanity, Postgres

### Step 16: Security & Rate Limiting

- Rate limiting via `@upstash/ratelimit` with Upstash Redis free tier (10K commands/day)
- Zod validation on every API route input
- CSP headers in `next.config.ts`
- Audit log for sensitive operations (order creation, inventory changes)
- Input sanitization on all user-facing inputs

### Step 17: Deployment

| Service | Where | Cost |
|---|---|---|
| Next.js | Vercel Hobby | Free |
| PostgreSQL | Neon | Free |
| ERPNext | Docker on local machine or free Oracle Cloud VPS | Free |
| Sanity | Sanity.io | Free |
| AI | Groq API or local Ollama | Free |
| Email (Phase 3) | Resend | Free (100/day) |
| Redis (Phase 4) | Upstash | Free (10K/day) |

---

## Environment Variables

```bash
# .env.example

# Shopify (free dev store via Shopify Partners)
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=           # Public access token (free)
SHOPIFY_ADMIN_TOKEN=                # Admin API token (free with dev store)
SHOPIFY_WEBHOOK_SECRET=             # HMAC verification
SHOPIFY_LOCATION_ID=                # Primary inventory location

# Shopify Customer Account API (B2B auth — Step 6)
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID= # From Shopify Partners dashboard > Customer Account API
SHOPIFY_CUSTOMER_ACCOUNT_URL=       # e.g. https://shopify.com/{shop-id} (from same dashboard)

# Sanity (free tier)
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=                   # Read token

# ERPNext (self-hosted, free)
ERPNEXT_URL=http://localhost:8080
ERPNEXT_API_KEY=
ERPNEXT_API_SECRET=
ERPNEXT_WEBHOOK_SECRET=             # Shared secret for inbound webhooks

# Database (Neon free tier)
DATABASE_URL=postgresql://...

# AI — pick one (both free)
GROQ_API_KEY=                       # Groq free tier
# or use Ollama locally (no key needed)

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Fixes vs. Original Claude Conversation

| Original Issue | Fix in This Plan |
|---|---|
| `fetch('/api/inventory')` in Server Component — doesn't work | Direct function call to `getStockLevel()` — no HTTP round-trip |
| `filters=[["item_code","=","${itemCode}"]]` — injection risk | `URLSearchParams` with `JSON.stringify` — safe encoding |
| No auth on ERPNext webhook endpoint — anyone can POST | Shared secret in `Authorization` header, verified server-side |
| No retry/queue — lost orders if ERPNext is down | pg-boss job queue with exponential backoff + dead letter |
| No SKU mapping — assumes handle = item_code | `SkuMapping` Prisma model with lookup helpers |
| GPT for statistical forecasting — expensive and slow | Simple moving average — faster, free, more reliable |
| AI can auto-add to cart with no limit | Confirmation required + spending cap + item limit |
| No database — no persistent state | Prisma + Neon Postgres (free tier) |
| No observability — silent failures | Pino logging + Sentry free tier + sync dashboard |
| No B2B Shopify APIs used | Company, CompanyLocation, catalog APIs for pricing (Step 6b) |
| No real B2B auth — `companyId` always `null` | Customer Account API PKCE OAuth → `companyLocationId` in session (Step 6) |
| Storefront API returns DTC prices to all buyers | `buyerIdentity.companyLocationId` on every Storefront request (Step 2) |
| Volume pricing tiers hardcoded in page.tsx | `quantityPriceBreaks` query field returns live catalog tiers (Step 2) |
| OpenAI assumed (paid) | Groq free tier or Ollama local — $0 |

---

## Verification Checklist

### Phase 1 ✓
- [ ] Browse `/products` — see product list from Shopify
- [ ] View `/products/[handle]` — see Shopify data + Sanity content
- [ ] Add to cart → cart page shows items
- [ ] Checkout redirects to Shopify hosted checkout
- [ ] Click "Log In" → redirected to Shopify Customer Account OAuth page (Step 6)
- [ ] Complete login → session cookie set with `companyLocationId` populated
- [ ] View `/products/[handle]` after login → volume pricing tiers are live from catalog (not hardcoded)
- [ ] Add to cart after login → cart has `buyerIdentity.companyLocation` set
- [ ] Checkout after login → lands in B2B checkout (payment terms visible, not standard DTC)
- [ ] Run seeding script → company + location + catalog + payment terms exist in Shopify Admin (Step 6b)

### Phase 2 ✓
- [ ] Place test order in Shopify → Sales Order appears in ERPNext
- [ ] Change stock in ERPNext → Shopify inventory updates
- [ ] Check `SyncEvent` table — all syncs logged with status
- [ ] Send duplicate webhook → caught by idempotency check
- [ ] Kill ERPNext → webhook job queued, retried when ERPNext recovers
- [ ] Submit Delivery Note in ERPNext → Shopify fulfillment created
- [ ] Buyer receives "Your order has shipped" email from Shopify
- [ ] Partial fulfillment: ship 40 of 100 units → only those items fulfilled
- [ ] Duplicate Delivery Note webhook → caught by idempotency check
- [ ] Check `FulfillmentSync` table — DN ↔ Shopify fulfillment mapped

### Phase 3 ✓
- [ ] Open AI chat → "reorder my usual Q2 items"
- [ ] AI fetches order history, proposes cart
- [ ] User confirms → cart created in Shopify
- [ ] Predictive alert fires for customer approaching reorder date

### Phase 4 ✓
- [ ] Send webhook with bad HMAC → 401 response
- [ ] Flood endpoint → rate limited
- [ ] Check Sentry → errors tracked
- [ ] View `/admin/sync-status` → sync health visible

---

## Decisions Log

| Decision | Choice | Rationale |
|---|---|---|
| Checkout | Shopify hosted | PCI compliance, free, no custom payment handling |
| Job queue | pg-boss | Uses existing Postgres — no extra service |
| AI model | Groq free tier / Ollama | $0, sufficient quality for reorder assistant |
| Forecasting | Statistical (moving average) | Accurate, free, fast — LLM adds no value here |
| Auth | Shopify Customer Account API | Native B2B support, free with dev store |
| CMS | Sanity | Generous free tier, great DX, GROQ is powerful |
| Database | Neon Postgres | Serverless, free tier, scales to zero |
| ERP | ERPNext self-hosted | Full-featured, REST API, webhooks, Docker |

---

## Getting Started (Step 1)

```bash
# 1. Create Shopify Partners account (free) → create dev store
#    https://partners.shopify.com

# 2. Create Sanity project (free)
#    https://sanity.io/get-started

# 3. Spin up ERPNext locally
git clone https://github.com/frappe/frappe_docker
cd frappe_docker
docker compose -f pwd.yml up -d

# 4. Create Neon database (free)
#    https://neon.tech

# 5. Get Groq API key (free)
#    https://console.groq.com

# 6. Initialize project
npx create-next-app@latest B2Bpowerhouse --typescript --tailwind --app
cd B2Bpowerhouse
npm install @shopify/storefront-api-client next-sanity @sanity/client prisma @prisma/client zod
npx prisma init

# 7. Copy .env.example → .env.local and fill in values
```
