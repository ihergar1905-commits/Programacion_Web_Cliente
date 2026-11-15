import { apiRecipeSchema } from '../schema/recipeSchema.js'; // el reglamento del servidor

const API_URL = 'http://localhost:3001/recipes'; // la dirección de tu json-server

// GET: pide todas las recetas y devuelve las buenas + cuántas venían corruptas
export async function getMyRecipes() {
  const response = await fetch(API_URL); // llamamos al servidor (sin method = GET)
  if (!response.ok) { // si responde con error (404, 500...)
    throw new Error(`El servidor respondió con error ${response.status}`); // lanzamos el error → TanStack lo verá
  }
  const datos = await response.json(); // pasamos la respuesta de texto JSON a objetos de JS
  if (!Array.isArray(datos)) { // si no es una lista, algo va muy mal
    throw new Error('El servidor no devolvió una lista de recetas');
  }

  // BONUS: revisamos cada receta con Zod
  const resultados = datos.map((item) => apiRecipeSchema.safeParse(item)); // un "informe" por receta
  const recetas = resultados.filter((r) => r.success).map((r) => r.data); // nos quedamos con las válidas
  const corruptas = resultados.length - recetas.length; // las que no pasaron
  if (corruptas > 0) {
    console.warn(`${corruptas} receta(s) corrupta(s) ignorada(s)`, resultados.filter((r) => !r.success)); // aviso en consola
  }
  return { recetas, corruptas }; // devolvemos las dos cosas
}

// POST: guarda una receta nueva y devuelve la receta creada (con su id)
export async function createRecipe(nuevaReceta) {
  const response = await fetch(API_URL, {
    method: 'POST', // POST = "guarda esto"
    headers: { 'Content-Type': 'application/json' }, // avisamos de que mandamos JSON
    body: JSON.stringify(nuevaReceta), // la receta convertida a texto JSON
  });
  if (!response.ok) { // si el servidor responde con error...
    throw new Error(`No se pudo guardar la receta (error ${response.status})`); // ...lanzamos error → useMutation lo verá
  }
  const creada = await response.json(); // la receta guardada, ahora con id
  return apiRecipeSchema.parse(creada); // la revisa Zod: si está mal, lanza error
}