export function Footer() {
  return (
    <footer className="border-t mt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-3 text-lg">🍸 CocktailCache</h3>
            <p className="text-gray-600">
              Demo de Next.js 15+ con "use cache" usando API pública real.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Tecnologías</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Next.js 15 App Router</li>
              <li>✓ "use cache" directive</li>
              <li>✓ TheCocktailDB API</li>
              <li>✓ Cache tags & invalidación</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Recursos</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600">
                  Next.js Docs
                </a>
              </li>
              <li>
                <a href="https://www.thecocktaildb.com/api.php" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600">
                  CocktailDB API
                </a>
              </li>
              <li>
                <a href="/api/revalidate" className="hover:text-purple-600">
                  API Revalidate Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2025 CocktailCache - Demo de Next.js "use cache" + Real API
          </p>
        </div>
      </div>
    </footer>
  );
}
