import type { Metadata } from 'next';

// Metadata estática → <title>Contacto · Portfolio</title>
export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Formas de contactar conmigo.',
};

export default function ContactoPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold">Contacto</h1>
      <ul className="mt-6 space-y-3 text-zinc-700">
        <li>
          <span className="font-semibold">Email:</span> tu-correo@ejemplo.com
        </li>
        <li>
          <span className="font-semibold">GitHub:</span> github.com/tu-usuario
        </li>
        <li>
          <span className="font-semibold">LinkedIn:</span> linkedin.com/in/tu-usuario
        </li>
      </ul>
    </main>
  );
}
