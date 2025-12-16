import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductContent } from "./components/ProductContent";
import { ProductSkeleton } from "./components/ProductSkeleton";

interface CocktailPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ v?: string }>;
}

/**
 * Página de cocktail con PPR (Partial Prerendering)
 * 
 * Arquitectura:
 * - Static Shell (Header, Footer) → Pre-renderizado, servido desde CDN
 * - Dynamic Content (ProductContent) → Streaming con datos cacheados desde API REAL
 * 
 * Query params: ?v=classic, ?v=frozen, ?v=double
 * Cache: Cada combinación de cocktailId + variant tiene su propia entrada
 */
export default async function CocktailPage({ 
  params, 
  searchParams 
}: CocktailPageProps) {
  const { slug } = await params;
  const cocktailId = slug[0]; // El primer segmento es el ID del cocktail

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ STATIC SHELL - Pre-renderizado en build */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ✅ DYNAMIC CONTENT - Cacheado con "use cache" + API REAL + Query Params */}
        <Suspense fallback={<ProductSkeleton />}>
          <ProductContent cocktailId={cocktailId} searchParams={searchParams} />
        </Suspense>
      </main>

      {/* ✅ STATIC SHELL */}
      <Footer />
    </div>
  );
}
