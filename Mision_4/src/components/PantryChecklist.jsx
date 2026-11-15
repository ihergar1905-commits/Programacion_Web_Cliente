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
    <section className="pantry">
      <h3>🧺 Modo despensa</h3>
      <p className={faltan === 0 ? 'pantry-ok' : 'pantry-missing'}>
        {faltan === 0
          ? '¡Lo tienes todo, a cocinar!'
          : `Marca lo que tienes en casa · te faltan ${faltan} de ${ingredientes.length}`}
      </p>

      <ul className="pantry-list">
        {ingredientes.map((ingrediente) => (
          <li key={ingrediente.id}>
            <label>
              <input
                type="checkbox"
                checked={tengo.includes(ingrediente.id)}
                onChange={() => toggle(ingrediente.id)}
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
