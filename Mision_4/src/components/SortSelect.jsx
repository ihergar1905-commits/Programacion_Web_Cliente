// Desplegable para elegir el orden. Es un input controlado:
// el valor viene del padre (value) y los cambios se le avisan (onChange).
function SortSelect({ value, onChange }) {
  return (
    <label className="sort-select">
      Ordenar:
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="default">Por defecto</option>
        <option value="az">Nombre (A-Z)</option>
        <option value="za">Nombre (Z-A)</option>
        <option value="ingredientes">Menos ingredientes primero</option>
      </select>
    </label>
  );
}

export default SortSelect;
