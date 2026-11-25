import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.js'; // el hook de la M3: recuerda el tema al recargar

// Tema inicial: si el usuario no ha elegido nunca, seguimos la preferencia del sistema
function temaDelSistema() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Hook: devuelve el tema actual ('light' | 'dark') y una función para alternarlo
export function useTheme() {
  const [theme, setTheme] = useLocalStorage('culinary:theme', temaDelSistema());

  // Sincroniza con algo externo a React (la etiqueta <html>): esto sí es un efecto
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark'); // dark: de Tailwind mira esta clase
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return { theme, toggleTheme };
}
