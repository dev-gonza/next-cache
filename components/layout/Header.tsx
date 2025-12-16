export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">MANGO</div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#" className="hover:underline">
            Women
          </a>
          <a href="#" className="hover:underline">
            Men
          </a>
          <a href="#" className="hover:underline">
            Kids
          </a>
          <a href="#" className="hover:underline">
            Home
          </a>
        </nav>
        <div className="flex gap-4">
          <button aria-label="Search">🔍</button>
          <button aria-label="Account">👤</button>
          <button aria-label="Cart">🛒</button>
        </div>
      </div>
    </header>
  );
}
