import RecipeCard from './RecipeCard.jsx';

// Parrilla de tarjetas. La key es el id de la receta (estable), nunca el índice.
function RecipeGrid({ recipes, favoriteIds, onOpen, onToggleFavorite }) {
  return (
    <section className="recipes-grid">
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
