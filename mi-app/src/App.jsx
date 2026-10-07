import { Esclusa } from "./components/esclusa.jsx";
import { FichaTripulante } from "./components/fichaTripulantes.jsx";
import { Ranking } from "./components/ranking.jsx";

// Datos de prueba para el ranking
const RANKING_DATA = [
  { id: "a1", jugador: "NOVA", puntos: 9800 },
  { id: "b2", jugador: "PIXEL", puntos: 8650 },
  { id: "c3", jugador: "KIRA", puntos: 7400 },
  { id: "d4", jugador: "BYTE", puntos: 5200 },
];

export default function App() {
  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🚀 Panel de Control de la Nave</h1>

      <section>
        <h2>Estado de las Esclusas</h2>
        <Esclusa abierta={true} avisos={2} />
        <Esclusa abierta={false} avisos={0} />
      </section>

      <section>
        <h2>Tripulación</h2>
        <FichaTripulante nombre="Alex Vance" rol="Ingeniera Jefe" especie="Humana" />
        <FichaTripulante nombre="Zax" rol="Piloto" especie="Alienígena" />
      </section>

      <section>
        <h2>Ranking Arcade</h2>
        <Ranking ranking={RANKING_DATA} />
      </section>
    </main>
  );
}