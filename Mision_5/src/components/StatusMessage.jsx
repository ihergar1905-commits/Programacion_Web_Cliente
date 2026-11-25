// Muestra un único mensaje según la situación: cargando, error o sin resultados.
// Si todo va bien, no pinta nada (return null).
const CAJA = 'rounded-tarjeta border-2 border-dashed p-8 text-center text-lg';

function StatusMessage({ loading, error, isEmpty, emptyText }) {
  if (loading) {
    return (
      <p className={`${CAJA} animate-pulse border-carbon-900/20 dark:border-crema-200/20`} role="status">
        ⏳ Cargando deliciosas recetas...
      </p>
    );
  }

  if (error) {
    return (
      <p className={`${CAJA} border-tomate-600 bg-tomate-300/15 text-tomate-700 dark:text-tomate-300`} role="alert">
        ❌ Ocurrió un error al cargar las recetas. Inténtalo de nuevo.
      </p>
    );
  }

  if (isEmpty) {
    return <p className={`${CAJA} border-carbon-900/20 dark:border-crema-200/20`}>{emptyText}</p>;
  }

  return null;
}

export default StatusMessage;
