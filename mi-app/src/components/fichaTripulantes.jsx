export function FichaTripulante({ nombre, rol, especie = "humana" }) {
  return (
    <article>
      <h2>{nombre}</h2>
      <p>{rol}</p>
      <p>{especie}</p>
    </article>
  );
}