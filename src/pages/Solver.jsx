// src/pages/Solver.jsx
import { useState } from "react"
import MathInput from "../components/MathInput"
import MathResult from "../components/MathResult"


const Solver = () => {
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleResolver = async (formulaLatex, orden) => {
    try {
      setLoading(true)
      setShowResult(true)

      const res = await fetch("https://deribot.onrender.com/resolver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formula: formulaLatex, orden }), // ahora envía orden
      })

      const data = await res.json()
      setResultado(data)
    } catch (err) {
      setResultado({ error: "Error de conexión con el servidor Flask." })
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setShowResult(false)
    setResultado(null)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">Calculadora de Derivadas</h1>
          <p className="text-gray-600 text-lg">Resuelve derivadas parciales paso a paso con IA</p>
        </div>

        {/* Mostrar MathInput solo si no estamos en modo resultado */}
        {!showResult && <MathInput onSubmit={handleResolver} />}

        {/* Mostrar loading cuando se está calculando */}
        {loading && showResult && (
          <div className="flex items-center justify-center mt-8">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-8 text-center max-w-md mx-auto">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-purple-700 font-semibold text-xl mb-2">Calculando derivadas...</p>
              <p className="text-gray-500 text-sm">Esto puede tomar unos segundos</p>
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mostrar resultado cuando esté listo */}
        {resultado && !loading && showResult && <MathResult resultado={resultado} onBack={handleBack} />}
      </div>
    </div>
  )
}

export default Solver
