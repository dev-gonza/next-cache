import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";

// Tipos
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: { code: string; name: string; hex: string }[];
  selectedColor: string;
  image: string;
}

// ============================================
// PÁGINA PRINCIPAL - Static Shell + Dynamic Content
// ============================================

// Genera las rutas estáticas en build time
export async function generateStaticParams() {
  // Define las rutas de productos que quieres pre-renderizar
  return [
    { slug: ["women", "pants", "dress-pants_87081511"] },
  ];
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ c?: string }>;
}) {
  const { slug } = await params;
  const productSlug = slug.join("/");

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ STATIC SHELL - Pre-renderizado en build */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ✅ DYNAMIC CONTENT - Cacheado con use cache */}
        <Suspense fallback={<ProductSkeleton />}>
          <ProductContent productSlug={productSlug} searchParams={searchParams} />
        </Suspense>
      </main>

      {/* ✅ STATIC SHELL */}
      <Footer />
    </div>
  );
}

// ============================================
// COMPONENTE DINÁMICO - Lee searchParams y llama a función cacheada
// ============================================
async function ProductContent({
  productSlug,
  searchParams,
}: {
  productSlug: string;
  searchParams: Promise<{ c?: string }>;
}) {
  // 1. Leer runtime data (searchParams es dinámico)
  const { c: colorCode } = await searchParams;

  // 2. Pasar VALORES primitivos a la función cacheada
  // El colorCode se convierte en parte del cache key
  const product = await getCachedProduct(productSlug, colorCode || "default");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Imagen del producto */}
      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        <div
          className="w-full h-full flex items-center justify-center text-6xl"
          style={{ backgroundColor: product.colors.find(c => c.code === product.selectedColor)?.hex || "#f3f4f6" }}
        >
          👕
        </div>
      </div>

      {/* Detalles del producto */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">Women / Pants / Dress Pants</p>
          <h1 className="text-2xl font-semibold mt-2">{product.name}</h1>
          <p className="text-xl mt-2">${product.price.toFixed(2)}</p>
        </div>

        <p className="text-gray-600">{product.description}</p>

        {/* Selector de colores */}
        <div>
          <p className="text-sm font-medium mb-3">
            Color: {product.colors.find(c => c.code === product.selectedColor)?.name}
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

        {/* Info de cache */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-medium text-blue-800">🔍 Debug Info:</p>
          <ul className="mt-2 space-y-1 text-blue-700">
            <li>• Product slug: <code className="bg-blue-100 px-1 rounded">{productSlug}</code></li>
            <li>• Color code: <code className="bg-blue-100 px-1 rounded">{product.selectedColor}</code></li>
            <li>• Cache key: <code className="bg-blue-100 px-1 rounded">product-{productSlug}-color-{product.selectedColor}</code></li>
            <li>• Rendered at: <code className="bg-blue-100 px-1 rounded">{new Date().toISOString()}</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================
// FUNCIÓN CACHEADA - use cache con cacheTag
// ============================================
async function getCachedProduct(slug: string, colorCode: string): Promise<Product> {
  "use cache";

  // Tags para invalidación on-demand
  cacheTag(`product-${slug}`, `color-${colorCode}`);

  // Tiempo de cache
  cacheLife("hours"); // Cache por 1 hora

  console.log(`[CACHE MISS] Fetching product: ${slug}, color: ${colorCode}`);

  // Simular fetch a API (en producción sería tu API real)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Datos mock del producto
  const colors = [
    { code: "92", name: "Beige", hex: "#d4b896" },
    { code: "99", name: "Black", hex: "#1a1a1a" },
    { code: "05", name: "Navy", hex: "#1e3a5f" },
    { code: "70", name: "Burgundy", hex: "#722f37" },
  ];

  return {
    id: slug.split("_").pop() || "87081511",
    name: "Straight mid-rise pants",
    description:
      "Straight-leg pants with mid-rise waist. Featuring front pockets, back welt pockets, belt loops, and zip fly and button fastening.",
    price: 79.99,
    colors,
    selectedColor: colors.find((c) => c.code === colorCode)?.code || colors[0].code,
    image: `/products/${slug}.jpg`,
  };
}

// ============================================
// COMPONENTES ESTÁTICOS (Static Shell)
// ============================================
function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">MANGO</div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#" className="hover:underline">Women</a>
          <a href="#" className="hover:underline">Men</a>
          <a href="#" className="hover:underline">Kids</a>
          <a href="#" className="hover:underline">Home</a>
        </nav>
        <div className="flex gap-4">
          <button>🔍</button>
          <button>👤</button>
          <button>🛒</button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#">Customer Service</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-gray-500 text-sm">
          © 2025 Demo Store - PPR + Cache Components Example
        </p>
      </div>
    </footer>
  );
}

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 rounded-lg" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-20 bg-gray-200 rounded" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="h-14 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}
