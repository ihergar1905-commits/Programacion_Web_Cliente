// Fase 2 — Listado de proyectos desde un Server Component.
// Los datos se obtienen con await directamente en el componente: nada de useEffect.
import type { Metadata } from 'next';
import { getProyectos } from '@/lib/proyectos';
import TarjetaProyecto from '@/components/TarjetaProyecto';

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Listado de proyectos de desarrollo web.',
};

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <main>
      <h1 className="text-3xl font-bold">Proyectos</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {proyectos.map((p) => (
          <TarjetaProyecto key={p.slug} proyecto={p} />
        ))}
      </div>
    </main>
  );
}
