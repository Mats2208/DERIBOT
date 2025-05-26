import { useState } from "react";
import MathInput from "../components/MathInput";
import MathCheckAnswers from "../components/MathCheckAnswers";
import MathResultTutor from "../components/MathResultTutor";

export default function Tutor() {
  const [fase, setFase] = useState("input");
  const [dataBase, setDataBase] = useState(null);
  const [resultado, setResultado] = useState(null);

  // Paso 1: Enviar fórmula al backend
  const manejarFormula = async (formula) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/solverTutorInit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formula }),
      });
      const json = await res.json();
      setDataBase({ formula, dx: json.dx });
      setFase("check");
    } catch (error) {
      console.error("❌ Error enviando fórmula:", error.message);
    }
  };

  // Paso 2: Enviar respuestas del usuario
  const manejarVerificacion = async (dy, dz) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/solverTutorCheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formula: dataBase.formula,
          dy,
          dz,
        }),
      });
      const json = await res.json();
      setResultado(json);
      setFase("result");
    } catch (error) {
      console.error("❌ Error verificando respuestas:", error.message);
    }
  };

  const reiniciar = () => {
    setFase("input");
    setDataBase(null);
    setResultado(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Tutor de Derivadas</h1>

      {fase === "input" && <MathInput onSubmit={manejarFormula} />}
      {fase === "check" && dataBase && (
        <MathCheckAnswers base={dataBase} onSubmit={manejarVerificacion} onBack={reiniciar} />
      )}
      {fase === "result" && resultado && (
        <MathResultTutor resultado={resultado} onBack={reiniciar} />
      )}
    </div>
  );
}
