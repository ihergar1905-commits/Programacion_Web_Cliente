import { useEffect } from 'react';
import PantryChecklist from './PantryChecklist.jsx';
import { getYoutubeEmbedUrl } from '../utils/logic.js';

// Ventana de detalle: ingredientes con medidas, instrucciones completas y vídeo.
function RecipeModal({ recipe, isFavorite, onClose, onToggleFavorite }) {
  // Efecto justificado: escuchar la tecla Escape es suscribirse a algo
  // externo a React (el document). El cleanup quita el listener al cerrar.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const videoUrl = getYoutubeEmbedUrl(recipe.youtube);

  return (
    // Capa de fondo: fixed + inset-0 cubre toda la pantalla (es lo propio de un modal, no un "hack").
    // grid + place-items-center centra la ventana. Clic fuera = cerrar.
    <div className="fixed inset-0 z-50 grid place-items-center bg-carbon-950/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[90dvh] w-full max-w-3xl flex-col gap-6 overflow-y-auto rounded-tarjeta border-2 border-carbon-900 bg-crema-50 p-5 shadow-sello motion-safe:animate-entrada md:p-8 dark:border-crema-200/30 dark:bg-carbon-900 dark:shadow-none"
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="grid size-10 shrink-0 place-items-center self-end rounded-full border-2 border-carbon-900 text-lg font-bold transition hover:bg-tomate-600 hover:text-white dark:border-crema-200/60"
        >
          ✕
        </button>

        {/* Columna en móvil; desde tablet, foto a la izquierda y datos a la derecha */}
        <header className="grid gap-5 md:grid-cols-[14rem_1fr] md:items-center">
          {recipe.image && (
            <img src={recipe.image} alt={recipe.title} className="aspect-square w-full rounded-2xl border-2 border-carbon-900 object-cover" />
          )}
          <div className="flex flex-col items-start gap-3">
            <h2 id="modal-title" className="font-display text-3xl leading-tight font-black">
              {recipe.title}
            </h2>
            <span className="rounded-boton bg-azafran-200 px-3 py-0.5 text-sm font-semibold text-carbon-900">
              {recipe.category} | {recipe.area}
            </span>
            <button
              type="button"
              onClick={() => onToggleFavorite(recipe)}
              className="rounded-boton border-2 border-carbon-900 px-4 py-1.5 font-semibold transition hover:bg-crema-200 dark:border-crema-200/60 dark:hover:bg-carbon-800"
            >
              {isFavorite ? '❤️ En favoritos' : '🤍 Añadir a favoritos'}
            </button>
          </div>
        </header>

        <PantryChecklist ingredientes={recipe.ingredientes} />

        <section>
          <h3 className="mb-2 font-display text-xl font-bold">👩‍🍳 Preparación</h3>
          <p className="leading-relaxed whitespace-pre-line text-carbon-700 dark:text-crema-200/85">{recipe.instructions}</p>
        </section>

        {videoUrl && (
          <section>
            <h3 className="mb-2 font-display text-xl font-bold">▶️ Vídeo</h3>
            <iframe
              src={videoUrl}
              title={`Vídeo de ${recipe.title}`}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full rounded-2xl border-2 border-carbon-900"
            />
          </section>
        )}
      </div>
    </div>
  );
}

export default RecipeModal;
