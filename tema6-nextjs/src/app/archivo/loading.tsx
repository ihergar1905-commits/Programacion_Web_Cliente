// 1.4 — Esqueleto: Next envuelve page.tsx en un <Suspense> con esto como fallback.
export default function Loading() {
  return (
    <main className="animate-pulse p-8">
      <div className="h-9 w-40 rounded bg-gray-200" />
      <div className="mt-4 space-y-2">
        <div className="h-12 rounded bg-gray-200" />
        <div className="h-12 rounded bg-gray-200" />
        <div className="h-12 rounded bg-gray-200" />
      </div>
    </main>
  );
}
