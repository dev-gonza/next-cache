import { cacheLife, cacheTag } from "next/cache";
import type { Cocktail, CocktailAPIResponse, CocktailAPIData } from "@/lib/types/product";

/**
 * Función helper para parsear ingredientes de la API
 */
function parseIngredients(drink: CocktailAPIData) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}` as keyof CocktailAPIData];
    const measure = drink[`strMeasure${i}` as keyof CocktailAPIData];
    
    if (ingredient && typeof ingredient === 'string') {
      ingredients.push({
        name: ingredient,
        measure: (measure && typeof measure === 'string') ? measure.trim() : '',
      });
    }
  }
  return ingredients;
}

/**
 * Función cacheada que obtiene datos de un cocktail desde TheCocktailDB
 * 
 * @param cocktailId - ID del cocktail (ej: "11007" para Margarita)
 * @returns Datos del cocktail
 * 
 * Cache key automático: { cocktailId }
 * Cache tags: "cocktail-{cocktailId}"
 * 
 * API: https://www.thecocktaildb.com/api.php
 */
export async function getCachedCocktail(cocktailId: string): Promise<Cocktail | null> {
  "use cache";

  // Tags para invalidación on-demand
  cacheTag(`cocktail-${cocktailId}`);

  // Tiempo de cache: 1 hora stale, 2 horas revalidate
  cacheLife("hours");

  console.log(`[CACHE MISS] Fetching cocktail from API: ${cocktailId}`);

  try {
    // Llamada REAL a la API pública
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`,
      {
        // No usar next.revalidate aquí - ya tenemos "use cache"
        cache: "no-store", // Forzamos que el fetch siempre consulte, pero "use cache" cachea el resultado
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: CocktailAPIResponse = await response.json();

    if (!data.drinks || data.drinks.length === 0) {
      console.log(`[API] Cocktail not found: ${cocktailId}`);
      return null;
    }

    const drink = data.drinks[0];

    // Normalizar datos de la API
    return {
      id: drink.idDrink,
      name: drink.strDrink,
      category: drink.strCategory,
      alcoholic: drink.strAlcoholic,
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      image: drink.strDrinkThumb,
      ingredients: parseIngredients(drink),
    };
  } catch (error) {
    console.error(`[ERROR] Failed to fetch cocktail ${cocktailId}:`, error);
    throw error;
  }
}
