"use cache";

import { cacheLife, cacheTag } from "next/cache";

/**
 * Ejemplo de función cacheada con múltiples cache tags
 * 
 * Cache Tags Strategy:
 * 1. Tag específico: `{type}-{id}` - para invalidar un recurso individual
 * 2. Tag por tipo: `type-{type}` - para invalidar todos los recursos de un tipo
 * 3. Tag global: `all-data` - para invalidar todo
 */

export async function getCachedDataWithTags(type: string, id: string) {
  "use cache";

  // Múltiples tags para diferentes niveles de invalidación
  cacheTag(
    `${type}-${id}`,      // Tag específico
    `type-${type}`,       // Tag por tipo
    "all-data"            // Tag global
  );

  cacheLife("hours");

  console.log(`[CACHE MISS] Fetching ${type}: ${id}`);

  // Simular fetch
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    type,
    id,
    timestamp: new Date().toISOString(),
    data: `Sample ${type} data for ${id}`,
  };
}
