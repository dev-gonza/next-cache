import { getCachedProduct } from "@/lib/data/products";

interface ProductContentProps {
  productSlug: string;
  searchParams: Promise<{ c?: string }>;
}

/**
 * Componente dinámico que lee runtime data (searchParams)
 * y pasa valores a la función cacheada.
 * 
 * Este componente se renderiza dentro de <Suspense>, permitiendo
 * que el static shell se sirva inmediatamente mientras este
 * contenido se genera de forma dinámica.
 */
export async function ProductContent({
  productSlug,
  searchParams,
}: ProductContentProps) {
  // 1. Leer runtime data (searchParams es dinámico)
  const { c: colorCode } = await searchParams;

  // 2. Pasar VALORES primitivos a la función cacheada
  // El colorCode se convierte en parte del cache key
  const product = await getCachedProduct(productSlug, colorCode || "default");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Imagen del producto */}
      <div className="aspect-3/4 bg-gray-100 rounded-lg overflow-hidden">
        <div
          className="w-full h-full flex items-center justify-center text-6xl"
          style={{
            backgroundColor:
              product.colors.find((c) => c.code === product.selectedColor)?.hex ||
              "#f3f4f6",
          }}
        >
          👕
        </div>
      </div>

      {/* Detalles del producto */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Women / Pants / Dress Pants
          </p>
          <h1 className="text-2xl font-semibold mt-2">{product.name}</h1>
          <p className="text-xl mt-2">${product.price.toFixed(2)}</p>
        </div>

        <p className="text-gray-600">{product.description}</p>

        {/* Selector de colores */}
        <div>
          <p className="text-sm font-medium mb-3">
            Color:{" "}
            {product.colors.find((c) => c.code === product.selectedColor)?.name}
          </p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <a
                key={color.code}
                href={`?c=${color.code}`}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  color.code === product.selectedColor
                    ? "border-black scale-110"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Botón de compra */}
        <button className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Add to bag
        </button>

        {/* Info de cache - Solo para debugging */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-medium text-blue-800">🔍 Debug Info:</p>
          <ul className="mt-2 space-y-1 text-blue-700">
            <li>
              • Product slug:{" "}
              <code className="bg-blue-100 px-1 rounded">{productSlug}</code>
            </li>
            <li>
              • Color code:{" "}
              <code className="bg-blue-100 px-1 rounded">
                {product.selectedColor}
              </code>
            </li>
            <li>
              • Cache key:{" "}
              <code className="bg-blue-100 px-1 rounded">
                product-{productSlug}-color-{product.selectedColor}
              </code>
            </li>
            <li>
              • Rendered at:{" "}
              <code className="bg-blue-100 px-1 rounded">
                {new Date().toISOString()}
              </code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
