# Arquitectura del Proyecto

## 📁 Estructura de Directorios

```
next-cache/
├── app/
│   ├── p/[...slug]/
│   │   ├── components/          # Componentes específicos de la página de producto
│   │   │   ├── ProductContent.tsx   # Componente dinámico (lee searchParams)
│   │   │   └── ProductSkeleton.tsx  # Skeleton UI para Suspense
│   │   ├── page.tsx             # Página principal (orchestration)
│   │   └── loading.tsx          # Loading UI a nivel de página
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts         # API de invalidación de cache
│   ├── layout.tsx               # Layout raíz
│   └── page.tsx                 # Home
├── components/
│   └── layout/                  # Componentes de layout globales
│       ├── Header.tsx           # Header del sitio
│       └── Footer.tsx           # Footer del sitio
├── lib/
│   ├── data/                    # Funciones de data fetching
│   │   └── products.ts          # getCachedProduct con "use cache"
│   └── types/                   # TypeScript types
│       └── product.ts           # Product, Color interfaces
├── next.config.ts               # Config con cacheComponents: true
└── tsconfig.json                # TypeScript config con path aliases
```

## 🧩 Separación de Responsabilidades

### **Página Principal** (`app/p/[...slug]/page.tsx`)
- **Responsabilidad:** Orchestration
- **Qué hace:**
  - Recibe params y searchParams
  - Define la estructura del layout (Header, Main, Footer)
  - Configura Suspense boundaries
- **No hace:** Lógica de negocio, data fetching, renderizado complejo

### **Componente Dinámico** (`ProductContent.tsx`)
- **Responsabilidad:** UI del producto + integración con cache
- **Qué hace:**
  - Lee searchParams (runtime data)
  - Extrae valores y los pasa a getCachedProduct
  - Renderiza UI del producto
- **No hace:** Cache logic (eso está en lib/data)

### **Función de Data** (`lib/data/products.ts`)
- **Responsabilidad:** Data fetching + caching strategy
- **Qué hace:**
  - Implementa "use cache"
  - Define cache tags y lifetime
  - Fetch de datos (o mock)
- **No hace:** UI, manejo de runtime data

### **Layout Components** (`components/layout/`)
- **Responsabilidad:** Static shell compartido
- **Qué hace:**
  - Header y Footer reutilizables
  - Pre-renderizados en build
- **No hace:** Lógica dinámica

### **Types** (`lib/types/`)
- **Responsabilidad:** Type safety
- **Definiciones compartidas** de Product, Color, etc.

## 🔄 Flujo de Datos

```
1. User Request
   ↓
2. page.tsx (Orchestration)
   ├─→ Header (Static Shell)
   ├─→ <Suspense>
   │   └─→ ProductContent
   │       ├─→ await searchParams (runtime)
   │       └─→ getCachedProduct(slug, color)
   │           └─→ "use cache" + cacheTag
   └─→ Footer (Static Shell)
```

## 🎯 Beneficios de esta Arquitectura

### ✅ Mantenibilidad
- Cada archivo tiene una responsabilidad clara
- Fácil localizar dónde hacer cambios
- Tests más sencillos (funciones aisladas)

### ✅ Reutilización
- Header/Footer usables en otras páginas
- getCachedProduct puede usarse desde múltiples componentes
- Types compartidos entre todo el proyecto

### ✅ Escalabilidad
- Añadir nuevos productos: solo editar products.ts
- Nuevos componentes: crear en su directorio correspondiente
- Nuevas páginas: reutilizar componentes existentes

### ✅ Type Safety
- Path aliases (@/lib, @/components) facilitan imports
- Types centralizados evitan duplicación
- IntelliSense completo en todo el proyecto

## 🚀 Path Aliases

Configurados en `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

Permite imports limpios:
```typescript
// ❌ Antes
import { Product } from "../../../../lib/types/product"

// ✅ Ahora
import { Product } from "@/lib/types/product"
```
