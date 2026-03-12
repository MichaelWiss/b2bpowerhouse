export default function Header() {
  return (
    <header className="border-b">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">
          B2B Powerhouse
        </a>
        <div className="flex items-center gap-6">
          <a href="/products" className="text-sm hover:underline">
            Products
          </a>
          <a href="/cart" className="text-sm hover:underline">
            Cart
          </a>
          <a href="/account" className="text-sm hover:underline">
            Account
          </a>
        </div>
      </nav>
    </header>
  );
}
