// Reto extra — Tarjeta reutilizable.
// Server Component: SIN directiva. Solo pinta datos (sin estado ni eventos),
// y el <Link> de Next funciona igual dentro de un Server Component.
import Link from 'next/link';
import type { Proyecto } from '@/lib/proyectos';

export default function TarjetaProyecto({ proyecto }: { proyecto: Proyecto }) {
  return (
    <Link
      href={`/portfolio/proyectos/${proyecto.slug}`}
      className="block rounded-xl border border-zinc-200 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <article>
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">{proyecto.titulo}</h2>
          <span className="text-sm text-zinc-400">{proyecto.anio}</span>
        </div>
        <p className="mt-2 text-zinc-600">{proyecto.resumen}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {proyecto.tecnologias.map((t) => (
            <li key={t} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
              {t}
            </li>
          ))}
        </ul>
      </article>
    </Link>
  );
}
