import Link from 'next/link';

// /portfolio — sin "title" propio: usa el default del layout ("Portfolio").
export default function PortfolioInicio() {
  return (
    <main>
      <h1 className="text-4xl font-bold tracking-tight">Hola, soy desarrollador web</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Estudiante de Ingeniería del Software. Aquí tienes una selección de los proyectos que he
        construido con JavaScript, React y Next.js.
      </p>
      <Link
        href="/portfolio/proyectos"
        className="mt-8 inline-block rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white hover:bg-zinc-700"
      >
        Ver proyectos →
      </Link>
    </main>
  );
}
