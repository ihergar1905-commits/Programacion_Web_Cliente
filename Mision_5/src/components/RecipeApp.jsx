import { useCallback, useState } from 'react';
import { fetchRecipes } from '../services/api.js';
import { processRecipesList, countByCategory, filterByCategory, sortRecipes } from '../utils/logic.js';
import { useFetch } from '../hooks/useFetch.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useMyRecipes } from '../hooks/useMyRecipes.js';
import SearchForm from './SearchForm.jsx';
import StatusMessage from './StatusMessage.jsx';
import CategoryFilter from './CategoryFilter.jsx';
import SortSelect from './SortSelect.jsx';
import RecipeGrid from './RecipeGrid.jsx';
import RecipeModal from './RecipeModal.jsx';
import RecipeForm from './RecipeForm.jsx';
import MyRecipesList from './MyRecipesList.jsx';

const BUSQUEDA_INICIAL = 'chicken';

// Estilo de las pestañas: aria-pressed:* aplica el aspecto "activa" cuando aria-pressed="true"
const TAB =
  'rounded-boton border-2 border-carbon-900 px-4 py-2 text-sm font-semibold transition hover:bg-crema-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tomate-500 aria-pressed:bg-carbon-900 aria-pressed:text-crema-50 md:text-base dark:border-crema-200/40 dark:hover:bg-carbon-800 dark:aria-pressed:bg-crema-100 dark:aria-pressed:text-carbon-900';

// Es el antiguo App.jsx de la M4: MISMA lógica (estado, hooks, manejadores);
// en la M5 solo cambia el JSX (clases de Tailwind en vez de index.css)
function RecipeApp() {
  // ── Estado mínimo ──
  const [query, setQuery] = useState(BUSQUEDA_INICIAL);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [view, setView] = useState('search'); // 'search' | 'favorites' | 'mine'
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('culinary:favorites', []);

  // ── Datos de las APIs ──
  const { data, error, loading } = useFetch(fetchRecipes, query); // TheMealDB (M3)
  const misRecetas = useMyRecipes(); // json-server (M4)

  // ── Valores derivados ──
  const searchResults = processRecipesList(data);
  const source = view === 'favorites' ? favorites : searchResults;
  const totals = countByCategory(source);
  const visibleRecipes = sortRecipes(filterByCategory(source, category), sortBy);
  const favoriteIds = favorites.map((recipe) => recipe.id);
  const selectedRecipe = source.find((recipe) => recipe.id === selectedId) ?? null;
  const numMisRecetas = misRecetas.isSuccess ? misRecetas.data.recetas.length : 0;

  const isSearchView = view === 'search';
  const isMineView = view === 'mine';
  const showLoading = isSearchView && loading;
  const showError = isSearchView ? error : null;
  const isEmpty = source.length === 0;
  const emptyText = isSearchView
    ? 'No se encontraron recetas para tu búsqueda.'
    : 'Todavía no tienes favoritos: pulsa 🤍 en una receta para guardarla.';

  // ── Manejadores de eventos ──
  function handleSearch(term) {
    setQuery(term);
    setCategory('all');
    setView('search');
  }

  function changeView(newView) {
    setView(newView);
    setCategory('all');
  }

  function toggleFavorite(recipe) {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === recipe.id) ? prev.filter((fav) => fav.id !== recipe.id) : [...prev, recipe]
    );
  }

  const closeModal = useCallback(() => setSelectedId(null), []);

  return (
    <div className="flex flex-col gap-6">
      {/* Cabecera de la app: buscador + pestañas. Columna en móvil, fila desde escritorio */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <SearchForm initialValue={BUSQUEDA_INICIAL} onSearch={handleSearch} />

        <nav aria-label="Vistas de la aplicación" className="flex flex-wrap gap-2">
          <button type="button" className={TAB} aria-pressed={view === 'search'} onClick={() => changeView('search')}>
            🔎 Resultados
          </button>
          <button type="button" className={TAB} aria-pressed={view === 'favorites'} onClick={() => changeView('favorites')}>
            ❤️ Favoritos ({favorites.length})
          </button>
          <button type="button" className={TAB} aria-pressed={isMineView} onClick={() => changeView('mine')}>
            📝 Mis recetas ({numMisRecetas})
          </button>
        </nav>
      </div>

      {isMineView ? (
        // Formulario + lista: una columna en móvil/tablet y dos en escritorio
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <RecipeForm />
          <MyRecipesList />
        </div>
      ) : (
        <>
          <StatusMessage loading={showLoading} error={showError} isEmpty={isEmpty} emptyText={emptyText} />

          {!showLoading && !showError && !isEmpty && (
            <>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CategoryFilter totals={totals} total={source.length} selected={category} onSelect={setCategory} />
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
        </>
      )}

      {selectedRecipe && (
        <RecipeModal
          key={selectedRecipe.id}
          recipe={selectedRecipe}
          isFavorite={favoriteIds.includes(selectedRecipe.id)}
          onClose={closeModal}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default RecipeApp;
