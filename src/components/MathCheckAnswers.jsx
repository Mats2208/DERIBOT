import { useState, useEffect } from "react";

export default function MathCheckAnswers({ base, onSubmit, onBack }) {
  const [dy, setDy] = useState("");
  const [dz, setDz] = useState("");
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      const timer = setTimeout(() => {
        window.MathJax.typesetPromise()
          .then(() => {
            console.log("✅ Fórmulas renderizadas en MathCheckAnswers");
          })
          .catch((err) => {
            console.error("❌ Error renderizando fórmulas:", err);
          });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [base]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(dy, dz);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-purple-700">Paso 2: Verifica tus conocimientos</h2>      <p className="mb-2">Derivada parcial respecto a <strong>x</strong>:</p>
      <div className="bg-purple-50 border border-purple-200 p-4 rounded text-xl text-center mb-6">
        <span className="font-mono">${`\\frac{\\partial f}{\\partial x} = ${base.dx}`}$</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">∂f/∂y:</label>
          <input
            type="text"
            value={dy}
            onChange={(e) => setDy(e.target.value)}
            placeholder="Ej: x"
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">∂f/∂z:</label>
          <input
            type="text"
            value={dz}
            onChange={(e) => setDz(e.target.value)}
            placeholder="Ej: 0"
            className="w-full border p-3 rounded"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Verificar respuestas
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            ← Volver
          </button>
        </div>
      </form>
    </div>
  );
}

