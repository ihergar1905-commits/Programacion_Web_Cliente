import { useState } from 'react';

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
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Busca una receta (ej: chicken, pasta)..."
        aria-label="Buscar receta"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchForm;
