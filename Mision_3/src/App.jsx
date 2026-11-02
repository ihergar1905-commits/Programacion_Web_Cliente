import { useCallback, useState } from 'react';
import { fetchRecipes } from './services/api.js';
import {
  processRecipesList,
  countByCategory,
  filterByCategory,
  sortRecipes,
} from './utils/logic.js';
import { useFetch } from './hooks/useFetch.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import SearchForm from './components/SearchForm.jsx';
import StatusMessage from './components/StatusMessage.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import SortSelect from './components/SortSelect.jsx';
import RecipeGrid from './components/RecipeGrid.jsx';
import RecipeModal from './components/RecipeModal.jsx';

const BUSQUEDA_INICIAL = 'chicken';

function App() {
  // ── Estado mínimo ──────────────────────────────────────────────
  const [query, setQuery] = useState(BUSQUEDA_INICIAL); // última búsqueda enviada
  const [category, setCategory] = useState('all'); // chip seleccionado
  const [sortBy, setSortBy] = useState('default'); // orden elegido
  const [view, setView] = useState('search'); // 'search' | 'favorites'
  const [selectedId, setSelectedId] = useState(null); // receta abierta en el modal (solo el id)
  const [favorites, setFavorites] = useLocalStorage('culinary:favorites', []); // recetas guardadas

  // ── Datos de la API (el hook se encarga del efecto y del AbortController) ──
  const { data, error, loading } = useFetch(fetchRecipes, query);
 
  // ── Valores derivados: se calculan en cada render, no se guardan ──
  // Recetas de la API ya limpias (si todavía no ha llegado nada, una lista vacía)
  const searchResults = processRecipesList(data);
  // De qué lista salen las recetas: de los favoritos o de la búsqueda, según la pestaña
  const source = view === 'favorites' ? favorites : searchResults;
  // Cuántas recetas hay de cada categoría, ej: { Chicken: 2, Beef: 1 } (para los chips)
  const totals = countByCategory(source);
  // Las recetas que se ven: primero se filtran por categoría y luego se ordenan
  const visibleRecipes = sortRecipes(filterByCategory(source, category), sortBy);
  // Solo los ids de los favoritos, para saber rápido qué corazones pintar ❤️/🤍
  const favoriteIds = favorites.map((recipe) => recipe.id);
  // La receta abierta en la ventana, buscada por su id (null = no hay ninguna abierta).
  // Si la receta deja de estar en la lista, no se encuentra y la ventana se cierra sola.
  const selectedRecipe = source.find((recipe) => recipe.id === selectedId) ?? null;

  // En la vista de favoritos no se espera a la API: nunca "carga" ni falla.
  // true si estamos en la pestaña Resultados
  const isSearchView = view === 'search';
  // Mostrar "Cargando..." solo en Resultados y mientras se espera a la API
  const showLoading = isSearchView && loading;
  // Mostrar el error solo en Resultados (los favoritos no dependen de la API)
  const showError = isSearchView ? error : null;
  // true si no hay ninguna receta que mostrar
  const isEmpty = source.length === 0;
  // Mensaje para cuando la lista está vacía, distinto en cada pestaña
  const emptyText = isSearchView
    ? 'No se encontraron recetas para tu búsqueda.'
    : 'Todavía no tienes favoritos: pulsa 🤍 en una receta para guardarla.';

  // ── Manejadores de eventos: se ejecutan cuando el usuario hace algo ──

  // Al pulsar Buscar (lo llama SearchForm con el texto escrito)
  function handleSearch(term) {
    setQuery(term); // guarda la nueva búsqueda → useFetch pedirá las recetas
    setCategory('all'); // vuelve a "Todas": la categoría anterior puede no existir en la nueva búsqueda
    setView('search'); // si estabas en Favoritos, te lleva a Resultados para ver lo buscado
  }

  // Al pulsar las pestañas "Resultados" o "Favoritos"
  function changeView(newView) {
    setView(newView); // cambia de pestaña ('search' o 'favorites')
    setCategory('all'); // vuelve a "Todas" para no quedarte con un filtro que no existe en la otra pestaña
  }

  // Al pulsar el corazón de una receta: si ya era favorita la quita, si no la añade
  function toggleFavorite(recipe) {
    setFavorites((prev) => // prev = la lista de favoritos actual
      prev.some((fav) => fav.id === recipe.id) // ¿ya está en favoritos?
        ? prev.filter((fav) => fav.id !== recipe.id) // sí → lista nueva sin ella
        : [...prev, recipe] // no → lista nueva con todas las anteriores + esta
    );
  }

  // Al cerrar la ventana de detalle: ya no hay receta abierta (null)
  // useCallback: la misma función en cada render, para que el efecto
  // del modal (que depende de onClose) no se vuelva a ejecutar sin motivo.
  const closeModal = useCallback(() => setSelectedId(null), []);

  return (
    <>
      <header className="app-header">
        <h1>🍳 Culinary Odyssey</h1>
        <SearchForm initialValue={BUSQUEDA_INICIAL} onSearch={handleSearch} />

        <nav className="view-tabs">
          <button
            type="button"
            aria-pressed={isSearchView}
            onClick={() => changeView('search')}
          >
            🔎 Resultados
          </button>
          <button
            type="button"
            aria-pressed={!isSearchView}
            onClick={() => changeView('favorites')}
          >
            ❤️ Favoritos ({favorites.length})
          </button>
        </nav>
      </header>

      <main>
        <StatusMessage
          loading={showLoading}
          error={showError}
          isEmpty={isEmpty}
          emptyText={emptyText}
        />

        {!showLoading && !showError && !isEmpty && (
          <>
            <div className="toolbar">
              <CategoryFilter
                totals={totals}
                total={source.length}
                selected={category}
                onSelect={setCategory}
              />
              <SortSelect value={sortBy} onChange={setSortBy} />
            </div>

            <RecipeGrid
              recipes={visibleRecipes}
              favoriteIds={favoriteIds}
              onOpen={setSelectedId}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>

      {/* key: al abrir otra receta, el modal empieza de cero (despensa vacía) */}
      {selectedRecipe && (
        <RecipeModal
          key={selectedRecipe.id}
          recipe={selectedRecipe}
          isFavorite={favoriteIds.includes(selectedRecipe.id)}
          onClose={closeModal}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </>
  );
}

export default App;
