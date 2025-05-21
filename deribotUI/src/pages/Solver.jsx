// src/pages/Solver.jsx
import { useState } from "react"
import MathInput from "../components/MathInput"
import MathResult from "../components/MathResult"

const Solver = () => {
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleResolver = async (formulaLatex) => {
    try {
      setLoading(true)
      const res = await fetch("http://127.0.0.1:5000/resolver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ formula: formulaLatex })
      })

      const data = await res.json()
      setResultado(data)
    } catch (err) {
      setResultado({ error: "Error de conexión con el servidor Flask." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <MathInput onSubmit={handleResolver} />
      {loading && (
        <div className="text-center text-indigo-500 font-semibold text-lg mt-6">Calculando derivadas...</div>
      )}
      {resultado && !loading && <MathResult resultado={resultado} />}
    </div>
  )
}

export default Solver
