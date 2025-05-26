import { useEffect } from "react";

export default function MathResultTutor({ resultado, onBack }) {
  useEffect(() => {
    if (window.MathJax) window.MathJax.typeset();
  }, [resultado]);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-6">
      <h2 className="text-xl font-semibold text-purple-700">Resultado final:</h2>

      <div>
        <p><strong>Función:</strong> \( f(x, y, z) = {resultado.funcion} \)</p>
        <p><strong>∂f/∂x:</strong> \( {resultado.dx} \)</p>
      </div>

      <div className="space-y-2">
        <p>
          ∂f/∂y: {resultado.verificacion.dy
            ? <span className="text-green-600 font-semibold">✅ Correcto</span>
            : <span className="text-red-600 font-semibold">❌ Incorrecto</span>}
        </p>
        <p>
          ∂f/∂z: {resultado.verificacion.dz
            ? <span className="text-green-600 font-semibold">✅ Correcto</span>
            : <span className="text-red-600 font-semibold">❌ Incorrecto</span>}
        </p>
      </div>

      {(resultado.retroalimentacion.dy || resultado.retroalimentacion.dz) && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Explicaciones:</h3>
          {resultado.retroalimentacion.dy && (
            <div className="bg-gray-100 p-3 rounded mb-3 whitespace-pre-wrap">
              <strong>∂f/∂y:</strong> <br />
              {resultado.retroalimentacion.dy}
            </div>
          )}
          {resultado.retroalimentacion.dz && (
            <div className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
              <strong>∂f/∂z:</strong> <br />
              {resultado.retroalimentacion.dz}
            </div>
          )}
        </div>
      )}

      <button
        onClick={onBack}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        Volver a empezar
      </button>
    </div>
  );
}
