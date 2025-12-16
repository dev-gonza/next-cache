import Link from "next/link";

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          "use cache" Examples
        </h1>
        <p className="text-gray-600 mb-8">
          Different ways to implement the "use cache" directive in Next.js 16
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* File Level */}
          <Link
            href="/examples/file-level"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">📄</div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  File Level Cache
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  "use cache" at the top of the file caches the entire page/layout
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    Static Shell
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    Full Page Cache
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Component Level */}
          <Link
            href="/examples/component-level"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">🧩</div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Component Level Cache
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  "use cache" inside a component caches its output independently
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                    Granular Control
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    Composable
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Function Level */}
          <Link
            href="/examples/function-level"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚡</div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Function Level Cache
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  "use cache" in async functions for data fetching only
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                    Data Layer
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    Reusable
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* With SearchParams */}
          <Link
            href="/examples/with-searchparams?filter=active&sort=name"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">🔍</div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  With SearchParams
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  How to cache pages with dynamic query parameters
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                    Runtime Data
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    Cache Key
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* With Cache Tags */}
          <Link
            href="/examples/with-cache-tags"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">🏷️</div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  With Cache Tags
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  Using cacheTag for on-demand revalidation
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                    Invalidation
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    Granular
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* With Custom Cache Life */}
          <Link
            href="/examples/custom-cache-life"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">⏱️</div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Custom Cache Life
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  Different cache lifetime configurations (seconds, hours, days)
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded">
                    TTL Control
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    Flexible
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
