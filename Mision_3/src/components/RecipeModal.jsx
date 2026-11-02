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
    // Clic fuera de la ventana = cerrar. Dentro, paramos la propagación.
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="close-button" aria-label="Cerrar" onClick={onClose}>
          ✕
        </button>

        <header className="modal-header">
          {recipe.image && <img src={recipe.image} alt={recipe.title} />}
          <div>
            <h2 id="modal-title">{recipe.title}</h2>
            <span className="badge">
              {recipe.category} | {recipe.area}
            </span>
            <button type="button" className="fav-inline" onClick={() => onToggleFavorite(recipe)}>
              {isFavorite ? '❤️ En favoritos' : '🤍 Añadir a favoritos'}
            </button>
          </div>
        </header>

        <PantryChecklist ingredientes={recipe.ingredientes} />

        <section>
          <h3>👩‍🍳 Preparación</h3>
          <p className="full-instructions">{recipe.instructions}</p>
        </section>

        {videoUrl && (
          <section>
            <h3>▶️ Vídeo</h3>
            <div className="video-wrapper">
              <iframe
                src={videoUrl}
                title={`Vídeo de ${recipe.title}`}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default RecipeModal;
