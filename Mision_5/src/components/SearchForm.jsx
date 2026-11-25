import { useState } from 'react';
import { INPUT } from './ui/styles.js';

// Buscador. El texto que se va escribiendo solo le importa a este componente,
// así que su estado vive aquí. Al enviar, avisa al padre con onSearch.
// No se bloquea mientras carga: si buscas otra cosa, useFetch cancela la anterior.
function SearchForm({ initialValue = '', onSearch }) {
  const [text, setText] = useState(initialValue);

  function handleSubmit(event) {
    event.preventDefault();
    const term = text.trim();
    if (term) onSearch(term);
  }

  return (
    // Flex: input que crece (flex-1) + botón de ancho fijo, en la misma fila
    <form className="flex w-full gap-2 xl:max-w-md" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Busca una receta (ej: chicken, pasta)..."
        aria-label="Buscar receta"
        className={`${INPUT} min-w-0 flex-1`}
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl border-2 border-carbon-900 bg-tomate-600 px-4 font-semibold text-white transition hover:bg-tomate-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tomate-500 dark:border-crema-100"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
