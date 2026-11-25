// 1.4 — Server Component que simula una consulta lenta (2 s) antes del return.
// Mientras espera, Next muestra automáticamente loading.tsx.
export default async function ArchivoPage() {
  await new Promise((r) => setTimeout(r, 2000));

  const documentos = ["Informe de misión 001", "Registro de comunicaciones", "Planos de la base"];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Archivo</h1>
      <ul className="mt-4 space-y-2">
        {documentos.map((d) => (
          <li key={d} className="rounded border border-zinc-200 p-3">
            {d}
          </li>
        ))}
      </ul>
    </main>
  );
}
