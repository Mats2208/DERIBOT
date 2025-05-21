import { useEffect } from "react"

const MathResult = ({ resultado }) => {
    useEffect(() => {
      if (window.MathJax) {
        window.MathJax.typeset()
      }
    }, [resultado])

  if (!resultado || resultado.error) {
    return (
      <div className="max-w-3xl mx-auto mt-6 p-4 bg-red-100 text-red-700 rounded-xl shadow">
        <p className="text-lg font-semibold">Error:</p>
        <p>{resultado?.error || "No se pudo cargar el resultado."}</p>
      </div>
    )
  }

  const { funcion, dx, dy, dz, pasos, explicacion_ia } = resultado

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-6 mt-10">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Resultado de Derivadas</h1>

        {/* Función original */}
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-indigo-500 mb-4">
          <h2 className="text-xl font-semibold">Función original</h2>
          <div className="mt-2 text-lg math-display">{"$$ " + funcion + " $$"}</div>
        </div>

        {/* Derivadas parciales */}
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-teal-500 mb-4">
          <h2 className="text-xl font-semibold">Derivadas parciales</h2>
          <div className="math-display mt-2">
            {"$$ \\frac{\\partial f}{\\partial x} = " + dx + " $$"}
          </div>
          <div className="math-display mt-2">
            {"$$ \\frac{\\partial f}{\\partial y} = " + dy + " $$"}
          </div>
          <div className="math-display mt-2">
            {"$$ \\frac{\\partial f}{\\partial z} = " + dz + " $$"}
          </div>
        </div>

        {/* Pasos para cada variable */}
        {["x", "y", "z"].map((v) =>
          pasos?.[v]?.length ? (
            <div key={v} className="bg-indigo-50 p-4 rounded-xl shadow-inner mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Pasos para ∂f/∂{v}
              </h3>
              <ul className="list-disc pl-5">
                {pasos[v].map((paso, i) => (
                  <li key={i} className="mb-2">
                    <p className="text-sm">{paso.descripcion}</p>
                    <div className="math-display">{"$$ " + paso.resultado + " $$"}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>

      {/* Explicación de la IA */}
      {explicacion_ia && (
        <aside className="w-full md:w-[350px] bg-white rounded-xl shadow border p-4">
          <div className="flex items-center mb-3 gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              🤖
            </div>
            <h2 className="text-lg font-semibold">Explicación de la IA</h2>
          </div>
          <div className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700">
            {explicacion_ia}
          </div>
        </aside>
      )}
    </div>
  )
}

export default MathResult
