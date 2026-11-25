// Fase 3 — Detalle de proyecto + SEO.
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProyecto } from '@/lib/proyectos';

type Props = {
  params: Promise<{ slug: string }>; // desde Next 15, params es una Promise
};

// Se ejecuta en el servidor antes de renderizar: un <title> distinto por proyecto.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = await getProyecto(slug);

  if (!proyecto) {
    return { title: 'Proyecto no encontrado' };
  }

  return {
    title: proyecto.titulo, // → "<titulo> · Portfolio" por la plantilla del layout
    description: proyecto.resumen, // reto extra
    openGraph: {
      // reto extra: lo que se ve al compartir el enlace en redes
      title: proyecto.titulo,
      description: proyecto.resumen,
      type: 'article',
    },
  };
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const proyecto = await getProyecto(slug);

  // Slug inventado → corta el render y muestra ./not-found.tsx
  if (!proyecto) {
    notFound();
  }

  return (
    <main>
      <Link href="/portfolio/proyectos" className="text-sm text-zinc-500 hover:underline">
        ← Volver a proyectos
      </Link>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">{proyecto.titulo}</h1>
      <p className="mt-1 text-zinc-400">{proyecto.anio}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-700">{proyecto.descripcion}</p>
      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Tecnologías
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {proyecto.tecnologias.map((t) => (
          <li key={t} className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
            {t}
          </li>
        ))}
      </ul>
    </main>
  );
}
