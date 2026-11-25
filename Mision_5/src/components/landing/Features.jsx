import SectionHeading from '../ui/SectionHeading.jsx';

const VENTAJAS = [
  {
    icono: '🔎',
    titulo: 'Buscador mundial',
    texto: 'Escribe un plato o un ingrediente y te traemos recetas de TheMealDB, con foto, país y vídeo.',
    acento: 'bg-azafran-300',
  },
  {
    icono: '❤️',
    titulo: 'Favoritos que no se pierden',
    texto: 'Guarda las recetas que te gustan. Siguen ahí aunque cierres el navegador.',
    acento: 'bg-tomate-300',
  },
  {
    icono: '🧺',
    titulo: 'Modo despensa',
    texto: 'Marca lo que ya tienes en casa y te decimos cuántos ingredientes te faltan.',
    acento: 'bg-oliva-300',
  },
  {
    icono: '📝',
    titulo: 'Tu propio recetario',
    texto: 'Apunta tus recetas con un formulario que te avisa de cada error antes de guardar.',
    acento: 'bg-crema-300',
  },
];

// Grid: 1 columna en móvil, 2 en tablet (768px) y 4 en escritorio (1280px)
function Features() {
  return (
    <section
      id="ventajas"
      aria-labelledby="ventajas-title"
      className="border-y-2 border-carbon-900 bg-crema-100 py-16 md:py-24 dark:border-crema-200/20 dark:bg-carbon-900"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading id="ventajas-title" eyebrow="Por qué te va a gustar" title="Todo lo que necesitas para no pedir comida a domicilio">
          Cuatro herramientas pensadas para el momento «¿y hoy qué ceno?».
        </SectionHeading>

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {VENTAJAS.map((ventaja, i) => (
            <li
              key={ventaja.titulo}
              style={{ animationDelay: `${i * 100}ms` }} // escalonado: cada tarjeta entra un poco después
              className="flex flex-col gap-4 rounded-tarjeta border-2 border-carbon-900 bg-crema-50 p-6 shadow-tarjeta transition hover:-translate-y-1 motion-safe:animate-entrada dark:border-crema-200/20 dark:bg-carbon-800"
            >
              <span aria-hidden="true" className={`${ventaja.acento} grid size-14 place-items-center rounded-2xl text-3xl`}>
                {ventaja.icono}
              </span>
              <h3 className="font-display text-xl font-bold">{ventaja.titulo}</h3>
              <p className="text-carbon-600 dark:text-crema-200/80">{ventaja.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
