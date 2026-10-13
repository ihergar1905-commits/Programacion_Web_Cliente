/**
 * Transforma una receta cruda de TheMealDB en un objeto limpio.
 * @param {Object} rawMeal - Objeto crudo devuelto por la API.
 * @returns {Object|null} - Receta formateada, o null si no hay datos.
 */
export function formatRecipeData(rawMeal) {
  if (!rawMeal) return null;

  // La API trae strIngredient1..20 y strMeasure1..20.
  // Creamos 20 posiciones, las convertimos en objetos y quitamos las vacías.
  const ingredientes = Array.from({ length: 20 }, (_, i) => ({
    name: (rawMeal[`strIngredient${i + 1}`] || '').trim(),
    measure: (rawMeal[`strMeasure${i + 1}`] || '').trim()
  })).filter((ingrediente) => ingrediente.name !== '');

  return {
    id: rawMeal.idMeal,
    title: rawMeal.strMeal || 'Receta sin nombre',
    category: rawMeal.strCategory || 'Sin categoría',
    area: rawMeal.strArea || 'Internacional',
    instructions: rawMeal.strInstructions || 'No hay instrucciones disponibles.',
    image: rawMeal.strMealThumb || '',
    youtube: rawMeal.strYoutube || null,
    ingredientes: ingredientes
  };
}

/**
 * Recibe un array de recetas crudas y devuelve un array de recetas limpias.
 * Si lo recibido no es un array, devuelve una lista vacía.
 * @param {Array} rawMeals - Recetas procedentes de la API.
 * @returns {Array} - Recetas limpias.
 */
export function processRecipesList(rawMeals = []) {
  if (!Array.isArray(rawMeals)) return [];
  return rawMeals.map(formatRecipeData).filter(Boolean);
}

/**
 * Cuenta cuántas recetas hay de cada categoría.
 * Ejemplo: { Chicken: 5, Pasta: 2 }
 * @param {Array} recipes - Recetas limpias.
 * @returns {Object} - Objeto con el total por categoría.
 */
export function countByCategory(recipes) {
  return recipes.reduce((totals, recipe) => {
    totals[recipe.category] = (totals[recipe.category] || 0) + 1;
    return totals;
  }, {});
}