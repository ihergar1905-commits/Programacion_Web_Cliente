import ThemeToggle from '../ui/ThemeToggle.jsx';
import Button from '../ui/Button.jsx';

const ENLACES = [
  { href: '#ventajas', texto: 'Ventajas' },
  { href: '#como-funciona', texto: 'Cómo funciona' },
  { href: '#app', texto: 'Pruébala' },
];

// Barra superior fija. Flex: una sola fila con logo a la izquierda y acciones a la derecha
function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-carbon-900 bg-crema-50/90 backdrop-blur dark:border-crema-200/20 dark:bg-carbon-950/85">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8"
      >
        <a href="#inicio" className="flex items-center gap-2 font-display text-xl font-black md:text-2xl">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-tomate-600 text-lg">
            🍳
          </span>
          Culinary<span className="text-tomate-600 dark:text-tomate-400">Odyssey</span>
        </a>

        {/* Los enlaces solo caben desde tablet (md). Entre 640 y 768 px se ve el botón "Probar"; en 360 px no cabe y el CTA del hero hace su papel */}
        <ul className="hidden items-center gap-8 font-medium md:flex">
          {ENLACES.map((enlace) => (
            <li key={enlace.href}>
              <a
                href={enlace.href}
                className="underline-offset-8 transition hover:text-tomate-600 hover:underline dark:hover:text-tomate-300"
              >
                {enlace.texto}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3">
          <ThemeToggle />
          {/* El envoltorio decide si se ve (hidden/sm:block); así no choca con el inline-flex del botón */}
          <div className="hidden sm:block md:hidden">
            <Button href="#app" className="px-4 py-2 text-sm">
              Probar
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
