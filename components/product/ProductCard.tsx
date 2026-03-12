export default function ProductCard({
  title,
  handle,
  price,
  imageUrl,
}: {
  title: string;
  handle: string;
  price: string;
  imageUrl?: string;
}) {
  return (
    <a
      href={`/products/${handle}`}
      className="group block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {imageUrl && (
        <div className="aspect-square bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 mt-1">${price}</p>
      </div>
    </a>
  );
}
