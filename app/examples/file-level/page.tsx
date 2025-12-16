"use cache";

import { cacheLife } from "next/cache";

/**
 * File-level "use cache"
 * 
 * Cuando "use cache" está al inicio del archivo:
 * - Cachea TODA la página
 * - Todos los exports deben ser async functions
 * - La página completa se comporta como una unidad cacheada
 * 
 * Ventajas:
 * - Sintaxis simple
 * - Todo el contenido se cachea junto
 * 
 * Desventajas:
 * - No puedes tener partes dinámicas diferentes
 * - No puedes usar runtime data (cookies, headers, searchParams)
 */

export default async function FileLevelCachePage() {
  // Configuración de cache lifetime para toda la página
  cacheLife("hours");
  
  // Simular fetch de datos
  const data = await fetchPageData();

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <a href="/examples" className="text-blue-600 hover:underline">
            ← Back to Examples
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-4">File Level "use cache"</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> Toda esta página está cacheada como una unidad.
            Refresca varias veces y el timestamp no cambiará hasta que expire el cache.
          </p>
        </div>

        <div className="space-y-6">
          {/* Code Example */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`"use cache";
import { cacheLife } from "next/cache";

cacheLife("hours");

export default async function Page() {
  // Toda la página se cachea
  const data = await fetch(...);
  return <div>...</div>;
}`}
            </pre>
          </div>

          {/* Data Display */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cached Data</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-600">Rendered at:</dt>
                <dd className="font-mono text-sm">
                  {data.timestamp}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Random ID:</dt>
                <dd className="font-mono text-sm">
                  {data.randomId}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Cache Lifetime:</dt>
                <dd className="font-mono text-sm">
                  1 hour (stale) / 2 hours (revalidate)
                </dd>
              </div>
            </dl>
          </div>

          {/* Characteristics */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Características</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Cache de página completa (fast initial load)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Sintaxis simple y directa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Ideal para páginas completamente estáticas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>No puede usar runtime data (cookies, headers, searchParams)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>Sin granularidad (todo o nada)</span>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Casos de Uso Ideales</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Landing pages estáticas</li>
              <li>Páginas de documentación</li>
              <li>Blogs con contenido que no cambia frecuentemente</li>
              <li>About pages, políticas de privacidad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

async function fetchPageData() {
  // Simular latencia
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    timestamp: new Date().toISOString(),
    randomId: Math.random().toString(36).substring(7),
  };
}
