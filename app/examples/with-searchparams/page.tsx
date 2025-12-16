import { getCachedDataWithParams } from "@/lib/data/search-params-example";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    filter?: string;
    sort?: string;
    page?: string;
  }>;
}

export default function WithSearchParamsPage({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <a href="/examples" className="text-blue-600 hover:underline">
            ← Back to Examples
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Caching with SearchParams
        </h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Patrón clave:</strong> Extrae searchParams FUERA del scope
            cacheado, pásalos como argumentos. Los argumentos se convierten en el
            cache key automáticamente.
          </p>
        </div>

        <div className="space-y-6">
          {/* Code Example */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`// ❌ WRONG: searchParams dentro del cached scope
async function getCachedData() {
  "use cache";
  const params = await searchParams; // ¡Error!
  return fetch(...);
}

// ✅ CORRECT: searchParams FUERA, argumentos DENTRO
export default async function Page({ searchParams }) {
  const params = await searchParams; // Runtime data
  const filter = params.filter;
  
  // Argumentos = cache key
  const data = await getCachedData(filter);
  return <div>...</div>;
}

async function getCachedData(filter: string) {
  "use cache";
  cacheTag(\`data-\${filter}\`);
  return fetch(...);
}`}
            </pre>
          </div>

          {/* Dynamic Content */}
          <Suspense fallback={<LoadingSkeleton />}>
            <DynamicContent searchParams={searchParams} />
          </Suspense>

          {/* Try Different Params */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Prueba Diferentes Combinaciones
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Cada combinación de parámetros genera un cache key diferente:
            </p>
            <div className="grid gap-2 text-sm">
              <a
                href="/examples/with-searchparams?filter=active&sort=name&page=1"
                className="text-blue-600 hover:underline"
              >
                ?filter=active&sort=name&page=1
              </a>
              <a
                href="/examples/with-searchparams?filter=completed&sort=date&page=1"
                className="text-blue-600 hover:underline"
              >
                ?filter=completed&sort=date&page=1
              </a>
              <a
                href="/examples/with-searchparams?filter=active&sort=priority&page=2"
                className="text-blue-600 hover:underline"
              >
                ?filter=active&sort=priority&page=2
              </a>
              <a
                href="/examples/with-searchparams?filter=all&sort=name&page=1"
                className="text-blue-600 hover:underline"
              >
                ?filter=all&sort=name&page=1
              </a>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cómo Funciona</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>
                <strong>Extracción:</strong> searchParams se lee FUERA de la
                función cacheada (runtime data)
              </li>
              <li>
                <strong>Paso de argumentos:</strong> Los valores se pasan como
                argumentos a la función cacheada
              </li>
              <li>
                <strong>Cache key automático:</strong> Next.js serializa los
                argumentos como cache key
              </li>
              <li>
                <strong>Cache lookup:</strong> Si existe un cache hit con esos
                argumentos, retorna el valor cacheado
              </li>
              <li>
                <strong>Cache miss:</strong> Si no existe, ejecuta la función y
                cachea el resultado
              </li>
            </ol>
          </div>

          {/* Best Practices */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Best Practices</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  Normaliza los valores (ej: lowercase, trim) antes de pasarlos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Usa valores default para parámetros opcionales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  Limita las combinaciones posibles (ej: whitelist de valores)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>
                  No uses valores que cambien frecuentemente (timestamps, randoms)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>No leas searchParams dentro de "use cache"</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

async function DynamicContent({ searchParams }: {
  searchParams: Promise<{
    filter?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  // 1. Extract runtime data OUTSIDE cached scope
  const params = await searchParams;
  const filter = params.filter || "all";
  const sort = params.sort || "name";
  const page = parseInt(params.page || "1", 10);

  // 2. Pass as arguments to cached function
  // Arguments become the cache key automatically
  const data = await getCachedDataWithParams(filter, sort, page);

  return (
    <>
      {/* Current Query Params */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Query Params Actuales</h2>
        <dl className="space-y-2">
          <div className="flex gap-2">
            <dt className="text-sm text-gray-600 min-w-[80px]">Filter:</dt>
            <dd className="font-mono text-sm bg-blue-100 px-2 rounded">
              {filter}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-sm text-gray-600 min-w-[80px]">Sort:</dt>
            <dd className="font-mono text-sm bg-blue-100 px-2 rounded">
              {sort}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-sm text-gray-600 min-w-[80px]">Page:</dt>
            <dd className="font-mono text-sm bg-blue-100 px-2 rounded">
              {page}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-sm text-gray-600 min-w-[80px]">Cache Key:</dt>
            <dd className="font-mono text-sm bg-blue-100 px-2 rounded">
              {`{ filter: "${filter}", sort: "${sort}", page: ${page} }`}
            </dd>
          </div>
        </dl>
      </div>

      {/* Cached Data */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cached Response</h2>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm text-gray-600">Generated at:</dt>
            <dd className="font-mono text-sm">{data.timestamp}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600">Results count:</dt>
            <dd className="font-mono text-sm">{data.results.length} items</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600">Query:</dt>
            <dd className="font-mono text-sm text-gray-700">
              {data.query}
            </dd>
          </div>
        </dl>
        <div className="mt-4 space-y-1">
          {data.results.map((item, i) => (
            <div key={i} className="text-sm bg-white p-2 rounded">
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <div className="bg-blue-50 p-6 rounded-lg animate-pulse">
        <div className="h-6 bg-blue-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-blue-200 rounded w-2/3"></div>
          <div className="h-4 bg-blue-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="bg-green-50 p-6 rounded-lg animate-pulse">
        <div className="h-6 bg-green-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-green-200 rounded w-full"></div>
          <div className="h-4 bg-green-200 rounded w-5/6"></div>
        </div>
      </div>
    </>
  );
}
