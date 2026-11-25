// Cabecera de sección reutilizable: "antetítulo" pequeño + título grande + entradilla
function SectionHeading({ eyebrow, title, children, id }) {
  return (
    <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-tomate-600 uppercase dark:text-tomate-300">
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-3xl leading-tight font-bold text-balance md:text-4xl xl:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg text-carbon-600 dark:text-crema-200/80">{children}</p>}
    </header>
  );
}

export default SectionHeading;
