import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductContent } from "./components/ProductContent";
import { ProductSkeleton } from "./components/ProductSkeleton";

interface ProductPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ c?: string }>;
}

/**
 * Página de producto con PPR (Partial Prerendering)
 * 
 * Arquitectura:
 * - Static Shell (Header, Footer) → Pre-renderizado, servido desde CDN
 * - Dynamic Content (ProductContent) → Streaming con datos cacheados
 * 
 * Sin generateStaticParams: Todas las rutas dinámicas funcionan on-demand
 * Con cacheComponents: Cada ruta se cachea después del primer request
 */
export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { slug } = await params;
  const productSlug = slug.join("/");

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ STATIC SHELL - Pre-renderizado en build */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ✅ DYNAMIC CONTENT - Cacheado con "use cache" */}
        <Suspense fallback={<ProductSkeleton />}>
          <ProductContent productSlug={productSlug} searchParams={searchParams} />
        </Suspense>
      </main>

      {/* ✅ STATIC SHELL */}
      <Footer />
    </div>
  );
}
