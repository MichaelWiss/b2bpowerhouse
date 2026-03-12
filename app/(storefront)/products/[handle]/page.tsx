interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { handle } = await params;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Product: {handle}</h1>
      <p className="text-gray-500">
        Unified product detail (Shopify + Sanity + ERP stock) — Phase 1, Step 5
      </p>
    </main>
  );
}
