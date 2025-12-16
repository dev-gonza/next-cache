import { getCachedCocktail } from "@/lib/data/products";

interface CocktailContentProps {
  cocktailId: string;
  searchParams: Promise<{ v?: string }>;
}

/**
 * Componente que muestra un cocktail usando datos cacheados
 * desde TheCocktailDB API real.
 * 
 * Usa searchParams para cambiar la variante del cocktail (classic, frozen, double)
 * Cada combinación de cocktailId + variant tiene su propia cache entry.
 */
export async function ProductContent({ 
  cocktailId, 
  searchParams 
}: CocktailContentProps) {
  // 1. Leer runtime data (searchParams es dinámico)
  const { v: variant } = await searchParams;
  
  // 2. Pasar VALORES primitivos a la función cacheada
  // El variant se convierte en parte del cache key
  const cocktail = await getCachedCocktail(cocktailId, variant || "classic");

  if (!cocktail) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-gray-400">🍸 Cocktail not found</p>
        <p className="text-sm text-gray-500 mt-2">ID: {cocktailId}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Imagen del cocktail */}
      <div className="aspect-square bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 rounded-2xl overflow-hidden shadow-xl">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Detalles del cocktail */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold uppercase tracking-wide mb-2">
            <span>{cocktail.category}</span>
            <span>•</span>
            <span>{cocktail.alcoholic}</span>
          </div>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {cocktail.name}
          </h1>
          <p className="text-lg text-gray-600 mt-2 flex items-center gap-2">
            <span>🥃</span>
            <span>Serve in: <strong>{cocktail.glass}</strong></span>
          </p>
        </div>

        {/* Selector de variantes */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border-2 border-purple-200">
          <p className="text-sm font-semibold mb-3 text-gray-700">
            🎚️ Choose your variant:{" "}
            <span className="capitalize text-purple-600">
              {variant || "classic"}
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`?v=classic`}
              className={`px-5 py-3 rounded-lg border-2 transition-all font-medium ${
                (!variant || variant === "classic")
                  ? "border-purple-500 bg-white shadow-md text-purple-700 scale-105"
                  : "border-gray-300 hover:border-purple-400 hover:bg-white"
              }`}
            >
              🍹 Classic
            </a>
            <a
              href={`?v=frozen`}
              className={`px-5 py-3 rounded-lg border-2 transition-all font-medium ${
                variant === "frozen"
                  ? "border-purple-500 bg-white shadow-md text-purple-700 scale-105"
                  : "border-gray-300 hover:border-purple-400 hover:bg-white"
              }`}
            >
              🧊 Frozen
            </a>
            <a
              href={`?v=double`}
              className={`px-5 py-3 rounded-lg border-2 transition-all font-medium ${
                variant === "double"
                  ? "border-purple-500 bg-white shadow-md text-purple-700 scale-105"
                  : "border-gray-300 hover:border-purple-400 hover:bg-white"
              }`}
            >
              💪 Double
            </a>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <span>🍹</span>
            <span>Ingredients</span>
          </h2>
          <ul className="space-y-2">
            {cocktail.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex justify-between py-3 px-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="font-semibold text-gray-800">{ingredient.name}</span>
                <span className="text-purple-600 font-medium">{ingredient.measure || "To taste"}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instrucciones */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <span>📝</span>
            <span>Instructions</span>
          </h2>
          <p className="text-gray-700 leading-relaxed">{cocktail.instructions}</p>
        </div>

        {/* Info de cache - Solo para debugging */}
        <div className="mt-8 p-4 bg-green-50 border-2 border-green-200 rounded-lg text-sm">
          <p className="font-bold text-green-800 mb-2">✅ REAL API CACHING WITH QUERY PARAMS</p>
          <ul className="space-y-1 text-green-700">
            <li>
              • API:{" "}
              <code className="bg-green-100 px-1 rounded text-xs">
                TheCocktailDB
              </code>
            </li>
            <li>
              • Cocktail ID:{" "}
              <code className="bg-green-100 px-1 rounded">{cocktail.id}</code>
            </li>
            <li>
              • Variant:{" "}
              <code className="bg-green-100 px-1 rounded">{variant || "classic"}</code>
            </li>
            <li>
              • Cache key:{" "}
              <code className="bg-green-100 px-1 rounded text-xs">
                {`{ cocktailId: "${cocktail.id}", variant: "${variant || "classic"}" }`}
              </code>
            </li>
            <li>
              • Cache tags:{" "}
              <code className="bg-green-100 px-1 rounded text-xs">
                cocktail-{cocktail.id}, variant-{variant || "classic"}
              </code>
            </li>
            <li>
              • Rendered at:{" "}
              <code className="bg-green-100 px-1 rounded text-xs">
                {new Date().toISOString()}
              </code>
            </li>
            <li className="mt-2 pt-2 border-t border-green-200">
              💡 <strong>Refresca la página</strong> - verás que NO hay nuevo log en consola
              = CACHE HIT
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
