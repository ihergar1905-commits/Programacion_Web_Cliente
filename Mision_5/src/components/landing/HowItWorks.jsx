import SectionHeading from '../ui/SectionHeading.jsx';

const PASOS = [
  { titulo: 'Busca', texto: 'Escribe «pasta», «chicken» o lo que tengas a mano y filtra por categoría.' },
  { titulo: 'Elige', texto: 'Abre la receta, marca en la despensa lo que tienes y guárdala en favoritos.' },
  { titulo: 'Crea', texto: 'Cuando inventes algo tuyo, apúntalo en «Mis recetas» y queda guardado en el servidor.' },
];

// Lista ordenada: en móvil, pasos en columna; desde 768px, grid de 3 columnas
function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="pasos-title" className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <SectionHeading id="pasos-title" eyebrow="Cómo funciona" title="De la nevera al plato en tres pasos" />

      <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
        {PASOS.map((paso, i) => (
          <li key={paso.titulo} className="flex gap-5 md:flex-col">
            <span
              aria-hidden="true"
              className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-carbon-900 bg-tomate-600 font-display text-2xl font-black text-white shadow-sello dark:border-crema-100 dark:shadow-none"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold">{paso.titulo}</h3>
              <p className="mt-2 text-carbon-600 dark:text-crema-200/80">{paso.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default HowItWorks;
