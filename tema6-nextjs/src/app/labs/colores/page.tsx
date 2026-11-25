export default function ColoresPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Experimento: colores</h1>
      <div className="mt-4 flex gap-3">
        <div className="h-16 w-16 rounded bg-sky-500" />
        <div className="h-16 w-16 rounded bg-emerald-500" />
        <div className="h-16 w-16 rounded bg-amber-500" />
        <div className="h-16 w-16 rounded bg-rose-500" />
      </div>
    </>
  );
}
