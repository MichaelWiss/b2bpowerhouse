# Repository Map

```
B2Bpowerhouse/
│
├── PROJECT_CONTEXT.md              # Project architecture, data flows, env vars
├── plan.md                         # Full implementation plan with phase breakdown
├── README.md                       # Next.js getting started
│
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── middleware.ts                   # Auth guard — redirects unauthenticated users from /account, /admin
├── eslint.config.mjs               # ESLint — extends next/core-web-vitals + typescript
├── postcss.config.mjs              # PostCSS — Tailwind CSS 4 plugin
├── prisma.config.ts                # Prisma config — schema path, migration dir
├── next-env.d.ts                   # Next.js TypeScript declarations (auto-generated)
│
├── prisma/
│   ├── schema.prisma               # Database schema: SkuMapping, SyncEvent, WebhookLog, FulfillmentSync, Conversation
│   └── seed.ts                     # Seed script for SkuMapping data
│
├── app/
│   ├── globals.css                 # Tailwind imports + global styles
│   ├── layout.tsx                  # Root layout — Cormorant Garamond font, SmoothScroll, Header/Footer
│   ├── page.tsx                    # Landing page — hero, gallery, about, testimonials
│   │
│   ├── (storefront)/               # ── Public routes (no auth) ──────────────────────
│   │   ├── products/
│   │   │   ├── page.tsx            # Product catalog grid (placeholder — Phase 1 Step 5)
│   │   │   └── [handle]/
│   │   │       └── page.tsx        # Product detail: Shopify + Sanity + ERP stock (placeholder)
│   │   └── cart/
│   │       └── page.tsx            # Shopping cart (placeholder)
│   │
│   ├── (account)/                  # ── Protected routes (auth required) ──────────────
│   │   ├── layout.tsx              # Auth guard — calls getSession(), redirects if missing
│   │   ├── account/
│   │   │   ├── page.tsx            # B2B buyer dashboard (placeholder)
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx        # Order history from ERPNext (placeholder)
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx    # Order detail + fulfillment tracking (placeholder)
│   │   │   └── reorder/
│   │   │       └── page.tsx        # AI reorder assistant chat UI (placeholder — Phase 3)
│   │   └── admin/
│   │       └── sync-status/
│   │           └── page.tsx        # Admin sync dashboard (placeholder — Phase 4)
│   │
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── shopify/
│   │   │   │   └── order-created/
│   │   │   │       └── route.ts    # POST — Shopify order webhook → verifies HMAC → enqueues job
│   │   │   └── erpnext/
│   │   │       ├── stock-update/
│   │   │       │   └── route.ts    # POST — ERPNext inventory webhook → enqueues stock sync
│   │   │       └── fulfillment-update/
│   │   │           └── route.ts    # POST — ERPNext delivery note → enqueues fulfillment sync
│   │   ├── inventory/
│   │   │   └── route.ts            # GET — Proxy to ERPNext stock level (cached 60s, Zod validated)
│   │   ├── chat/
│   │   │   └── route.ts            # POST — AI reorder assistant (501 placeholder — Phase 3)
│   │   └── cron/
│   │       └── reorder-forecast/
│   │           └── route.ts        # GET — Predictive reorder alerts (501 placeholder — Phase 3)
│   │
│   └── generated/
│       └── prisma/                 # Auto-generated Prisma client (do not edit)
│           ├── browser.ts
│           ├── client.ts
│           ├── commonInputTypes.ts
│           ├── enums.ts
│           ├── models.ts
│           ├── internal/
│           │   ├── class.ts
│           │   ├── prismaNamespace.ts
│           │   └── prismaNamespaceBrowser.ts
│           └── models/
│               ├── Conversation.ts
│               ├── FulfillmentSync.ts
│               ├── SkuMapping.ts
│               ├── SyncEvent.ts
│               └── WebhookLog.ts
│
├── lib/
│   ├── shopify/
│   │   ├── client.ts               # Storefront API client (public token, v2025-01)
│   │   ├── queries.ts              # GraphQL queries — PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, COLLECTIONS_QUERY
│   │   ├── mutations.ts            # GraphQL mutations — cart create/add/update/remove lines
│   │   ├── admin.ts                # Admin API — setInventoryQuantity, getFulfillmentOrders, createFulfillment
│   │   └── types.ts                # Types — Money, ShopifyProduct, ProductVariant, Cart, CartLine
│   │
│   ├── cms/
│   │   ├── sanity.ts               # Sanity client + urlFor() image builder
│   │   ├── queries.ts              # GROQ — getProductContent(handle), getCategories()
│   │   └── types.ts                # Types — ProductContent, Category
│   │
│   ├── erp/
│   │   ├── erpnext.ts              # ERPNext REST client — getStockLevel, createSalesOrder, getOrderHistory, getDeliveryNotes
│   │   └── types.ts                # Types — ErpStockLevel, ErpSalesOrder, ErpDeliveryNote
│   │
│   ├── db/
│   │   └── index.ts                # Prisma singleton (global cache for dev hot-reload)
│   │
│   ├── auth/
│   │   └── session.ts              # getSession() / requireSession() — reads b2b_session cookie (base64 JSON)
│   │
│   ├── utils/
│   │   └── sku-mapping.ts          # getErpItemCode(), getShopifyVariantId(), getInventoryItemId()
│   │
│   └── webhooks/
│       ├── verify.ts               # verifyShopifyWebhook (HMAC-SHA256), verifyErpNextWebhook (bearer token)
│       ├── queue.ts                # pg-boss singleton — enqueueWebhookJob (5 retries, exponential backoff)
│       └── handlers/
│           ├── order-created.ts    # Maps Shopify SKUs → ERPNext items → creates Sales Order
│           ├── stock-update.ts     # Looks up SkuMapping → updates Shopify inventory
│           └── fulfillment-update.ts # ERPNext DN → finds Shopify order → creates fulfillment with tracking
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Responsive nav — hamburger menu, Lenis smooth scroll, custom cursor
│   │   └── Footer.tsx              # Scroll-to-top, office locations, fraud alert banner
│   │
│   ├── product/
│   │   ├── ProductCard.tsx         # Card component — title, price, image, link to /products/{handle}
│   │   └── StockIndicator.tsx      # ERP stock badge — In Stock / Low Stock / Out of Stock / Contact
│   │
│   ├── animation/
│   │   ├── SmoothScroll.tsx        # Lenis scroll wrapper
│   │   ├── PageTransition.tsx      # Page load animations
│   │   ├── CeleresAnimations.tsx   # Brand GSAP effects
│   │   ├── AnimatedDiamond.tsx     # Diamond shape animation
│   │   ├── AnimatedIcon.tsx        # Icon entrance animation
│   │   ├── TextReveal.tsx          # Text reveal on scroll
│   │   ├── ScrollReveal.tsx        # Element reveal on scroll
│   │   ├── ParallaxImage.tsx       # Parallax image effect
│   │   └── CountUp.tsx             # Number counter animation
│   │
│   └── ui/
│       ├── Accordion.tsx           # Expandable accordion
│       ├── Carousel.tsx            # Image/content carousel
│       ├── FadeIn.tsx              # Fade-in wrapper
│       └── TestimonialSlider.tsx   # Testimonial carousel
│
├── public/
│   └── celeres/                    # Brand assets (images, logos)
│
└── references/
    ├── celeres(2).html             # Reference HTML for brand styling
    └── celeres(15).html            # Reference HTML for brand styling
```
