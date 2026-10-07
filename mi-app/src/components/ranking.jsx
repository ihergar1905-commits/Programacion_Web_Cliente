export function Ranking({ ranking }) {
  return (
    <ol>
      {ranking.map((item) => (
        <li key={item.id}>
          {item.jugador} — {item.puntos}{item.puntos > 8000 && " 🏅"}
        </li>
      ))}
    </ol>
  );
}