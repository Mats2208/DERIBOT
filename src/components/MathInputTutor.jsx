"use client"

import { useEffect, useRef, useState } from "react"
import { Calculator, Sparkles, BookOpen, ArrowRight } from "lucide-react"

export default function MathInput({ onSubmit }) {
  const [formula, setFormula] = useState("")
  const mathFieldRef = useRef(null)

  useEffect(() => {
    import("https://unpkg.com/mathlive").then(() => {
      if (mathFieldRef.current) {
        mathFieldRef.current.setValue("x^{2}y + \\sin{(xz)}")
        setFormula("x^{2}y + \\sin{(xz)}")
      }
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const latex = mathFieldRef.current?.getValue("latex") || formula
    if (latex.trim()) {
      onSubmit(latex)
    }
  }

  const setExample = (latex) => {
    if (mathFieldRef.current) {
      mathFieldRef.current.setValue(latex)
      setFormula(latex)
    }
  }

  const ejemplos = [
    {
      label: "x²y + sin(xz)",
      latex: "x^{2}y + \\sin{(xz)}",
      desc: "Función polinomial con trigonométrica",
      nivel: "Intermedio",
    },
    {
      label: "e^(xy) + z³",
      latex: "e^{xy} + z^3",
      desc: "Exponencial con polinomio",
      nivel: "Avanzado",
    },
    {
      label: "x³ + 2y² + z",
      latex: "x^3 + 2y^2 + z",
      desc: "Polinomio simple",
      nivel: "Básico",
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Calculator className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Paso 1: Ingresa tu Función</h2>
            <p className="text-purple-100">El tutor calculará ∂f/∂x y tú resolverás ∂f/∂y y ∂f/∂z</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Campo de entrada matemática */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-3">Función f(x, y, z):</label>
          <div className="relative">
            <math-field
              ref={mathFieldRef}
              virtual-keyboard-mode="manual"
              class="w-full min-h-[80px] p-6 text-xl rounded-xl border-2 border-purple-200 focus:outline-none focus:border-purple-500 shadow-sm bg-purple-50 transition-all duration-200"
              onInput={(e) => setFormula(e.target.value)}
            ></math-field>
            <div className="absolute top-2 right-2">
              <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">LaTeX</div>
            </div>
          </div>
        </div>

        {/* Ejemplos */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <p className="text-lg font-semibold text-gray-700">Ejemplos para practicar:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ejemplos.map((ejemplo, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setExample(ejemplo.latex)}
                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-purple-700">{ejemplo.label}</div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ejemplo.nivel === "Básico"
                        ? "bg-green-100 text-green-700"
                        : ejemplo.nivel === "Intermedio"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ejemplo.nivel}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">{ejemplo.desc}</div>
                <div className="flex items-center text-purple-600 text-sm font-medium group-hover:text-purple-700">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Usar este ejemplo
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            ¿Cómo funciona el tutor?
          </h4>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Ingresa una función de tres variables (x, y, z)</li>
            <li>El tutor calculará automáticamente ∂f/∂x</li>
            <li>Tú deberás calcular ∂f/∂y y ∂f/∂z</li>
            <li>Recibirás retroalimentación personalizada de IA</li>
          </ol>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={!formula.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg text-lg flex items-center justify-center gap-3 transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
        >
          <Calculator className="w-5 h-5" />
          Comenzar Tutorial
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
