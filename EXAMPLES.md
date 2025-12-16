# "use cache" Examples Documentation

Guía completa de todas las formas de implementar la directiva `"use cache"` en Next.js 16.

## 📚 Índice de Ejemplos

### 1. [File Level Cache](/examples/file-level)
**Patrón:** `"use cache"` al inicio del archivo

```tsx
"use cache";
import { cacheLife } from "next/cache";

export default async function Page() {
  cacheLife("hours");
  const data = await fetchData();
  return <div>{data}</div>;
}
```

**Características:**
- ✅ Cache de página completa
- ✅ Sintaxis simple y directa
- ✅ Ideal para páginas completamente estáticas
- ❌ No puede usar runtime data (cookies, headers, searchParams)
- ❌ Sin granularidad (todo o nada)

**Casos de Uso:**
- Landing pages estáticas
- Páginas de documentación
- About pages, políticas de privacidad
- Blogs con contenido que no cambia frecuentemente

---

### 2. [Component Level Cache](/examples/component-level)
**Patrón:** `"use cache"` dentro de componentes individuales

```tsx
async function CachedComponent() {
  "use cache";
  cacheLife("hours");
  
  const data = await fetch(...);
  return <div>{data}</div>;
}

export default function Page() {
  return (
    <>
      <Header /> {/* No cacheado */}
      <Suspense>
        <CachedComponent /> {/* Cacheado */}
      </Suspense>
      <Footer /> {/* No cacheado */}
    </>
  );
}
```

**Características:**
- ✅ Control granular: cada componente su propio cache
- ✅ Puedes mezclar componentes cacheados y dinámicos
- ✅ Diferentes cache lifetimes por componente
- ✅ Composición flexible
- ⚠️ Props del componente son parte del cache key

**Casos de Uso:**
- Dashboards con widgets independientes
- Páginas con secciones que cambian a diferentes ritmos
- Componentes reutilizables con su propia lógica de cache
- E-commerce: header dinámico, productos cacheados

---

### 3. [Function Level Cache](/examples/function-level) ⭐ **Recomendado**
**Patrón:** `"use cache"` en funciones async de data fetching

```tsx
async function getCachedData(id: string) {
  "use cache";
  cacheTag(`data-${id}`);
  cacheLife("hours");
  
  const data = await fetch(`/api/data/${id}`);
  return data.json();
}

export default async function Page() {
  const data = await getCachedData("123");
  return <div>{data}</div>;
}
```

**Características:**
- ✅ **Cache key automático:** Basado en argumentos de la función
- ✅ **Reutilizable:** Puede ser llamada desde múltiples componentes
- ✅ **Composable:** Funciones cacheadas pueden llamar otras funciones cacheadas
- ✅ **Testeable:** Funciones puras fáciles de testear
- ✅ **Type-safe:** Con TypeScript completo

**Casos de Uso (los más comunes):**
- **Data fetching layer:** Funciones que obtienen datos de APIs
- **Queries a base de datos:** Cachear resultados de queries
- **Computaciones costosas:** Cálculos que pueden reutilizarse
- **API wrappers:** Funciones que envuelven llamadas a servicios externos
- **Separación de concerns:** UI separada de lógica de datos

---

### 4. [Caching with SearchParams](/examples/with-searchparams)
**Patrón:** Extraer searchParams FUERA, pasar como argumentos

```tsx
// ❌ WRONG
async function getCachedData() {
  "use cache";
  const params = await searchParams; // ¡Error!
  return fetch(...);
}

// ✅ CORRECT
export default async function Page({ searchParams }) {
  const params = await searchParams; // Runtime data
  const filter = params.filter;
  
  // Argumentos = cache key
  const data = await getCachedData(filter);
  return <div>{data}</div>;
}

async function getCachedData(filter: string) {
  "use cache";
  cacheTag(`data-${filter}`);
  return fetch(...);
}
```

**Cómo Funciona:**
1. **Extracción:** searchParams se lee FUERA de la función cacheada (runtime data)
2. **Paso de argumentos:** Los valores se pasan como argumentos a la función cacheada
3. **Cache key automático:** Next.js serializa los argumentos como cache key
4. **Cache lookup:** Si existe un cache hit con esos argumentos, retorna el valor cacheado
5. **Cache miss:** Si no existe, ejecuta la función y cachea el resultado

**Best Practices:**
- ✅ Normaliza los valores (ej: lowercase, trim) antes de pasarlos
- ✅ Usa valores default para parámetros opcionales
- ✅ Limita las combinaciones posibles (ej: whitelist de valores)
- ❌ No uses valores que cambien frecuentemente (timestamps, randoms)
- ❌ No leas searchParams dentro de "use cache"

---

### 5. [Cache Tags](/examples/with-cache-tags)
**Patrón:** Tags para invalidación granular con `revalidateTag()`

