"use client"

import { useEffect, useRef } from "react"
import { Calculator, Zap } from "lucide-react"

const MathInput = ({ onSubmit }) => {
  const mathFieldRef = useRef(null)

  useEffect(() => {
    import("https://unpkg.com/mathlive").then(() => {
      if (mathFieldRef.current) {
        mathFieldRef.current.setValue("x^{2}y + \\sin{(xz)}")
      }
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const latex = mathFieldRef.current.getValue("latex")
    onSubmit(latex)
  }

  const setExample = (latex) => {
    if (mathFieldRef.current) {
      mathFieldRef.current.setValue(latex)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden"
      >
        {/* Header de la tarjeta */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Ingresa tu función</h2>
          </div>
          <p className="text-purple-100">
            Usa variables <code className="bg-purple-700 px-2 py-1 rounded text-sm">x</code>,{" "}
            <code className="bg-purple-700 px-2 py-1 rounded text-sm">y</code> y{" "}
            <code className="bg-purple-700 px-2 py-1 rounded text-sm">z</code> para calcular derivadas parciales.
          </p>
        </div>

        <div className="p-6">
          {/* Mathlive Field */}
          <div className="relative mb-6">
            <math-field
              ref={mathFieldRef}
              virtual-keyboard-mode="manual"
              class="w-full min-h-[80px] p-6 text-xl rounded-xl border-2 border-purple-200 focus:outline-none focus:border-purple-500 shadow-sm bg-purple-50 transition-all duration-200"
            ></math-field>
          </div>

          {/* Botones de ejemplo */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-gray-700 font-semibold">Ejemplos rápidos:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  label: "x²y + sin(xz)",
                  latex: "x^{2}y + \\sin{(xz)}",
                  desc: "Función polinomial con trigonométrica",
                },
                { label: "ln(xy) + z³", latex: "\\ln{(xy)} + z^3", desc: "Logaritmo natural con cúbica" },
                { label: "e^(xyz) + cos(x+y)", latex: "e^{xyz} + \\cos{(x+y)}", desc: "Exponencial con coseno" },
              ].map((ejemplo, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setExample(ejemplo.latex)}
                  className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 text-left group"
                >
                  <div className="font-semibold text-purple-700 mb-1">{ejemplo.label}</div>
                  <div className="text-xs text-gray-600">{ejemplo.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg text-lg flex items-center justify-center gap-3 transform hover:-translate-y-1"
          >
            <Calculator className="w-5 h-5" />
            Calcular derivadas parciales
          </button>
        </div>
      </form>
    </div>
  )
}

export default MathInput
