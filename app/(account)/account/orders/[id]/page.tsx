interface OrderDetailProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailProps) {
  const { id } = await params;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Order: {id}</h1>
      <p className="text-gray-500">Order detail — Phase 1, Step 5</p>
    </main>
  );
}
