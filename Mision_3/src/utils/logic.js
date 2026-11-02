// Lógica pura: recibe datos y devuelve datos nuevos. Ni React, ni DOM, ni fetch.
// Nada de aquí modifica lo que recibe (inmutabilidad).

/**
 * Transforma una receta cruda de TheMealDB en un objeto limpio.
 * @param {Object} rawMeal - Objeto crudo devuelto por la API.
 * @returns {Object|null} - Receta formateada, o null si no hay datos.
 */
export function formatRecipeData(rawMeal) {
  if (!rawMeal) return null; // si no llega receta, devuelve null

  // La API trae strIngredient1..20 y strMeasure1..20.
  // Creamos 20 posiciones, las convertimos en objetos y quitamos las vacías.
  // El id es su posición en la API (1..20): es estable y sirve como key.
  const ingredientes = Array.from({ length: 20 }, (_, i) => ({ // crea una lista de 20 ingredientes
    id: i + 1, // número del ingrediente (1..20)
    name: (rawMeal[`strIngredient${i + 1}`] || '').trim(), // nombre (o '' si no hay)
    measure: (rawMeal[`strMeasure${i + 1}`] || '').trim(), // cantidad (o '' si no hay)
  })).filter((ingrediente) => ingrediente.name !== ''); // quita los huecos vacíos

  return { // devuelve la receta limpia, con nombres claros
    id: rawMeal.idMeal, // identificador único de la receta
    title: rawMeal.strMeal || 'Receta sin nombre', // nombre del plato
    category: rawMeal.strCategory || 'Sin categoría', // categoría (Chicken, Beef...)
    area: rawMeal.strArea || 'Internacional', // país (Italian, Indian...)
    instructions: rawMeal.strInstructions || 'No hay instrucciones disponibles.', // pasos de la receta
    image: rawMeal.strMealThumb || '', // foto del plato
    youtube: rawMeal.strYoutube || null, // enlace al vídeo (o null)
    ingredientes, // la lista de ingredientes de arriba
  };
}

/**
 * Recibe un array de recetas crudas y devuelve un array de recetas limpias.
 * @param {Array} rawMeals - Recetas procedentes de la API.
 * @returns {Array} - Recetas limpias (vacío si lo recibido no es un array).
 */
export function processRecipesList(rawMeals) {
  if (!Array.isArray(rawMeals)) return []; // si no es una lista (ej: null mientras carga) → lista vacía
  return rawMeals.map(formatRecipeData).filter(Boolean); // limpia cada receta y quita las que hayan salido null
}

/**
 * Cuenta cuántas recetas hay de cada categoría, sin mutar el acumulador.
 * Ejemplo: { Chicken: 5, Pasta: 2 }
 */
export function countByCategory(recipes) {
  return recipes.reduce( // recorre las recetas acumulando un resultado
    (totals, recipe) => ({ // totals = lo contado hasta ahora; recipe = la receta actual
      ...totals, // copia lo que ya había contado (objeto nuevo, sin modificar el viejo)
      [recipe.category]: (totals[recipe.category] ?? 0) + 1, // suma 1 a la categoría de esta receta
    }),
    {} // empieza con un objeto vacío
  );
}

/**
 * Devuelve solo las recetas de una categoría ('all' = todas).
 */
export function filterByCategory(recipes, category) {
  if (category === 'all') return recipes; // "Todas": no filtra nada
  return recipes.filter((recipe) => recipe.category === category); // se queda solo con las de esa categoría
}

// Formas de ordenar. Cada una es una función de comparación para toSorted.
const COMPARADORES = {
  az: (a, b) => a.title.localeCompare(b.title), // por nombre, de la A a la Z
  za: (a, b) => b.title.localeCompare(a.title), // por nombre, de la Z a la A
  ingredientes: (a, b) => a.ingredientes.length - b.ingredientes.length, // de menos a más ingredientes
};

/**
 * Ordena las recetas SIN modificar el array original (toSorted, no sort).
 * 'default' deja el orden en que llegan de la API.
 */
export function sortRecipes(recipes, sortBy) {
  const comparar = COMPARADORES[sortBy]; // busca la forma de ordenar elegida
  return comparar ? recipes.toSorted(comparar) : recipes; // si existe, devuelve una lista nueva ordenada; si no ('default'), la deja igual
}

/**
 * Recorta un texto y añade "..." solo si de verdad era más largo.
 */
export function shortenText(text, max = 100) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}...` : text; // si pasa de 100 letras, corta y pone "..."; si no, lo deja entero
}

/**
 * Convierte un enlace de YouTube (watch?v=ID) en el enlace para incrustarlo.
 * Devuelve null si el enlace no es válido.
 */
export function getYoutubeEmbedUrl(url) {
  if (!url) return null; // la receta no tiene vídeo
  try {
    const videoId = new URL(url).searchParams.get('v'); // saca el código del vídeo (lo que va después de "v=")
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null; // monta el enlace para meter el vídeo en la página
  } catch {
    return null; // el enlace no era válido
  }
}
