import { useEffect, useState } from 'react';

/**
 * ★ BONUS · Custom hook reutilizable para pedir datos.
 *
 * Recibe una función que devuelve una promesa (fetcher) y el parámetro que
 * hay que pasarle. Cada vez que cambia el parámetro, vuelve a pedir los datos
 * y CANCELA la petición anterior (así una respuesta vieja nunca pisa a una nueva).
 *
 * Ejemplo: const { data, error, loading } = useFetch(fetchRecipes, 'pasta');
 *
 * @param {(param: any, signal: AbortSignal) => Promise<any>} fetcher
 * @param {any} param
 */
export function useFetch(fetcher, param) {
  // Guardamos el resultado junto con el parámetro al que pertenece.
  const [result, setResult] = useState({ param: undefined, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetcher(param, controller.signal)
      .then((data) => setResult({ param, data, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return; // la cancelamos nosotros: no es un error
        setResult({ param, data: null, error });
      });

    // Cleanup: si cambia el parámetro (o se desmonta), cancelamos la petición en curso.
    return () => controller.abort();
  }, [fetcher, param]);

  // "Cargando" no es un estado aparte: se deriva. Si el resultado guardado
  // no es del parámetro actual, es que la respuesta todavía no ha llegado.
  const loading = result.param !== param;

  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
  };
}
