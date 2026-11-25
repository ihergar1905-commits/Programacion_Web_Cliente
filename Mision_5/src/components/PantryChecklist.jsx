import { useState } from 'react';

// "Modo despensa": marcas los ingredientes que ya tienes en casa y te dice
// cuántos te faltan. Solo se guarda qué ids están marcados; el resto
// (cuántos faltan, si lo tienes todo) se calcula en cada render.
function PantryChecklist({ ingredientes }) {
  const [tengo, setTengo] = useState([]); // ids de los ingredientes marcados

  const faltan = ingredientes.length - tengo.length;

  function toggle(id) {
    // Inmutable: creamos un array nuevo en vez de hacer push/splice
    setTengo((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <section className="rounded-2xl bg-crema-100 p-5 dark:bg-carbon-800">
      <h3 className="font-display text-xl font-bold">🧺 Modo despensa</h3>
      <p
        className={`mt-1 mb-4 text-sm font-semibold ${faltan === 0 ? 'text-oliva-500 dark:text-oliva-300' : 'text-tomate-600 dark:text-tomate-300'}`}
        role="status"
      >
        {faltan === 0
          ? '¡Lo tienes todo, a cocinar!'
          : `Marca lo que tienes en casa · te faltan ${faltan} de ${ingredientes.length}`}
      </p>

      {/* Grid: 1 columna en móvil, 2 desde tablet */}
      <ul className="grid gap-2 md:grid-cols-2">
        {ingredientes.map((ingrediente) => (
          <li key={ingrediente.id}>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-crema-200 has-checked:line-through has-checked:opacity-60 dark:hover:bg-carbon-700">
              <input
                type="checkbox"
                checked={tengo.includes(ingrediente.id)}
                onChange={() => toggle(ingrediente.id)}
                className="size-5 accent-oliva-500"
              />
              <span>
                <strong>{ingrediente.name}</strong>
                {ingrediente.measure && ` · ${ingrediente.measure}`}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PantryChecklist;
