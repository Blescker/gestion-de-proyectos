import React, { useState } from "react";
import { planificarProyecto, PlanificacionResponse } from "../api/planificacion";


interface Mensaje {
  from: "user" | "ia";
  text: string;
}

interface PlanificadorIAProps {
  proyectoId: string;
  token: string | undefined;
  onPlanificacionCompletada?: () => void;
}

const PlanificadorIA: React.FC<PlanificadorIAProps> = ({
  proyectoId,
  token,
  onPlanificacionCompletada,
}) => {
  const [conversacion, setConversacion] = useState<Mensaje[]>([]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async () => {
    if (!input.trim() || !token) return;
    setCargando(true);
    setConversacion((prev) => [...prev, { from: "user", text: input }]);

    try {
        const res: PlanificacionResponse = await planificarProyecto(input, proyectoId, token);

        setConversacion((prev) => [
        ...prev,
        { from: "ia", text: res.mensajeIA },
        ]);

        if (res.listas && onPlanificacionCompletada) {
        onPlanificacionCompletada();
        }
    } catch (err: any) {
        setConversacion((prev) => [
        ...prev,
        { from: "ia", text: "Ocurrió un error con la IA." },
        ]);
    }
    setInput("");
    setCargando(false);
    };

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, marginBottom: 16 }}>
      <h4>Planificador IA</h4>
      <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 8 }}>
        {conversacion.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === "user" ? "right" : "left" }}>
            <b>{msg.from === "user" ? "Tú" : "IA"}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && enviarMensaje()}
        disabled={cargando || !token}
        placeholder="Describe tu proyecto o responde a la IA..."
        style={{ width: "80%" }}
      />
      <button onClick={enviarMensaje} disabled={cargando || !input.trim() || !token}>
        Enviar
      </button>
    </div>
  );
};

export default PlanificadorIA;
