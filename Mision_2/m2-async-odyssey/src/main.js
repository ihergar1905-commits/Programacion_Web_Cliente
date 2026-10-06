import { fetchRecipes } from './api.js';
import { processRecipesList, countByCategory } from './logic.js';
import { renderRecipes, renderStatus, renderSummary } from './render.js';
import './style.css';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchButton = searchForm.querySelector('button');

/**
 * Maneja el flujo completo de una búsqueda.
 * @param {string} query - Término a buscar.
 */
async function handleSearch(query) {
  try {
    searchButton.disabled = true; // evita lanzar varias peticiones a la vez
    renderStatus('⏳ Carg ando deliciosas recetas...', 'loading');
    renderRecipes([]);
    renderSummary({});

    // 1. Datos crudos de la API (o de la caché)
    const rawData = await fetchRecipes(query);

    // 2. Limpiar y transformar
    const cleanRecipes = processRecipesList(rawData);

    // 3. Pintar según el resultado
    if (cleanRecipes.length === 0) {
      renderStatus('No se encontraron recetas para tu búsqueda.', 'info');
      return;
    }

    renderStatus('');
    renderSummary(countByCategory(cleanRecipes));
    renderRecipes(cleanRecipes);
  } catch (error) {
    console.error('Error durante la búsqueda:', error);
    renderStatus('❌ Ocurrió un error al cargar las recetas. Inténtalo de nuevo.', 'error');
  } finally {
    searchButton.disabled = false; // se ejecuta siempre, haya error o no
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) handleSearch(query);
});

// Carga inicial
handleSearch('chicken');