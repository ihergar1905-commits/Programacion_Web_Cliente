// Capa de datos: habla con TheMealDB y guarda las búsquedas en localStorage.
// No sabe nada de React: solo recibe un término y devuelve un array.

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; // dirección de la API (al final se pega lo buscado)
const CACHE_PREFIX = 'recipes:'; // principio del nombre con el que se guarda cada búsqueda ("recipes:pasta")
const TIMEOUT_MS = 8000; // si la API tarda más de 8 s, damos error

// Lee de la caché. Solo la acepta si es un array (si no, la ignora).
function readCache(key) {
  try {
    const saved = localStorage.getItem(key); // busca en el navegador lo guardado con ese nombre (es texto)
    if (saved === null) return null; // no había nada guardado
    const data = JSON.parse(saved); // convierte el texto guardado otra vez en datos
    return Array.isArray(data) ? data : null; // solo lo acepta si es una lista
  } catch {
    return null; // caché corrupta o localStorage no disponible
  }
}

// Guarda en la caché. Si falla (almacenamiento lleno, etc.), la app sigue igual.
function saveCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data)); // convierte la lista en texto y la guarda en el navegador
  } catch {
    // no pasa nada: simplemente no se cachea
  }
}

/**
 * Pide recetas a la API según un término de búsqueda (con caché).
 * @param {string} query - Nombre del plato o ingrediente.
 * @param {AbortSignal} [signal] - Para poder cancelar la petición.
 * @returns {Promise<Array>} - Recetas crudas (vacío si no hay).
 */
export async function fetchRecipes(query = '', signal) {
  const term = query.trim().toLowerCase(); // quita espacios y pasa a minúsculas ("  Pasta " → "pasta")
  const cacheKey = CACHE_PREFIX + term; // nombre con el que se guarda en la caché ("recipes:pasta")

  // 1. ¿Ya lo teníamos guardado?
  const cached = readCache(cacheKey); // mira en la caché
  if (cached) {
    console.log(`"${term}" cargado desde la caché`); // aviso en la consola
    return cached; // devuelve lo guardado y no pregunta a la API
  }

  // 2. Si no, lo pedimos a la API. La petición se corta si:
  //    - el componente la cancela (signal), o
  //    - pasan TIMEOUT_MS sin respuesta.
  const signals = [AbortSignal.timeout(TIMEOUT_MS)]; // motivo 1 para cancelar: pasan 8 segundos
  if (signal) signals.push(signal); // motivo 2: nos lo cancelan desde fuera (se buscó otra cosa)

  const response = await fetch(`${BASE_URL}${encodeURIComponent(term)}`, { // pide a la API y espera la respuesta
    signal: AbortSignal.any(signals), // se cancela si se cumple cualquiera de los dos motivos
  });

  if (!response.ok) { // ¿la API ha respondido con error? (ej: 500)
    throw new Error(`Error en la petición: ${response.status}`); // lanza el error para que se muestre el mensaje rojo
  }

  const data = await response.json(); // convierte la respuesta en datos de JavaScript
  const meals = Array.isArray(data.meals) ? data.meals : []; // la API devuelve null si no hay resultados → lista vacía

  saveCache(cacheKey, meals); // lo guarda en la caché para la próxima vez
  return meals; // devuelve la lista de recetas (crudas, sin limpiar)
}
