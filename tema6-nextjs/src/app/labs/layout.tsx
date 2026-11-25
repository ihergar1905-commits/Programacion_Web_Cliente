import Link from "next/link";

// 1.2 — Layout anidado: solo envuelve a /labs y sus subrutas.
// Al navegar entre experimentos solo cambia {children}; el <aside> no se vuelve a montar.
export default function LabsLayout({ children }: LayoutProps<"/labs">) {
  return (
    <div className="flex flex-1">
      <aside className="w-48 border-r border-zinc-200 bg-zinc-100 p-4">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Laboratorios
        </h2>
        <ul className="space-y-2">
          <li>
            <Link href="/labs/colores" className="hover:text-sky-600 hover:underline">
              Colores
            </Link>
          </li>
          <li>
            <Link href="/labs/tipografia" className="hover:text-sky-600 hover:underline">
              Tipografía
            </Link>
          </li>
        </ul>
      </aside>
      <section className="flex-1 p-8">{children}</section>
    </div>
  );
}
