import { cacheLife, cacheTag } from "next/cache";
import type { Product } from "@/lib/types/product";

/**
 * Función cacheada que obtiene datos del producto
 * 
 * @param slug - Slug del producto (ej: "women/pants/dress-pants_87081511")
 * @param colorCode - Código del color seleccionado
 * @returns Datos del producto con el color seleccionado
 * 
 * Cache key automático: { slug, colorCode }
 * Cache tags: "product-{slug}", "color-{colorCode}"
 */
export async function getCachedProduct(
  slug: string,
  colorCode: string
): Promise<Product> {
  "use cache";

  // Tags para invalidación on-demand
  cacheTag(`product-${slug}`, `color-${colorCode}`);

  // Tiempo de cache: 1 hora stale, 2 horas revalidate
  cacheLife("hours");

  console.log(`[CACHE MISS] Fetching product: ${slug}, color: ${colorCode}`);

  // Simular latencia de API
  await new Promise((resolve) => setTimeout(resolve, 500));

  // En producción, esto sería:
  // const response = await fetch(`${process.env.API_URL}/products/${slug}?c=${colorCode}`);
  // return response.json();

  // Datos mock del producto
  const colors = [
    { code: "92", name: "Beige", hex: "#d4b896" },
    { code: "99", name: "Black", hex: "#1a1a1a" },
    { code: "05", name: "Navy", hex: "#1e3a5f" },
    { code: "70", name: "Burgundy", hex: "#722f37" },
  ];

  return {
    id: slug.split("_").pop() || "87081511",
    name: "Straight mid-rise pants",
    description:
      "Straight-leg pants with mid-rise waist. Featuring front pockets, back welt pockets, belt loops, and zip fly and button fastening.",
    price: 79.99,
    colors,
    selectedColor: colors.find((c) => c.code === colorCode)?.code || colors[0].code,
    image: `/products/${slug}.jpg`,
  };
}
