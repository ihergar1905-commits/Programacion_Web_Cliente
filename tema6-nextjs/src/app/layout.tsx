import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Base espacial",
  description: "Cuaderno 6 · Next.js App Router",
};

// 1.1 — La barra vive en el layout raíz: sale en todas las páginas
// y <Link> navega en cliente, sin recargar la página.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex gap-6 border-b border-zinc-200 bg-zinc-900 px-8 py-4 text-zinc-100">
          <Link href="/" className="font-semibold hover:text-sky-400">
            Inicio
          </Link>
          <Link href="/mision" className="hover:text-sky-400">
            Misión
          </Link>
          <Link href="/bitacora" className="hover:text-sky-400">
            Bitácora
          </Link>
          <Link href="/labs" className="hover:text-sky-400">
            Labs
          </Link>
          <Link href="/archivo" className="hover:text-sky-400">
            Archivo
          </Link>
          <Link href="/portfolio" className="hover:text-sky-400">
            Portfolio
          </Link>
        </nav>
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
