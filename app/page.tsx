import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="text-7xl mb-4">🍸</div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CocktailCache
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Demo de Next.js 15+ con{" "}
              <code className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">
                "use cache"
              </code>{" "}
              usando API pública real
            </p>
          </div>

          {/* Cocktails Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span>🍹</span>
              <span>Cocktails Populares</span>
            </h2>
            
            <div className="space-y-6">
              {/* Margarita */}
              <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-lg mb-3 text-purple-600">Margarita</h3>
                <div className="flex flex-wrap gap-2">
                  <Link 
                    href="/p/11007?v=classic"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    🍹 Classic
                  </Link>
                  <Link 
                    href="/p/11007?v=frozen"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    🧊 Frozen
                  </Link>
                  <Link 
                    href="/p/11007?v=double"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    💪 Double
                  </Link>
                </div>
              </div>

              {/* Mojito */}
              <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-lg mb-3 text-purple-600">Mojito</h3>
                <div className="flex flex-wrap gap-2">
                  <Link 
                    href="/p/11000?v=classic"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    🍹 Classic
                  </Link>
                  <Link 
                    href="/p/11000?v=frozen"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    🧊 Frozen
                  </Link>
                </div>
              </div>

              {/* A1 */}
              <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-lg mb-3 text-purple-600">A1</h3>
                <div className="flex flex-wrap gap-2">
                  <Link 
                    href="/p/17222?v=classic"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    🍹 Classic
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500 text-center">
              Cada <code className="bg-gray-100 px-2 py-1 rounded">?v=variant</code> tiene su propia cache entry
            </p>
          </div>

          {/* Technical Info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold mb-4 text-green-800 flex items-center gap-2">
              <span>✅</span>
              <span>Caching con API Real + Query Params</span>
            </h2>
            <ul className="space-y-3 text-green-700">
              <li className="flex items-start gap-3">
                <span className="text-xl">1️⃣</span>
                <div>
                  <strong>Primera visita:</strong> Fetch desde TheCocktailDB API → log en consola del servidor
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">2️⃣</span>
                <div>
                  <strong>Refresca página:</strong> Cache HIT ✅ → sin log, respuesta instantánea
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">3️⃣</span>
                <div>
                  <strong>Cambia variant</strong> (?v=frozen): Nueva cache entry → fetch API nuevamente
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">4️⃣</span>
                <div>
                  <strong>Vuelve a variant anterior:</strong> Cache HIT ✅ → aún está en memoria
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">5️⃣</span>
                <div>
                  <strong>Invalidación manual:</strong>{" "}
                  <code className="bg-green-100 px-2 py-1 rounded text-xs">
                    POST /api/revalidate?tag=cocktail-11007
                  </code>
                </div>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <a
              className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              📚 Next.js Docs
            </a>
            <a
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
              href="https://www.thecocktaildb.com/api.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              🍹 CocktailDB API
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
