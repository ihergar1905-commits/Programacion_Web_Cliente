import { shortenText } from '../utils/logic.js';

// Una tarjeta de receta. No guarda estado: todo le llega por props.
// JSX escapa el texto solo, así que aquí no hay riesgo de XSS como con innerHTML.
function RecipeCard({ recipe, isFavorite, onOpen, onToggleFavorite }) {
  return (
    // group: permite que los hijos reaccionen al hover de la tarjeta entera (group-hover:)
    // flex-col: imagen arriba, texto en medio y botón SIEMPRE abajo (mt-auto)
    <article className="group flex flex-col overflow-hidden rounded-tarjeta border-2 border-carbon-900 bg-white shadow-tarjeta transition hover:-translate-y-1 motion-safe:animate-entrada dark:border-crema-200/20 dark:bg-carbon-900">
      {/* Cabecera en grid de una celda: imagen y botón de favorito se apilan en la misma celda, sin position:absolute */}
      <div className="grid overflow-hidden">
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="col-start-1 row-start-1 aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <button
          type="button"
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          onClick={() => onToggleFavorite(recipe)}
          className="col-start-1 row-start-1 m-3 grid size-11 place-self-start justify-self-end place-items-center rounded-full border-2 border-carbon-900 bg-crema-50 text-xl transition hover:scale-110 focus-visible:outline-3 focus-visible:outline-tomate-500"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl leading-snug font-bold">{recipe.title}</h3>
        <span className="w-fit rounded-boton bg-azafran-200 px-3 py-0.5 text-xs font-semibold text-carbon-900">
          {recipe.category} | {recipe.area}
        </span>
        <p className="text-sm font-medium text-oliva-700 dark:text-oliva-300">🥕 {recipe.ingredientes.length} ingredientes</p>
        <p className="text-sm text-carbon-600 dark:text-crema-200/75">{shortenText(recipe.instructions, 100)}</p>
        <button
          type="button"
          onClick={() => onOpen(recipe.id)}
          className="mt-auto rounded-boton border-2 border-carbon-900 py-2 font-semibold transition hover:bg-carbon-900 hover:text-crema-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tomate-500 dark:border-crema-200/60 dark:hover:bg-crema-100 dark:hover:text-carbon-900"
        >
          Ver receta
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;
