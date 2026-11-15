import { useEffect, useState } from 'react'; // useState (recordar el dato) y useEffect (guardarlo en el navegador)

// Lee un valor de localStorage. Si no existe, está corrupto o no tiene el
// mismo tipo que el valor inicial (por ejemplo, esperamos un array y hay
// otra cosa), devuelve el valor inicial.
function readStorage(key, initialValue) {
  try {
    const saved = localStorage.getItem(key); // busca en el navegador lo guardado con ese nombre (es texto)
    if (saved === null) return initialValue; // no había nada guardado → valor inicial
    const parsed = JSON.parse(saved); // convierte el texto otra vez en datos
    if (Array.isArray(initialValue) && !Array.isArray(parsed)) return initialValue; // esperábamos una lista y no lo es → valor inicial
    return parsed; // todo bien → devuelve lo guardado
  } catch {
    return initialValue; // texto corrupto o localStorage no disponible → valor inicial
  }
}

/**
 * ★ BONUS · Custom hook reutilizable: como useState, pero el valor se
 * guarda en localStorage y sobrevive a recargar la página.
 *
 * Ejemplo: const [favoritos, setFavoritos] = useLocalStorage('favoritos', []);
 */
export function useLocalStorage(key, initialValue) { // key = nombre con el que se guarda; initialValue = valor si no hay nada
  // La función dentro de useState solo se ejecuta en el primer render.
  const [value, setValue] = useState(() => readStorage(key, initialValue)); // empieza con lo guardado en el navegador

  // Sincronizamos con un sistema externo (localStorage): esto sí es un efecto.
  useEffect(() => { // cada vez que cambie el valor (o el nombre)...
    try {
      localStorage.setItem(key, JSON.stringify(value)); // ...lo guarda en el navegador como texto
    } catch {
      // almacenamiento lleno o no disponible: la app sigue funcionando en memoria
    }
  }, [key, value]); // dependencias: se repite cuando cambia el valor o el nombre

  return [value, setValue]; // devuelve lo mismo que useState: el valor y la función para cambiarlo
}
