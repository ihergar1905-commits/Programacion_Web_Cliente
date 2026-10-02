import { fetchRecipes } from './api.js';
import { processRecipesList } from './logic.js';
import { renderRecipes, renderStatus } from './render.js';
import './style.css';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

/**
 * Función principal que maneja el flujo de búsqueda de recetas.
 * @param {string} query - Término a buscar.
 */
async function handleSearch(query) {
  try {
    renderStatus('⏳ Cargando deliciosas recetas...', 'loading');
    renderRecipes([]); // Limpiamos resultados previos

    // 1. Pedir datos crudos a la API
    const rawData = await fetchRecipes(query);

    // 2. Procesar y limpiar los datos con la lógica
    const cleanRecipes = processRecipesList(rawData);

    // 3. Pintar en pantalla con el módulo de renderizado
    renderRecipes(cleanRecipes);

  } catch (error) {
    console.error('Error durante la búsqueda:', error);
    renderStatus('❌ Ocurrió un error al cargar las recetas. Inténtalo de nuevo.', 'error');
  }
}

// Escuchar el evento de envío del formulario de búsqueda
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que la página se recargue
    const query = searchInput.value.trim();
    
    if (query) {
      handleSearch(query);
    }
  });
}

// Carga inicial por defecto
handleSearch('chicken');