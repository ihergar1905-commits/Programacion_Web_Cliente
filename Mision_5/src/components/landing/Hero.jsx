import Button from '../ui/Button.jsx';
import { useMyRecipes } from '../../hooks/useMyRecipes.js'; // el mismo cajón de TanStack que usa la app (M4)

// Fichas del mosaico: emoji + nombre + color de fondo (tokens de la paleta)
const MOSAICO = [
  { emoji: '🍅', nombre: 'Tomate', fondo: 'bg-tomate-400' },
  { emoji: '🧄', nombre: 'Ajo', fondo: 'bg-crema-200 dark:bg-crema-300' },
  { emoji: '🌶️', nombre: 'Guindilla', fondo: 'bg-tomate-600' },
  { emoji: '🫒', nombre: 'Aceituna', fondo: 'bg-oliva-300' },
  { emoji: '🍋', nombre: 'Limón', fondo: 'bg-azafran-300' },
  { emoji: '🧅', nombre: 'Cebolla', fondo: 'bg-tomate-300' },
];

function Hero() {
  const misRecetas = useMyRecipes();
  const guardadas = misRecetas.isSuccess ? misRecetas.data.recetas.length : '—'; // dato real de json-server

  return (
    <section id="inicio" aria-labelledby="hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-16 md:px-8 md:pt-16 xl:pt-24">
      {/* Grid: en móvil una columna (texto y luego mosaico); desde 768px, dos columnas */}
      <div className="grid items-center gap-12 md:grid-cols-2 xl:gap-20">
        <div className="motion-safe:animate-entrada">
          <p className="mb-5 inline-flex items-center gap-2 rounded-boton border-2 border-carbon-900 bg-azafran-300 px-4 py-1 text-sm font-semibold text-carbon-900 dark:border-azafran-300">
            <span aria-hidden="true">✨</span> Recetario + buscador mundial
          </p>

          <h1 id="hero-title" className="font-display text-4xl leading-[1.05] font-black text-balance md:text-5xl xl:text-7xl">
            Cocina lo que{' '}
            <span className="bg-[linear-gradient(transparent_62%,var(--color-azafran-300)_62%)] px-1 dark:bg-[linear-gradient(transparent_62%,var(--color-tomate-700)_62%)]">
              ya tienes
            </span>{' '}
            en la nevera.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-carbon-600 md:text-xl dark:text-crema-200/80">
            Busca entre cientos de platos de todo el mundo, guarda tus favoritos, marca lo que tienes en la despensa y
            apunta tus propias recetas. Todo en una sola página.
          </p>

          {/* Flex con wrap: los dos botones van en fila y bajan de línea si no caben (360px) */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#app">Empezar a cocinar →</Button>
            <Button href="#como-funciona" variant="ghost">
              Ver cómo funciona
            </Button>
          </div>

          {/* Grid de 3 columnas iguales para las cifras */}
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t-2 border-dashed border-carbon-900/20 pt-6 dark:border-crema-200/20">
            <div>
              <dt className="text-xs font-medium text-carbon-500 uppercase dark:text-carbon-400">Recetas</dt>
              <dd className="font-display text-3xl font-bold">300+</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-carbon-500 uppercase dark:text-carbon-400">Cocinas</dt>
              <dd className="font-display text-3xl font-bold">25</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-carbon-500 uppercase dark:text-carbon-400">Tuyas</dt>
              <dd className="font-display text-3xl font-bold text-tomate-600 dark:text-tomate-400">{guardadas}</dd>
            </div>
          </dl>
        </div>

        {/* Mosaico de ingredientes: grid 3x3 con una "comanda" que ocupa 3 columnas */}
        <div className="grid grid-cols-3 gap-3 motion-safe:animate-entrada motion-safe:[animation-delay:150ms] md:gap-4">
          {MOSAICO.map((ficha) => (
            <figure
              key={ficha.nombre}
              className={`${ficha.fondo} grid aspect-square place-items-center rounded-tarjeta border-2 border-carbon-900 shadow-sello transition hover:-rotate-3 dark:shadow-none`}
            >
              <span className="text-4xl md:text-5xl" aria-hidden="true">
                {ficha.emoji}
              </span>
              <figcaption className="sr-only">{ficha.nombre}</figcaption>
            </figure>
          ))}

          <div className="col-span-3 flex items-center justify-between gap-4 rounded-tarjeta border-2 border-carbon-900 bg-crema-50 p-4 shadow-sello dark:border-crema-200/40 dark:bg-carbon-800 dark:shadow-none">
            <div>
              <p className="text-xs font-semibold tracking-widest text-carbon-500 uppercase dark:text-carbon-400">
                Comanda nº 42
              </p>
              <p className="font-display text-lg font-bold">Shakshuka con lo que hay</p>
            </div>
            <span className="shrink-0 rounded-boton bg-oliva-500 px-3 py-1 text-sm font-semibold text-white">
              ✓ 6 / 6
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
