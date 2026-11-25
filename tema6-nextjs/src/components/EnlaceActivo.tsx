// Fase 4 — La única hoja cliente de la misión.
// Necesita 'use client' porque usePathname() es un hook: lee la URL actual en el navegador.
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EnlaceActivo({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const activo = usePathname() === href;
  return (
    <Link
      href={href}
      className={activo ? 'font-bold underline' : 'hover:underline'}
    >
      {children}
    </Link>
  );
}
