// URL base fija de la API externa de TheMealDB a la que haremos las peticiones
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

/**
 * Bloque de JSDoc estructurado: 
 * No es código ejecutable. Son metadatos organizados que lee el editor (como VS Code)
 * antes de ejecutar el programa para ofrecer autocompletado, tooltips y ayudas visuales.
 * 
 * @param {string} query - Parámetro de entrada: el término o plato que busca el usuario.
 * @returns {Promise<Array>} - Valor de salida: la función devuelve una Promesa que resuelve un Array de recetas.
 */

// 'export' permite compartir esta función para que pueda ser importada y usada en otros archivos (como main.js)
// 'async' indica que la función maneja operaciones asíncronas y usará 'await'
export async function fetchRecipes(query = '') {
  // El bloque 'try' encapsula el código susceptible de fallar
  try {
    // 1. Construye la URL usando Template Literals (``) y `${...}` para interpolar variables.
    // 2. 'encodeURIComponent(query)' limpia espacios o caracteres raros para que la URL sea segura para la web.
    // 3. 'fetch' actúa como el mensajero HTTP que envía la petición al servidor.
    // 4. 'await' pausa la ejecución de forma controlada hasta que el servidor responde de vuelta.
    const respuesta = await fetch(`${BASE_URL}${encodeURIComponent(query)}`);

    // 'response.ok' comprueba si el código de estado HTTP es exitoso (200-299).
    // Si el servidor responde con un fallo (404, 500, etc.), 'response.ok' es falso.
    if (!respuesta.ok) {
      // Forzamos ('throw') una excepción de tipo Error nosotros mismos, 
      // ya que 'fetch' no considera un error por sí solo si el servidor contesta con un 404/500.
      // Esto interrumpe el 'try' y salta de inmediato al bloque 'catch'.
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    // Traduce el flujo de texto plano JSON que devolvió el servidor a un objeto/array real de JavaScript.
    // El 'await' espera a que este procesado de datos termine por completo.
    const data = await respuesta.json();

    // 'data.meals' es la propiedad que viene directamente del servidor (TheMealDB) con las recetas.
    // El operador '|| []' (cortocircuito) actúa como escudo protector: si 'data.meals' es null 
    // (porque no se encontraron platos), devuelve un array vacío [] en su lugar para evitar que la app colapse.
    return data.meals || [];

  } catch (error) {
    // El 'catch' intercepta el objeto de error generado (tanto si lo lanzamos con 'throw' como si fue un fallo nativo).
    // 'console.error' imprime el detalle técnico en color rojo en la consola del navegador (F12) solo para el programador.
    console.error('Error al obtener recetas:', error);
    
    // Volvemos a lanzar ('throw error') el error hacia arriba para que el archivo principal (main.js)
    // se entere de la falla y pueda mostrar un mensaje visual amigable en pantalla para el usuario.
    throw error;
  }
}