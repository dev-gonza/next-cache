import { getCachedDataWithTags } from "@/lib/data/cache-tags-example";
import { Suspense } from "react";

export default function WithCacheTagsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <a href="/examples" className="text-blue-600 hover:underline">
            ← Back to Examples
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-4">Cache Tags & Invalidation</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Cache Tags</strong> permiten invalidar grupos de cache de
            forma granular usando revalidateTag().
          </p>
        </div>

        <div className="space-y-6">
          {/* Code Example */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`async function getCachedData(type: string, id: string) {
  "use cache";
  
  // Tags para invalidación granular
  cacheTag(\`\${type}-\${id}\`, \`type-\${type}\`, "all-data");
  
  cacheLife("hours");
  return fetch(...);
}

// Invalidar cache específico
await revalidateTag("user-123", "max");

// Invalidar todos los users
await revalidateTag("type-user", "max");

// Invalidar todo
await revalidateTag("all-data", "max");`}
            </pre>
          </div>

          {/* Cached Data Cards */}
          <Suspense fallback={<LoadingSkeleton />}>
            <CachedDataCards />
          </Suspense>

          {/* Invalidation Examples */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Invalidación On-Demand
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Usa estos endpoints para invalidar diferentes grupos de cache:
            </p>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded">
                <code className="text-sm block mb-1">
                  POST /api/revalidate?tag=user-123
                </code>
                <p className="text-xs text-gray-600">
                  Invalida solo el cache del user 123
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <code className="text-sm block mb-1">
                  POST /api/revalidate?tag=type-user
                </code>
                <p className="text-xs text-gray-600">
                  Invalida cache de TODOS los usuarios
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <code className="text-sm block mb-1">
                  POST /api/revalidate?tag=type-product
                </code>
                <p className="text-xs text-gray-600">
                  Invalida cache de TODOS los productos
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <code className="text-sm block mb-1">
                  POST /api/revalidate?tag=all-data
                </code>
                <p className="text-xs text-gray-600">
                  Invalida TODO el cache de esta página
                </p>
              </div>
            </div>
          </div>

          {/* Tag Strategies */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Estrategias de Tagging
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  1. Tags Específicos
                </h3>
                <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                  cacheTag(`user-${`{id}`}`)
                </code>
                <p className="text-gray-600 mt-1">
                  Para invalidar recursos individuales
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  2. Tags por Tipo
                </h3>
                <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                  cacheTag(`type-${`{resourceType}`}`)
                </code>
                <p className="text-gray-600 mt-1">
                  Para invalidar todos los recursos de un tipo
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  3. Tags Globales
                </h3>
                <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                  cacheTag("all-data")
                </code>
                <p className="text-gray-600 mt-1">
                  Para invalidar grupos completos de cache
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  4. Tags Jerárquicos
                </h3>
                <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                  cacheTag("org-123", "team-456", "user-789")
                </code>
                <p className="text-gray-600 mt-1">
                  Para invalidar por niveles de jerarquía
                </p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Casos de Uso</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Actualización de datos:</strong> Cuando un usuario edita
                su perfil, invalida `user-{`{id}`}`
              </li>
              <li>
                <strong>Cambios en colección:</strong> Cuando se crea un nuevo
                producto, invalida `type-product`
              </li>
              <li>
                <strong>Eventos globales:</strong> Cuando hay un deploy o cambio
                de configuración, invalida `all-data`
              </li>
              <li>
                <strong>Invalidación relacionada:</strong> Cuando se actualiza
                una categoría, invalida productos relacionados
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

async function CachedDataCards() {
  // Llamadas a funciones con diferentes cache tags
  const userData = await getCachedDataWithTags("user", "123");
  const productData = await getCachedDataWithTags("product", "456");
  const categoryData = await getCachedDataWithTags("category", "electronics");

  return (
    <div className="grid gap-4">
      <div className="border rounded-lg p-4 bg-blue-50">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-blue-900">User Data</h3>
          <div className="flex gap-2">
            <span className="text-xs bg-blue-200 px-2 py-1 rounded">
              user-123
            </span>
            <span className="text-xs bg-blue-200 px-2 py-1 rounded">
              type-user
            </span>
          </div>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-gray-700">Type: {userData.type}</p>
          <p className="text-gray-700">ID: {userData.id}</p>
          <p className="text-xs text-gray-500 mt-2">
            Generated: {userData.timestamp}
          </p>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-green-50">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-green-900">Product Data</h3>
          <div className="flex gap-2">
            <span className="text-xs bg-green-200 px-2 py-1 rounded">
              product-456
            </span>
            <span className="text-xs bg-green-200 px-2 py-1 rounded">
              type-product
            </span>
          </div>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-gray-700">Type: {productData.type}</p>
          <p className="text-gray-700">ID: {productData.id}</p>
          <p className="text-xs text-gray-500 mt-2">
            Generated: {productData.timestamp}
          </p>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-purple-50">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-purple-900">Category Data</h3>
          <div className="flex gap-2">
            <span className="text-xs bg-purple-200 px-2 py-1 rounded">
              category-electronics
            </span>
            <span className="text-xs bg-purple-200 px-2 py-1 rounded">
              type-category
            </span>
          </div>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-gray-700">Type: {categoryData.type}</p>
          <p className="text-gray-700">ID: {categoryData.id}</p>
          <p className="text-xs text-gray-500 mt-2">
            Generated: {categoryData.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 bg-gray-50 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
