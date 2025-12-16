import { cacheLife } from "next/cache";
import { Suspense } from "react";

export default async function ComponentLevelCachePage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <a href="/examples" className="text-blue-600 hover:underline">
            ← Back to Examples
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-4">Component Level "use cache"</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> Esta página tiene componentes con diferentes
            estrategias de cache. Algunos se cachean, otros no.
          </p>
        </div>

        <div className="space-y-6">
          {/* Code Example */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`async function CachedComponent() {
  "use cache";
  cacheLife("hours");
  
  const data = await fetch(...);
  return <div>{data}</div>;
}

export default function Page() {
  return (
    <>
      <Header /> {/* No cacheado */}
      <CachedComponent /> {/* Cacheado */}
      <Footer /> {/* No cacheado */}
    </>
  );
}`}
            </pre>
          </div>

          {/* Component Examples */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Live Examples:</h2>

            {/* Cached Component 1 */}
            <div className="border rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-2">
                Component 1: Cache de 1 hora
              </div>
              <Suspense fallback={<div className="bg-gray-100 p-4 rounded animate-pulse h-20" />}>
                <CachedComponent1 />
              </Suspense>
            </div>

            {/* Cached Component 2 */}
            <div className="border rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-2">
                Component 2: Cache de 5 minutos
              </div>
              <Suspense fallback={<div className="bg-gray-100 p-4 rounded animate-pulse h-20" />}>
                <CachedComponent2 />
              </Suspense>
            </div>

            {/* Uncached Component */}
            <div className="border rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-2">
                Component 3: Sin cache (siempre dinámico)
              </div>
              <Suspense fallback={<div className="bg-gray-100 p-4 rounded animate-pulse h-20" />}>
                <UncachedComponent />
              </Suspense>
            </div>
          </div>

          {/* Characteristics */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Características</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Control granular: cada componente su propio cache</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Puedes mezclar componentes cacheados y dinámicos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Diferentes cache lifetimes por componente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Composición flexible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">⚠</span>
                <span>Props del componente son parte del cache key</span>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Casos de Uso</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Dashboards con widgets independientes</li>
              <li>Páginas con secciones que cambian a diferentes ritmos</li>
              <li>Componentes reutilizables con su propia lógica de cache</li>
              <li>E-commerce: header dinámico, productos cacheados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente cacheado con lifetime de 1 hora
async function CachedComponent1() {
  "use cache";
  cacheLife("hours");

  await new Promise((resolve) => setTimeout(resolve, 50));

  return (
    <div className="bg-green-50 p-4 rounded">
      <p className="text-sm font-medium text-green-800">Cached for 1 hour</p>
      <p className="text-xs text-green-600 mt-1">
        Generated at: {new Date().toISOString()}
      </p>
      <p className="text-xs text-green-600">
        Random: {Math.random().toString(36).substring(7)}
      </p>
    </div>
  );
}

// Componente cacheado con lifetime de 5 minutos
async function CachedComponent2() {
  "use cache";
  cacheLife({
    stale: 300,      // 5 minutos
    revalidate: 600, // 10 minutos
    expire: 3600,    // 1 hora máximo
  });

  await new Promise((resolve) => setTimeout(resolve, 50));

  return (
    <div className="bg-blue-50 p-4 rounded">
      <p className="text-sm font-medium text-blue-800">Cached for 5 minutes</p>
      <p className="text-xs text-blue-600 mt-1">
        Generated at: {new Date().toISOString()}
      </p>
      <p className="text-xs text-blue-600">
        Random: {Math.random().toString(36).substring(7)}
      </p>
    </div>
  );
}

// Componente sin cache (siempre dinámico)
async function UncachedComponent() {
  // Sin "use cache" - siempre se renderiza fresh
  await new Promise((resolve) => setTimeout(resolve, 50));

  return (
    <div className="bg-purple-50 p-4 rounded">
      <p className="text-sm font-medium text-purple-800">
        No cache (always dynamic)
      </p>
      <p className="text-xs text-purple-600 mt-1">
        Generated at: {new Date().toISOString()}
      </p>
      <p className="text-xs text-purple-600">
        Random: {Math.random().toString(36).substring(7)}
      </p>
    </div>
  );
}
