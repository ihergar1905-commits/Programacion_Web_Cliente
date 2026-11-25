import { useEffect, useState } from 'react'; // herramientas de React: useState (recordar datos) y useEffect (hacer cosas fuera de React)

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
export function useFetch(fetcher, param) { // fetcher = función que pide los datos; param = qué pedir (ej: 'pasta')
  // Guardamos el resultado junto con el parámetro al que pertenece.
  const [result, setResult] = useState({ param: undefined, data: null, error: null }); // al principio no hay nada

  useEffect(() => { // se ejecuta después de pintar, y otra vez cada vez que cambie fetcher o param
    const controller = new AbortController(); // el "mando" para poder cancelar esta petición

    fetcher(param, controller.signal) // pide los datos y le pasa la señal de cancelar
      .then((data) => setResult({ param, data, error: null })) // si llegan bien → guarda los datos (con su param)
      .catch((error) => { // si algo falla...
        if (error.name === 'AbortError') return; // la cancelamos nosotros: no es un error
        setResult({ param, data: null, error }); // error de verdad → lo guarda para mostrar el mensaje rojo
      });

    // Cleanup: si cambia el parámetro (o se desmonta), cancelamos la petición en curso.
    return () => controller.abort(); // React ejecuta esto antes de la siguiente petición: cancela la anterior
  }, [fetcher, param]); // dependencias: el efecto se repite solo cuando cambia alguna de estas dos

  // "Cargando" no es un estado aparte: se deriva. Si el resultado guardado
  // no es del parámetro actual, es que la respuesta todavía no ha llegado.
  const loading = result.param !== param; // ej: se busca 'pasta' pero lo guardado es de 'chicken' → cargando

  return { // lo que recibe App
    data: loading ? null : result.data, // los datos (null mientras carga)
    error: loading ? null : result.error, // el error si lo hubo (null mientras carga)
    loading, // true mientras se espera la respuesta
  };
}
