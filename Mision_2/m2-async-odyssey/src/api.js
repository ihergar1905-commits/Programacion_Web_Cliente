// URL base de la API de TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

//  Bloque de JSDoc estructurado
/**
 * Pide recetas a la API según un término de búsqueda.
 * @param {string} query - Nombre del plato o ingrediente, donde ENTRA fuera de la funcion, desde TheMealDB
 * @returns {Promise<Array>} - La funcion DEVUELVE un array con las recetas obtenidas.
 */

// comparta la función con otros archivos
//async hace que la función pase a necesitar una Pormise, ya que avisa que los datos van a tardar
export async function fetchRecipes(query = '') {
  try {
    const respuesta = await fetch(`${BASE_URL}${encodeURIComponent(query)}`);

    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    throw error;
  }
}