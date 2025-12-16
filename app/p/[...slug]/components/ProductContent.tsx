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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Imagen del cocktail */}
      <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Detalles del cocktail */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {cocktail.category} • {cocktail.alcoholic}
          </p>
          <h1 className="text-3xl font-bold mt-2">{cocktail.name}</h1>
          <p className="text-lg text-gray-600 mt-1">Serve in: {cocktail.glass}</p>
        </div>

        {/* Ingredientes */}
        <div>
          <h2 className="text-lg font-semibold mb-3">🍹 Ingredients</h2>
          <ul className="space-y-2">
            {cocktail.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex justify-between py-2 px-3 bg-gray-50 rounded"
              >
                <span className="font-medium">{ingredient.name}</span>
                <span className="text-gray-600">{ingredient.measure || "To taste"}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Selector de variantes */}
        <div>
          <p className="text-sm font-medium mb-3">
            Variant:{" "}
            <span className="capitalize">
              {variant || "classic"}
            </span>
          </p>
          <div className="flex gap-2">
            <a
              href={`?v=classic`}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                (!variant || variant === "classic")
                  ? "border-blue-500 bg-blue-50 font-semibold"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              🍹 Classic
            </a>
            <a
              href={`?v=frozen`}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                variant === "frozen"
                  ? "border-blue-500 bg-blue-50 font-semibold"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              🧊 Frozen
            </a>
            <a
              href={`?v=double`}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                variant === "double"
                  ? "border-blue-500 bg-blue-50 font-semibold"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              💪 Double
            </a>
          </div>
        </div>

        {/* Instrucciones */}
        <div>
          <h2 className="text-lg font-semibold mb-3">📝 Instructions</h2>
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
