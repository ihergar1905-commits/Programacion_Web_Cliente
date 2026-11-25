// Se pinta cuando page.tsx de esta carpeta llama a notFound().
import Link from 'next/link';

export default function ProyectoNoEncontrado() {
  return (
    <main className="py-12 text-center">
      <p className="text-6xl">🛸</p>
      <h1 className="mt-4 text-3xl font-bold">Proyecto no encontrado</h1>
      <p className="mt-2 text-zinc-600">Ese proyecto no existe o se ha perdido en el espacio.</p>
      <Link
        href="/portfolio/proyectos"
        className="mt-6 inline-block rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white hover:bg-zinc-700"
      >
        Ver todos los proyectos
      </Link>
    </main>
  );
}
