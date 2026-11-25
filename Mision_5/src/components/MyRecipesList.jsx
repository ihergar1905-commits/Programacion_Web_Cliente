import { useMyRecipes } from '../hooks/useMyRecipes.js'; // nuestro hook de LEER (useQuery)

const AVISO = 'rounded-tarjeta border-2 border-dashed border-carbon-900/20 p-6 text-center dark:border-crema-200/20';

function MyRecipesList() {
  const { data, isPending, isFetching, isError, error, refetch } = useMyRecipes();

  // 1) Primera carga: aún no hay datos
  if (isPending) {
    return <p className={`${AVISO} animate-pulse`} role="status">⏳ Cargando tus recetas…</p>;
  }

  // 2) Falló (después de los 3 reintentos automáticos)
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-tarjeta border-2 border-tomate-600 bg-tomate-300/15 p-6 text-center" role="alert">
        <p className="font-semibold text-tomate-700 dark:text-tomate-300">❌ {error.message}</p>
        <p className="text-sm">
          ¿Has arrancado el servidor con{' '}
          <code className="rounded bg-carbon-900 px-1.5 py-0.5 text-crema-50">npm run api</code>?
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-boton border-2 border-carbon-900 bg-crema-50 px-4 py-1.5 font-semibold text-carbon-900 transition hover:bg-azafran-300"
        >
          🔄 Reintentar
        </button>
      </div>
    );
  }

  // 3) Hay datos: sacamos las dos cosas que devolvió getMyRecipes
  const { recetas, corruptas } = data;

  return (
    <section className="flex flex-col gap-4" aria-labelledby="mis-recetas-title">
      <h2 id="mis-recetas-title" className="font-display text-2xl font-bold">
        📋 Mis recetas ({recetas.length})
        {isFetching && <small className="ml-2 font-sans text-sm font-normal text-carbon-500"> · actualizando…</small>}
      </h2>

      {/* ★ BONUS M4: aviso visible si Zod apartó alguna receta corrupta */}
      {corruptas > 0 && (
        <p className="rounded-xl bg-azafran-200 px-4 py-2 text-sm font-medium text-carbon-900" role="status">
          ⚠️ {corruptas} receta(s) corrupta(s) ignorada(s). Mira la consola (F12).
        </p>
      )}

      {recetas.length === 0 ? (
        <p className={AVISO}>Todavía no has guardado ninguna receta.</p>
      ) : (
        // Grid: 1 columna en móvil y 2 desde tablet
        <ul className="grid gap-4 md:grid-cols-2">
          {recetas.map((receta) => (
            <li
              key={receta.id}
              className="flex flex-col gap-2 rounded-2xl border-2 border-carbon-900 bg-white p-4 motion-safe:animate-entrada dark:border-crema-200/20 dark:bg-carbon-900"
            >
              <h3 className="font-display text-lg font-bold first-letter:uppercase">
                {receta.nombre} {receta.vegana && <span title="Vegana">🌱</span>}
              </h3>
              <p className="text-sm font-medium text-oliva-700 dark:text-oliva-300">
                {receta.categoria} · ⏱️ {receta.minutos} min · {receta.dificultad}
              </p>
              <p className="text-sm text-carbon-600 dark:text-crema-200/75">{receta.ingredientes}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MyRecipesList;
