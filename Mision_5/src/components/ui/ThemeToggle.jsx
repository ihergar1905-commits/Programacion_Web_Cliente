import { useTheme } from '../../hooks/useTheme.js';

// Botón sol/luna para cambiar entre modo claro y oscuro
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="grid size-10 place-items-center rounded-boton border-2 border-carbon-900 bg-crema-50 text-lg transition hover:-translate-y-0.5 hover:bg-azafran-300 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tomate-500 dark:border-crema-200 dark:bg-carbon-800 dark:hover:bg-carbon-700"
    >
      <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
}

export default ThemeToggle;
