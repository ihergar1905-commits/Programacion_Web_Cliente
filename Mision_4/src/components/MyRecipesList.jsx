import { useMyRecipes } from '../hooks/useMyRecipes.js'; // nuestro hook de LEER (useQuery)

function MyRecipesList() {
  const { data, isPending, isFetching, isError, error, refetch } = useMyRecipes();

  // 1) Primera carga: aún no hay datos
  if (isPending) {
    return <p className="status">⏳ Cargando tus recetas…</p>;
  }

  // 2) Falló (después de los 3 reintentos automáticos)
  if (isError) {
    return (
      <div className="status status-error" role="alert">
        <p>❌ {error.message}</p> {/* el mensaje del throw de getMyRecipes */}
        <p>¿Has arrancado el servidor con <code>npm run api</code>?</p>
        <button type="button" onClick={() => refetch()}>🔄 Reintentar</button> {/* vuelve a pedir la lista */}
      </div>
    );
  }

  // 3) Hay datos: sacamos las dos cosas que devolvió getMyRecipes
  const { recetas, corruptas } = data;

  return (
    <section className="my-recipes">
      <h2>
        📋 Mis recetas ({recetas.length})
        {isFetching && <small> · actualizando…</small>} {/* se ve mientras vuelve a pedir la lista (paso 7) */}
      </h2>

      {/* ★ BONUS: aviso visible si Zod apartó alguna receta corrupta */}
      {corruptas > 0 && (
        <p className="warning" role="status">⚠️ {corruptas} receta(s) corrupta(s) ignorada(s). Mira la consola (F12).</p>
      )}

      {recetas.length === 0 ? ( // ¿lista vacía?
        <p className="status">Todavía no has guardado ninguna receta.</p>
      ) : (
        <ul className="my-recipes-list">
          {recetas.map((receta) => (
            <li key={receta.id} className="my-recipe"> {/* key = id del servidor (estable y único) */}
              <h3>{receta.nombre} {receta.vegana && '🌱'}</h3> {/* 🌱 solo si es vegana */}
              <p className="my-recipe-meta">
                {receta.categoria} · ⏱️ {receta.minutos} min · {receta.dificultad}
              </p>
              <p className="my-recipe-ingredients">{receta.ingredientes}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MyRecipesList;
