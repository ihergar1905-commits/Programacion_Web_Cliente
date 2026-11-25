// Fase 2 — Datos tipados del portfolio.
// No es un componente ni una ruta: es un módulo de datos que importan los Server Components.

export type Proyecto = {
  slug: string; // trozo de URL: /portfolio/proyectos/<slug>
  titulo: string;
  resumen: string; // texto corto para la tarjeta y la meta description
  descripcion: string; // texto largo para la página de detalle
  tecnologias: string[];
  anio: number;
};

const proyectos: Proyecto[] = [
  {
    slug: "async-odyssey",
    titulo: "Async Odyssey",
    resumen: "Explorador de datos con fetch, async/await y manejo de errores.",
    descripcion:
      "Aplicación en JavaScript que consume una API pública, encadena peticiones asíncronas y muestra estados de carga y error de forma controlada.",
    tecnologias: ["JavaScript", "Fetch API", "HTML", "CSS"],
    anio: 2026,
  },
  {
    slug: "reactor-core",
    titulo: "Reactor Core",
    resumen: "SPA en React con componentes, estado y hooks personalizados.",
    descripcion:
      "Interfaz construida con React y Vite: componentes reutilizables, useState/useEffect, hooks propios y comunicación padre-hijo mediante props.",
    tecnologias: ["React", "Vite", "JavaScript"],
    anio: 2026,
  },
  {
    slug: "recetario",
    titulo: "Recetario",
    resumen: "CRUD de recetas con formularios validados y API REST simulada.",
    descripcion:
      "Gestor de recetas con formularios controlados, validación con esquema y persistencia contra un json-server, siguiendo lo visto en la U4.",
    tecnologias: ["React", "json-server", "Validación"],
    anio: 2026,
  },
  {
    slug: "base-espacial",
    titulo: "Base espacial",
    resumen: "Cuaderno de Next.js con App Router, layouts anidados y streaming.",
    descripcion:
      "Proyecto Next.js 16 con rutas por ficheros, layouts anidados, rutas dinámicas con await params y loading.tsx con esqueletos de Tailwind.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind"],
    anio: 2026,
  },
];

// Funciones de acceso: hoy leen un array, mañana podrían leer una base de datos
// sin que cambie ninguna página. Son async para que el uso ya sea el definitivo.
export async function getProyectos(): Promise<Proyecto[]> {
  return proyectos;
}

export async function getProyecto(slug: string): Promise<Proyecto | undefined> {
  return proyectos.find((p) => p.slug === slug);
}
