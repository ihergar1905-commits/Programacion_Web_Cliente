import { shortenText } from '../utils/logic.js';

// Una tarjeta de receta. No guarda estado: todo le llega por props.
// JSX escapa el texto solo, así que aquí no hay riesgo de XSS como con innerHTML.
function RecipeCard({ recipe, isFavorite, onOpen, onToggleFavorite }) {
  return (
    <article className="recipe-card">
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="recipe-img" loading="lazy" />
      )}

      <button
        type="button"
        className="fav-button"
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        onClick={() => onToggleFavorite(recipe)}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <span className="badge">
          {recipe.category} | {recipe.area}
        </span>
        <p className="ingredients">🥕 {recipe.ingredientes.length} ingredientes</p>
        <p className="instructions">{shortenText(recipe.instructions, 100)}</p>
        <button type="button" className="open-button" onClick={() => onOpen(recipe.id)}>
          Ver receta
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;
