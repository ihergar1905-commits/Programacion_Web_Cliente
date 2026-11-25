// 1.3 — Ruta dinámica: la carpeta [nombre] captura cualquier segmento.
// /invitado/ada → params = Promise<{ nombre: "ada" }>
export default async function InvitadoPage({
  params,
}: {
  params: Promise<{ nombre: string }>;
}) {
  // En Next.js 15+ params es una Promise: hay que esperarla.
  // Sin el await, TypeScript da: error TS2339: Property 'nombre' does not
  // exist on type 'Promise<{ nombre: string; }>'.
  const { nombre } = await params;

  // Reto: primera letra en mayúscula solo con TypeScript (sin CSS `capitalize`)
  const nombreBonito = nombre.charAt(0).toUpperCase() + nombre.slice(1);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Bienvenida a la base, {nombreBonito} 🛰️</h1>
    </main>
  );
}
