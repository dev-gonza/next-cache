import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// API Route para invalidar cache on-demand
// Ejemplo: POST /api/revalidate?tag=product-87081511
export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag) {
    return NextResponse.json(
      { error: "Missing 'tag' query parameter" },
      { status: 400 }
    );
  }

  try {
    // El segundo argumento es requerido en Next.js 16
    // "max" usa stale-while-revalidate semantics (recomendado)
    revalidateTag(tag, "max");

    return NextResponse.json({
      success: true,
      message: `Revalidated tag: ${tag}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate", details: String(error) },
      { status: 500 }
    );
  }
}

// Documentación de uso
export async function GET() {
  return NextResponse.json({
    description: "API para invalidar cache on-demand",
    usage: {
      method: "POST",
      url: "/api/revalidate?tag=<cache-tag>",
    },
    availableTags: [
      "cocktail-{id} - Invalida cache de un cocktail específico (ej: cocktail-11007)",
    ],
  });
}
