// Pie: flex en columna en móvil, en fila desde 768px
function Footer() {
  return (
    <footer className="bg-carbon-900 text-crema-100 dark:bg-carbon-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl font-black">
            Culinary<span className="text-tomate-400">Odyssey</span>
          </p>
          <p className="mt-1 text-sm text-crema-200/70">Hecho con hambre en la U-tad · Misión 5 · Pixel Perfect</p>
        </div>
        <p className="text-sm text-crema-200/70">
          Recetas del mundo gracias a{' '}
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-azafran-300 underline underline-offset-4 hover:text-azafran-200"
          >
            TheMealDB
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