```tsx
async function getCachedData(type: string, id: string) {
  "use cache";
  
  // Múltiples tags para diferentes niveles de invalidación
  cacheTag(
    `${type}-${id}`,      // Tag específico
    `type-${type}`,       // Tag por tipo
    "all-data"            // Tag global
  );
  
  cacheLife("hours");
  return fetch(...);
}

// Invalidación on-demand
await revalidateTag("user-123", "max");       // Invalida usuario específico
await revalidateTag("type-user", "max");      // Invalida todos los usuarios
await revalidateTag("all-data", "max");       // Invalida todo
```

**Estrategias de Tagging:**

1. **Tags Específicos:** `cacheTag(\`user-${id}\`)`
   - Para invalidar recursos individuales

2. **Tags por Tipo:** `cacheTag(\`type-${resourceType}\`)`
   - Para invalidar todos los recursos de un tipo

3. **Tags Globales:** `cacheTag("all-data")`
   - Para invalidar grupos completos de cache

4. **Tags Jerárquicos:** `cacheTag("org-123", "team-456", "user-789")`
   - Para invalidar por niveles de jerarquía

**Casos de Uso:**
- **Actualización de datos:** Usuario edita perfil → invalida `user-{id}`
- **Cambios en colección:** Nuevo producto → invalida `type-product`
- **Eventos globales:** Deploy → invalida `all-data`
- **Invalidación relacionada:** Actualiza categoría → invalida productos relacionados

---

### 6. [Custom Cache Life](/examples/custom-cache-life)
**Patrón:** Configuración de cache lifetime con presets o custom

```tsx
// Presets disponibles
cacheLife("seconds");  // 1s / 10s / 1min
cacheLife("minutes");  // 1min / 10min / 1h
cacheLife("hours");    // 1h / 2h / 1day
cacheLife("days");     // 1day / 7days / 30days
cacheLife("weeks");    // 7days / 30days / 1year
cacheLife("max");      // 1year / 1year / infinity

// Configuración custom
cacheLife({
  stale: 300,      // 5 minutos fresh
  revalidate: 900, // 15 minutos stale (revalidate en background)
  expire: 3600,    // 1 hora máximo absoluto
});
```

**Entendiendo Cache Lifetime:**

- **`stale` (fresh duration):** Tiempo en que el cache se considera "fresh" y se sirve sin revalidar
- **`revalidate` (stale duration):** Tiempo máximo que el cache puede estar "stale" antes de revalidar en background
- **`expire` (max age):** Tiempo absoluto después del cual el cache se elimina completamente

**Timeline de Cache (ejemplo: hours preset):**

```
0 - 1h:   🟢 FRESH    (cache hit instantáneo)
1h - 2h:  🟡 STALE    (sirve cache + revalida en background)
2h+:      🔴 EXPIRED  (regenera completamente)
```

**Best Practices:**
- ✅ `seconds` para datos que cambian constantemente
- ✅ `minutes` para feeds y listados dinámicos
- ✅ `hours` para páginas de productos y contenido semi-estático
- ✅ `days` o `weeks` para documentación y contenido estático
- ✅ Combina con `cacheTag` para invalidación on-demand

---

## 🎯 Guía de Selección

### ¿Qué patrón usar?

| Escenario | Patrón Recomendado | Ejemplo |
|-----------|-------------------|---------|
| Página completamente estática | File Level | Documentación, about page |
| Dashboard con widgets | Component Level | Admin panel, analytics |
| Data fetching reutilizable | **Function Level** ⭐ | API calls, DB queries |
| Páginas con query params | Function + SearchParams | E-commerce filters, search |
| Necesitas invalidación | Function + Cache Tags | User profiles, product catalog |
| Control preciso de TTL | Custom Cache Life | Rate-limited APIs, scheduled updates |

### Recomendación General

Para la mayoría de casos, usa **Function Level Cache** porque:
- Separación clara entre UI y datos
- Reutilizable en múltiples componentes
- Testeable y mantenible
- Cache key automático basado en argumentos
- Funciona perfectamente con TypeScript

---

## 🚀 Setup del Proyecto

### Requisitos
- Next.js 16.0.10+
- Node.js 18+
- React 19+

### Configuración en `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,  // 👈 Habilita PPR + Cache Components
  },
};

export default nextConfig;
```

### Instalación

```bash
npm install
npm run dev
```

Visita `http://localhost:3000/examples` para ver todos los ejemplos.

---

## 📖 Recursos

- [Next.js "use cache" Documentation](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [Vercel Blog: PPR & Cache Components](https://vercel.com/blog)
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura del proyecto

---

## 🤝 Contribuciones

Este proyecto es un ejemplo educativo. Si encuentras errores o tienes sugerencias, por favor abre un issue.

---

**Happy Caching! 🚀**
