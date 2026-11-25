// Chips de categorías: sirven a la vez de resumen (cuántas hay de cada una)
// y de filtro (al pulsar una, solo se ven las de esa categoría).
const CHIP =
  'rounded-boton border border-carbon-900/30 bg-white px-3 py-1 text-sm font-medium transition hover:border-carbon-900 aria-pressed:border-tomate-600 aria-pressed:bg-tomate-600 aria-pressed:text-white dark:border-crema-200/25 dark:bg-carbon-800 dark:hover:border-crema-200';

function CategoryFilter({ totals, total, selected, onSelect }) {
  const categorias = Object.entries(totals);

  if (categorias.length === 0) return null;

  return (
    // flex-wrap: los chips van en fila y saltan de línea solos cuando no caben
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      <button type="button" className={CHIP} aria-pressed={selected === 'all'} onClick={() => onSelect('all')}>
        Todas ({total})
      </button>

      {categorias.map(([categoria, cantidad]) => (
        <button
          key={categoria}
          type="button"
          className={CHIP}
          aria-pressed={selected === categoria}
          onClick={() => onSelect(categoria)}
        >
          {categoria} ({cantidad})
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
