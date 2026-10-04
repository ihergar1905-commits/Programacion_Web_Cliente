/**
 * Transforma un objeto de receta crudo de TheMealDB en un objeto limpio y estructurado.
 * @param {Object} rawMeal - Objeto crudo devuelto por la API.
 * @returns {Object} - Objeto de receta formateado y listo para la UI.
 */
export function formatRecipeData(rawMeal) {
  if (!rawMeal) return null;

  // Extraemos y filtramos los ingredientes y sus medidas
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ingrediente = rawMeal[`strIngredient${i}`];
    const measure = rawMeal[`strMeasure${i}`];

    if (ingrediente && ingrediente.trim() !== '') {
      ingredientes.push({
        name: ingrediente.trim(),
        measure: measure ? measure.trim() : ''
      }); 
    }
  }

  return {
    id: rawMeal.idMeal,
    title: rawMeal.strMeal,
    category: rawMeal.strCategory || 'Sin categoría',
    area: rawMeal.strArea || 'Internacional',
    instructions: rawMeal.strInstructions || 'No hay instrucciones disponibles.',
    image: rawMeal.strMealThumb,
    youtube: rawMeal.strYoutube || null,
    ingredientes: ingredientes
  };
}

/**
 * Recibe un array de recetas crudas y devuelve un array con todas formateadas.
 * @param {Array} rawMeals - Array de recetas procedentes de la API.
 * @returns {Array} - Array de recetas limpias.
 */
export function processRecipesList(rawMeals = []) {
  if (!Array.isArray(rawMeals)) return [];
  return rawMeals.map(formatRecipeData).filter(Boolean);
}