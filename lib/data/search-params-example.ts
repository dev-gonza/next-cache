"use cache";

import { cacheLife, cacheTag } from "next/cache";

/**
 * Ejemplo de función cacheada que usa searchParams como argumentos
 * 
 * PATRÓN IMPORTANTE:
 * - searchParams NO se lee dentro de esta función
 * - Los valores se pasan como argumentos desde el componente
 * - Los argumentos se convierten automáticamente en cache key
 * 
 * Cache key para esta función:
 * { filter: "active", sort: "name", page: 1 }
 */

export async function getCachedDataWithParams(
  filter: string,
  sort: string,
  page: number
) {
  "use cache";

  // Cache tags para invalidación granular
  cacheTag(`search-${filter}`, `sort-${sort}`);

  // Cache lifetime: 5 minutos stale, 15 minutos revalidate
  cacheLife({
    stale: 300,
    revalidate: 900,
    expire: 3600,
  });

  console.log(`[CACHE MISS] Fetching data: filter=${filter}, sort=${sort}, page=${page}`);

  // Simular fetch a API o database
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Generar datos de ejemplo basados en los parámetros
  const results = generateResults(filter, sort, page);

  return {
    filter,
    sort,
    page,
    timestamp: new Date().toISOString(),
    query: `filter=${filter}&sort=${sort}&page=${page}`,
    results,
  };
}

function generateResults(filter: string, sort: string, page: number): string[] {
  const base = [
    `Item ${(page - 1) * 10 + 1}`,
    `Item ${(page - 1) * 10 + 2}`,
    `Item ${(page - 1) * 10 + 3}`,
    `Item ${(page - 1) * 10 + 4}`,
    `Item ${(page - 1) * 10 + 5}`,
  ];

  return base.map(
    (item) => `${item} (filter: ${filter}, sort: ${sort})`
  );
}
