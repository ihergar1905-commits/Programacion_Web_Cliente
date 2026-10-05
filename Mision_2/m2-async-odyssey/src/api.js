// URL base de la API de TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const CACHE_PREFIX = 'recipes:';

// Lee de la caché. Si no hay nada o está corrupta, devuelve null.
function readCache(key) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// Guarda en la caché. Si falla (almacenamiento lleno, etc.), la app sigue igual.
function saveCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // no pasa nada: simplemente no se cachea
  }
}

/**
 * Pide recetas a la API según un término de búsqueda.
 * Usa localStorage para no repetir peticiones ya hechas (BONUS).
 * @param {string} query - Nombre del plato o ingrediente.
 * @returns {Promise<Array>} - Array con las recetas obtenidas (vacío si no hay).
 */
export async function fetchRecipes(query = '') {
  const term = query.trim().toLowerCase();
  const cacheKey = CACHE_PREFIX + term;

  // 1. ¿Ya lo teníamos guardado?
  const cached = readCache(cacheKey);
  if (cached) {
    console.log(`"${term}" cargado desde la caché`);
    return cached;
  }

  // 2. Si no, lo pedimos a la API
  try {
    const respuesta = await fetch(`${BASE_URL}${encodeURIComponent(term)}`);

    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    const meals = data.meals || []; // la API devuelve null si no hay resultados

    saveCache(cacheKey, meals);
    return meals;
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    throw error;
  }
}