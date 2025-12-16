import { cacheLife, cacheTag } from "next/cache";

export default async function FunctionLevelCachePage() {
  // Llamadas a funciones cacheadas
  const userData = await getCachedUserData("user-123");
  const posts = await getCachedPosts();
  const stats = await getCachedStats("daily");

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <a href="/examples" className="text-blue-600 hover:underline">
            ← Back to Examples
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-4">Function Level "use cache"</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> Las funciones async con "use cache" son
            reutilizables y cacheables. El cache key incluye los argumentos.
          </p>
        </div>

        <div className="space-y-6">
          {/* Code Example */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`async function getCachedData(id: string) {
  "use cache";
  cacheTag(\`data-\${id}\`);
  cacheLife("hours");
  
  const data = await fetch(\`/api/data/\${id}\`);
  return data.json();
}

// Cache key automático: { id: "123" }
const data1 = await getCachedData("123");
const data2 = await getCachedData("456"); // Diferente cache
const data3 = await getCachedData("123"); // Cache HIT`}
            </pre>
          </div>

          {/* Data Display */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">User Data</h3>
              <div className="text-sm space-y-1">
                <p className="text-gray-600">ID: {userData.id}</p>
                <p className="text-gray-600">Name: {userData.name}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Cache key: user-123
                </p>
                <p className="text-xs text-gray-500">
                  Generated: {userData.timestamp}
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Posts</h3>
              <div className="text-sm space-y-1">
                <p className="text-gray-600">Count: {posts.count}</p>
                <p className="text-gray-600">Latest: {posts.latest}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Cache tag: posts
                </p>
                <p className="text-xs text-gray-500">
                  Generated: {posts.timestamp}
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Stats</h3>
              <div className="text-sm space-y-1">
                <p className="text-gray-600">Views: {stats.views}</p>
                <p className="text-gray-600">Type: {stats.type}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Cache key: stats-daily
                </p>
                <p className="text-xs text-gray-500">
                  Generated: {stats.timestamp}
                </p>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Características</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  <strong>Cache key automático:</strong> Basado en argumentos de la función
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  <strong>Reutilizable:</strong> Puede ser llamada desde múltiples componentes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  <strong>Composable:</strong> Funciones cacheadas pueden llamar otras funciones cacheadas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  <strong>Testeable:</strong> Funciones puras fáciles de testear
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  <strong>Type-safe:</strong> Con TypeScript completo
                </span>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Casos de Uso Ideales (⭐ Recomendado)
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Data fetching layer:</strong> Funciones que obtienen datos de APIs
              </li>
              <li>
                <strong>Queries a base de datos:</strong> Cachear resultados de queries
              </li>
              <li>
                <strong>Computaciones costosas:</strong> Cálculos que pueden reutilizarse
              </li>
              <li>
                <strong>API wrappers:</strong> Funciones que envuelven llamadas a servicios externos
              </li>
              <li>
                <strong>Separación de concerns:</strong> UI separada de lógica de datos
              </li>
            </ul>
          </div>

          {/* Cache Key Examples */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Cómo Funcionan los Cache Keys
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <code className="bg-blue-100 px-2 py-1 rounded">
                  getCachedUserData("user-123")
                </code>
                <p className="text-gray-600 mt-1">
                  → Cache key: {`{ id: "user-123" }`}
                </p>
              </div>
              <div>
                <code className="bg-blue-100 px-2 py-1 rounded">
                  getCachedStats("daily")
                </code>
                <p className="text-gray-600 mt-1">
                  → Cache key: {`{ type: "daily" }`}
                </p>
              </div>
              <div>
                <code className="bg-blue-100 px-2 py-1 rounded">
                  getCachedStats("weekly")
                </code>
                <p className="text-gray-600 mt-1">
                  → Cache key: {`{ type: "weekly" }`} ← Diferente cache entry
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Funciones cacheadas con diferentes configuraciones
// ==========================================

async function getCachedUserData(id: string) {
  "use cache";
  cacheTag(`user-${id}`);
  cacheLife("hours");

  console.log(`[CACHE MISS] Fetching user: ${id}`);

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id,
    name: `User ${id}`,
    timestamp: new Date().toISOString(),
  };
}

async function getCachedPosts() {
  "use cache";
  cacheTag("posts");
  cacheLife({
    stale: 300,      // 5 minutos
    revalidate: 900, // 15 minutos
    expire: 3600,    // 1 hora
  });

  console.log("[CACHE MISS] Fetching posts");

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    count: 42,
    latest: "My Latest Post",
    timestamp: new Date().toISOString(),
  };
}

async function getCachedStats(type: string) {
  "use cache";
  cacheTag(`stats-${type}`);
  cacheLife("hours");

  console.log(`[CACHE MISS] Fetching stats: ${type}`);

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    type,
    views: Math.floor(Math.random() * 10000),
    timestamp: new Date().toISOString(),
  };
}
