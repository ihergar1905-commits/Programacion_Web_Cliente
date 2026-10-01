// URL base de la API de TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

/**
 * Pide recetas a la API según un término de búsqueda.
 * @param {string} query - Nombre del plato o ingrediente.
 * @returns {Promise<Array>} - Array con las recetas obtenidas.
 */
export async function fetchRecipes(query = '') {
  try {
    const response = await fetch(`${BASE_URL}${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    throw error;
  }
}