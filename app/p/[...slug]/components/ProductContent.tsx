import { getCachedCocktail } from "@/lib/data/products";

interface CocktailContentProps {
  cocktailId: string;
}

/**
 * Componente que muestra un cocktail usando datos cacheados
 * desde TheCocktailDB API real.
 * 
 * Este componente se renderiza dentro de <Suspense>, permitiendo
 * que el static shell se sirva inmediatamente mientras este
 * contenido se genera de forma dinámica.
 */
export async function ProductContent({ cocktailId }: CocktailContentProps) {
  // Llamar a la función cacheada con la API REAL
  const cocktail = await getCachedCocktail(cocktailId);

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

        {/* Instrucciones */}
        <div>
          <h2 className="text-lg font-semibold mb-3">📝 Instructions</h2>
          <p className="text-gray-700 leading-relaxed">{cocktail.instructions}</p>
        </div>

        {/* Info de cache - Solo para debugging */}
        <div className="mt-8 p-4 bg-green-50 border-2 border-green-200 rounded-lg text-sm">
          <p className="font-bold text-green-800 mb-2">✅ REAL API CACHING</p>
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
              • Cache tag:{" "}
              <code className="bg-green-100 px-1 rounded">
                cocktail-{cocktail.id}
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
