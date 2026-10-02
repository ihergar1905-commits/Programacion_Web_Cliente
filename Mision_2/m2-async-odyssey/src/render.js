// Referencias a las zonas del HTML
const recipesContainer = document.getElementById('recipes-container');
const statusContainer = document.getElementById('status-message');

/**
 * Muestra un mensaje de estado en la interfaz.
 * @param {string} message - Texto del mensaje.
 * @param {string} type - Tipo: 'info', 'error', 'loading'.
 */
export function renderStatus(message, type = 'info') {
  if (!statusContainer) return;

  if (!message) {
    statusContainer.innerHTML = '';
    return;
  }

  statusContainer.innerHTML = `<p class="status-${type}">${message}</p>`;
}

/**
 * Genera la tarjeta HTML para una receta individual.
 * @param {Object} recipe - Objeto receta limpio.
 * @returns {string} - String de HTML.
 */
function createRecipeCard(recipe) {
  return `
    <article class="recipe-card" data-id="${recipe.id}">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" />
      <div class="recipe-info">
        <h3>${recipe.title}</h3>
        <span class="badge">${recipe.category} | ${recipe.area}</span>
        <p class="instructions">${recipe.instructions.substring(0, 100)}...</p>
      </div>
    </article>
  `;
}

/**
 * Renderiza la lista completa de recetas en el DOM.
 * @param {Array} recipes - Array de recetas formateadas.
 */
export function renderRecipes(recipes = []) {
  if (!recipesContainer) return;

  if (recipes.length === 0) {
    recipesContainer.innerHTML = '';
    renderStatus('No se encontraron recetas para tu búsqueda.', 'info');
    return;
  }

  renderStatus(''); // Limpiamos mensajes anteriores
  recipesContainer.innerHTML = recipes.map(createRecipeCard).join('');
}