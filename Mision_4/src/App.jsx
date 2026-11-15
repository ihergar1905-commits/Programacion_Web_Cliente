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
import { useMyRecipes } from './hooks/useMyRecipes.js'; // 🆕 para el contador de la pestaña
import SearchForm from './components/SearchForm.jsx';
import StatusMessage from './components/StatusMessage.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import SortSelect from './components/SortSelect.jsx';
import RecipeGrid from './components/RecipeGrid.jsx';
import RecipeModal from './components/RecipeModal.jsx';
import RecipeForm from './components/RecipeForm.jsx'; // 🆕 el formulario
import MyRecipesList from './components/MyRecipesList.jsx'; // 🆕 la lista del servidor

const BUSQUEDA_INICIAL = 'chicken';

function App() {
  // ── Estado mínimo ──
  const [query, setQuery] = useState(BUSQUEDA_INICIAL);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [view, setView] = useState('search'); // 🆕 ahora puede ser 'search' | 'favorites' | 'mine'
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('culinary:favorites', []);

  // ── Datos de las APIs ──
  const { data, error, loading } = useFetch(fetchRecipes, query); // TheMealDB (M3)
  const misRecetas = useMyRecipes(); // 🆕 json-server (M4): el MISMO cajón que usa MyRecipesList

  // ── Valores derivados ──
  const searchResults = processRecipesList(data);
  const source = view === 'favorites' ? favorites : searchResults;
  const totals = countByCategory(source);
  const visibleRecipes = sortRecipes(filterByCategory(source, category), sortBy);
  const favoriteIds = favorites.map((recipe) => recipe.id);
  const selectedRecipe = source.find((recipe) => recipe.id === selectedId) ?? null;
  const numMisRecetas = misRecetas.isSuccess ? misRecetas.data.recetas.length : 0; // 🆕 0 mientras carga o si falla

  const isSearchView = view === 'search';
  const isMineView = view === 'mine'; // 🆕
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
      prev.some((fav) => fav.id === recipe.id)
        ? prev.filter((fav) => fav.id !== recipe.id)
        : [...prev, recipe]
    );
  }

  const closeModal = useCallback(() => setSelectedId(null), []);

  return (
    <>
      <header className="app-header">
        <h1>🍳 Culinary Odyssey</h1>
        <SearchForm initialValue={BUSQUEDA_INICIAL} onSearch={handleSearch} />

        <nav className="view-tabs">
          <button
            type="button"
            aria-pressed={view === 'search'}
            onClick={() => changeView('search')}
          >
            🔎 Resultados
          </button>
          <button
            type="button"
            aria-pressed={view === 'favorites'}
            onClick={() => changeView('favorites')}
          >
            ❤️ Favoritos ({favorites.length})
          </button>
          {/* 🆕 tercera pestaña */}
          <button
            type="button"
            aria-pressed={isMineView}
            onClick={() => changeView('mine')}
          >
            📝 Mis recetas ({numMisRecetas})
          </button>
        </nav>
      </header>

      <main>
        {/* 🆕 ¿pestaña "Mis recetas"? → formulario + lista. Si no → lo de la M3 */}
        {isMineView ? (
          <div className="my-recipes-view">
            <RecipeForm />
            <MyRecipesList />
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>

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