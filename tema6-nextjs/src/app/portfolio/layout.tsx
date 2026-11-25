// Fase 1 — Layout de la sección /portfolio.
// Server Component (sin directiva): solo envuelve /portfolio y sus subrutas,
// así que no afecta al resto del cuaderno (/mision, /labs, ...).
import type { Metadata } from 'next';
import EnlaceActivo from '@/components/EnlaceActivo';

// Plantilla de título: las páginas hijas ponen su "title" y Next lo mete en %s.
// /portfolio/proyectos → <title>Proyectos · Portfolio</title>
export const metadata: Metadata = {
  title: {
    template: '%s · Portfolio',
    default: 'Portfolio',
  },
  description: 'Portfolio de proyectos de desarrollo web renderizado en servidor con Next.js.',
};

export default function PortfolioLayout({ children }: LayoutProps<'/portfolio'>) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-8 py-6">
      <header className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4">
        <span className="text-xl font-bold tracking-tight">Mi portfolio</span>
        {/* El layout es servidor; cada EnlaceActivo es una hoja cliente diminuta */}
        <nav className="flex gap-5 text-zinc-700">
          <EnlaceActivo href="/portfolio">Inicio</EnlaceActivo>
          <EnlaceActivo href="/portfolio/proyectos">Proyectos</EnlaceActivo>
          <EnlaceActivo href="/portfolio/contacto">Contacto</EnlaceActivo>
        </nav>
      </header>
      {children}
    </div>
  );
}
