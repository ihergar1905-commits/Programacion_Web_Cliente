// Chips de categorías: sirven a la vez de resumen (cuántas hay de cada una)
// y de filtro (al pulsar una, solo se ven las de esa categoría).
function CategoryFilter({ totals, total, selected, onSelect }) {
  const categorias = Object.entries(totals);

  if (categorias.length === 0) return null;

  return (
    <div className="category-filter" aria-label="Filtrar por categoría">
      <button
        type="button"
        className="chip"
        aria-pressed={selected === 'all'}
        onClick={() => onSelect('all')}
      >
        Todas ({total})
      </button>

      {categorias.map(([categoria, cantidad]) => (
        <button
          key={categoria}
          type="button"
          className="chip"
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
