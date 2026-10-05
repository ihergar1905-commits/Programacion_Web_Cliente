// Referencias a las zonas del HTML
const recipesContainer = document.getElementById('recipes-container');
const statusContainer = document.getElementById('status-message');
const summaryContainer = document.getElementById('summary');

/**
 * Muestra un mensaje de estado en la interfaz.
 * @param {string} message - Texto del mensaje (vacío para limpiar).
 * @param {string} type - Tipo: 'info', 'error', 'loading'.
 */
export function renderStatus(message, type = 'info') {
  if (!statusContainer) return;
  statusContainer.innerHTML = message ? `<p class="status-${type}">${message}</p>` : '';
}

/**
 * Muestra el resumen de recetas por categoría.
 * @param {Object} totals - Objeto { categoría: cantidad }.
 */
export function renderSummary(totals = {}) {
  if (!summaryContainer) return;

  const texto = Object.entries(totals)
    .map(([categoria, cantidad]) => `${categoria} (${cantidad})`)
    .join(' · ');

  summaryContainer.textContent = texto ? `Categorías: ${texto}` : '';
}

/**
 * Genera la tarjeta HTML para una receta individual.
 * @param {Object} recipe - Receta limpia.
 * @returns {string} - String de HTML.
 */
function createRecipeCard(recipe) {
  const imagen = recipe.image
    ? `<img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" loading="lazy" />`
    : '';

  return `
    <article class="recipe-card" data-id="${recipe.id}">
      ${imagen}
      <div class="recipe-info">
        <h3>${recipe.title}</h3>
        <span class="badge">${recipe.category} | ${recipe.area}</span>
        <p class="ingredients">🥕 ${recipe.ingredientes.length} ingredientes</p>
        <p class="instructions">${recipe.instructions.substring(0, 100)}...</p>
      </div>
    </article>
  `;
}

/**
 * Pinta la lista de recetas en el DOM (si la lista está vacía, limpia la parrilla).
 * @param {Array} recipes - Recetas formateadas.
 */
export function renderRecipes(recipes = []) {
  if (!recipesContainer) return;
  recipesContainer.innerHTML = recipes.map(createRecipeCard).join('');
}