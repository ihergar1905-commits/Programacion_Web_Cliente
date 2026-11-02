// Muestra un único mensaje según la situación: cargando, error o sin resultados.
// Si todo va bien, no pinta nada (return null).
function StatusMessage({ loading, error, isEmpty, emptyText }) {
  if (loading) {
    return <p className="status status-loading">⏳ Cargando deliciosas recetas...</p>;
  }

  if (error) {
    return (
      <p className="status status-error" role="alert">
        ❌ Ocurrió un error al cargar las recetas. Inténtalo de nuevo.
      </p>
    );
  }

  if (isEmpty) {
    return <p className="status status-info">{emptyText}</p>;
  }

  return null;
}

export default StatusMessage;
