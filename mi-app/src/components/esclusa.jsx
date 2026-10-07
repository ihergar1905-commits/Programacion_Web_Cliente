export function Esclusa({ abierta, avisos }) {
  return (
    <div>
      <p>{abierta ? "🟢 Esclusa abierta" : "🔴 Esclusa cerrada"}</p>
      {avisos > 0 && <p>⚠️ Tienes {avisos} avisos pendientes</p>}
    </div>
  );
}