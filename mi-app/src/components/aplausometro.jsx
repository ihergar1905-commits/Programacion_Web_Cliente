import { useState } from "react";

export function Aplausometro() {
  // 1. Único estado necesario: el contador de aplausos
  const [aplausos, setAplausos] = useState(0);

  // 2. Estado derivado: calculamos el mensaje durante el render según el valor actual
  let mensaje = "";

  if (aplausos < 5) {
    mensaje = "Tímido...";
  } else if (aplausos >= 5 && aplausos <= 14) {
    mensaje = "¡Se anima la sala!";
  } else {
    mensaje = "¡OVACIÓN TOTAL! 🎉";
  }

  // 3. Funciones manejadoras de eventos
  const handleAplaudir = () => {
    setAplausos((prev) => prev + 1);
  };

  const handleReiniciar = () => {
    setAplausos(0);
  };

  return (
    <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>👏 Aplausómetro</h2>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Aplausos: {aplausos}
      </p>
      
      {/* Mensaje dinámico derivado */}
      <p style={{ fontStyle: "italic", color: "#555" }}>
        {mensaje}
      </p>

      {/* Botones de control */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={handleAplaudir}>👏 Aplaudir</button>
        <button onClick={handleReiniciar}>Reiniciar</button>
      </div>
    </div>
  );
}