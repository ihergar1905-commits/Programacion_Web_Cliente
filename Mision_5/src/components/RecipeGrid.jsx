import RecipeCard from './RecipeCard.jsx';

// Parrilla de tarjetas. La key es el id de la receta (estable), nunca el índice.
// Grid (dos dimensiones): 1 columna en móvil, 2 en tablet, 3 en escritorio
function RecipeGrid({ recipes, favoriteIds, onOpen, onToggleFavorite }) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Recetas">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favoriteIds.includes(recipe.id)}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}

export default RecipeGrid;
