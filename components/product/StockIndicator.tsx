export default function StockIndicator({
  quantity,
  warehouse,
}: {
  quantity: number | null;
  warehouse: string | null;
}) {
  if (quantity === null) {
    return (
      <span className="text-gray-400 text-sm">Contact for availability</span>
    );
  }

  if (quantity <= 0) {
    return <span className="text-red-600 font-medium text-sm">Out of Stock</span>;
  }

  if (quantity < 10) {
    return (
      <span className="text-amber-600 font-medium text-sm">
        Low Stock: {quantity} units{warehouse ? ` (${warehouse})` : ""}
      </span>
    );
  }

  return (
    <span className="text-green-600 font-medium text-sm">
      In Stock: {quantity} units{warehouse ? ` (${warehouse})` : ""}
    </span>
  );
}
