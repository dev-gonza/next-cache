// Tipos para la respuesta de TheCocktailDB API
export interface CocktailAPIResponse {
  drinks: CocktailAPIData[] | null;
}

export interface CocktailAPIData {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
}

// Tipo normalizado para usar en la app
export interface Cocktail {
  id: string;
  name: string;
  category: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  image: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  measure: string;
}
