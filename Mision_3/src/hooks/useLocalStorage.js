import { useEffect, useState } from 'react';

// Lee un valor de localStorage. Si no existe, está corrupto o no tiene el
// mismo tipo que el valor inicial (por ejemplo, esperamos un array y hay
// otra cosa), devuelve el valor inicial.
function readStorage(key, initialValue) {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return initialValue;
    const parsed = JSON.parse(saved);
    if (Array.isArray(initialValue) && !Array.isArray(parsed)) return initialValue;
    return parsed;
  } catch {
    return initialValue;
  }
}

/**
 * ★ BONUS · Custom hook reutilizable: como useState, pero el valor se
 * guarda en localStorage y sobrevive a recargar la página.
 *
 * Ejemplo: const [favoritos, setFavoritos] = useLocalStorage('favoritos', []);
 */
export function useLocalStorage(key, initialValue) {
  // La función dentro de useState solo se ejecuta en el primer render.
  const [value, setValue] = useState(() => readStorage(key, initialValue));

  // Sincronizamos con un sistema externo (localStorage): esto sí es un efecto.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // almacenamiento lleno o no disponible: la app sigue funcionando en memoria
    }
  }, [key, value]);

  return [value, setValue];
}
