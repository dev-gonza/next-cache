import {
  getCachedWithSeconds,
  getCachedWithMinutes,
  getCachedWithHours,
  getCachedWithDays,
  getCachedWithCustom,
} from "@/lib/data/cache-life-example";
import { Suspense } from "react";

export default function CustomCacheLifePage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <a href="/examples" className="text-blue-600 hover:underline">
            ← Back to Examples
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-4">Custom Cache Lifetimes</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>cacheLife</strong> soporta presets ("seconds", "minutes",
            "hours", "days", "weeks", "max") y configuración custom.
          </p>
        </div>

        <div className="space-y-6">
          {/* Code Examples */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`// Presets
cacheLife("seconds"); // 1s / 10s / 1min
cacheLife("minutes"); // 1min / 10min / 1h
cacheLife("hours");   // 1h / 2h / 1day
cacheLife("days");    // 1day / 7days / 30days
cacheLife("weeks");   // 7days / 30days / 1year
cacheLife("max");     // 1year / 1year / infinity

// Custom
cacheLife({
  stale: 300,      // 5 minutos
  revalidate: 900, // 15 minutos
  expire: 3600,    // 1 hora
});`}
            </pre>
          </div>

          {/* Data Cards */}
          <div className="space-y-4">
            <Suspense fallback={<LoadingSkeleton />}>
              <DataCards />
            </Suspense>
          </div>

          {/* Explanation */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Entendiendo Cache Lifetime
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <h3 className="font-medium text-gray-900">
                  <span className="text-green-600">stale</span> (fresh duration)
                </h3>
                <p className="text-gray-600">
                  Tiempo en que el cache se considera "fresh" y se sirve sin
                  revalidar
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  <span className="text-yellow-600">revalidate</span> (stale duration)
                </h3>
                <p className="text-gray-600">
                  Tiempo máximo que el cache puede estar "stale" antes de
                  revalidar en background
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  <span className="text-red-600">expire</span> (max age)
                </h3>
                <p className="text-gray-600">
                  Tiempo absoluto después del cual el cache se elimina
                  completamente
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Timeline de Cache (ejemplo: hours preset)
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-24 text-gray-600">0 - 1h</div>
                <div className="flex-1 bg-green-200 h-8 rounded flex items-center px-3">
                  <span className="text-green-800 font-medium">FRESH</span>
                  <span className="text-green-700 text-xs ml-2">
                    (cache hit instantáneo)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 text-gray-600">1h - 2h</div>
                <div className="flex-1 bg-yellow-200 h-8 rounded flex items-center px-3">
                  <span className="text-yellow-800 font-medium">STALE</span>
                  <span className="text-yellow-700 text-xs ml-2">
                    (sirve cache + revalida en background)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 text-gray-600">2h+</div>
                <div className="flex-1 bg-red-200 h-8 rounded flex items-center px-3">
                  <span className="text-red-800 font-medium">EXPIRED</span>
                  <span className="text-red-700 text-xs ml-2">
                    (regenera completamente)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Best Practices</h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  Usa <code className="bg-blue-100 px-1 rounded">seconds</code>{" "}
                  para datos que cambian constantemente
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  Usa <code className="bg-blue-100 px-1 rounded">minutes</code>{" "}
                  para feeds y listados dinámicos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  Usa <code className="bg-blue-100 px-1 rounded">hours</code>{" "}
                  para páginas de productos y contenido semi-estático
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  Usa <code className="bg-blue-100 px-1 rounded">days</code> o{" "}
                  <code className="bg-blue-100 px-1 rounded">weeks</code> para
                  documentación y contenido estático
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  Combina con <code className="bg-blue-100 px-1 rounded">cacheTag</code>{" "}
                  para invalidación on-demand cuando sea necesario
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

async function DataCards() {
  const secondsData = await getCachedWithSeconds();
  const minutesData = await getCachedWithMinutes();
  const hoursData = await getCachedWithHours();
  const daysData = await getCachedWithDays();
  const customData = await getCachedWithCustom();

  return (
    <>
      {/* Seconds */}
      <div className="border rounded-lg p-4 bg-yellow-50">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-yellow-900">
            "seconds" Preset
          </h3>
          <code className="text-xs bg-yellow-200 px-2 py-1 rounded">
            cacheLife("seconds")
          </code>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-gray-700">
            Stale: 1s | Revalidate: 10s | Expire: 1min
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Generated: {secondsData.timestamp}
          </p>
          <p className="text-xs text-gray-500">
            Ideal para: datos en tiempo real, contadores live
          </p>
        </div>
      </div>

      {/* Minutes */}
      <div className="border rounded-lg p-4 bg-green-50">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-green-900">
            "minutes" Preset
          </h3>
          <code className="text-xs bg-green-200 px-2 py-1 rounded">
            cacheLife("minutes")
          </code>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-gray-700">
            Stale: 1min | Revalidate: 10min | Expire: 1h
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Generated: {minutesData.timestamp}
          </p>
          <p className="text-xs text-gray-500">
            Ideal para: feeds de noticias, precios de stocks
          </p>
        </div>
      </div>

      {/* Hours */}
      <div className="border rounded-lg p-4 bg-blue-50">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-blue-900">"hours" Preset</h3>
          <code className="text-xs bg-blue-200 px-2 py-1 rounded">
            cacheLife("hours")
          </code>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-gray-700">
            Stale: 1h | Revalidate: 2h | Expire: 1day
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Generated: {hoursData.timestamp}
          </p>
          <p className="text-xs text-gray-500">
            Ideal para: catálogos de productos, páginas de landing
          </p>
        </div>
      </div>

      {/* Days */}
      <div className="border rounded-lg p-4 bg-purple-50">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-purple-900">"days" Preset</h3>
          <code className="text-xs bg-purple-200 px-2 py-1 rounded">
            cacheLife("days")
          </code>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-gray-700">
            Stale: 1day | Revalidate: 7days | Expire: 30days
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Generated: {daysData.timestamp}
          </p>
          <p className="text-xs text-gray-500">
            Ideal para: contenido estático, documentación
          </p>
        </div>
      </div>

      {/* Custom */}
      <div className="border rounded-lg p-4 bg-orange-50">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-orange-900">
            Custom Configuration
          </h3>
          <code className="text-xs bg-orange-200 px-2 py-1 rounded">
            custom object
          </code>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-gray-700">
            Stale: 5min | Revalidate: 15min | Expire: 1h
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Generated: {customData.timestamp}
          </p>
          <p className="text-xs text-gray-500">
            Ideal para: cuando necesitas control preciso
          </p>
        </div>
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 bg-gray-50 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </>
  );
}
