"use client"

import { useState, useEffect, useRef } from "react"
import { Brain, CheckCircle, ArrowLeft, Lightbulb, Eye, EyeOff } from "lucide-react"

export default function MathCheckAnswers({ base, resultado, onSubmit, onBack }) {
  const [dy, setDy] = useState("")
  const [dz, setDz] = useState("")
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState({ dy: false, dz: false })
  const dyFieldRef = useRef(null)
  const dzFieldRef = useRef(null)

  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      const timer = setTimeout(() => {
        window.MathJax.typesetPromise()
          .then(() => {
            console.log("✅ Fórmulas renderizadas en MathCheckAnswers")
          })
          .catch((err) => {
            console.error("❌ Error renderizando fórmulas:", err)
          })
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [base])

  useEffect(() => {
    // Inicializar MathLive para los campos de entrada
    import("https://unpkg.com/mathlive").then(() => {
      if (dyFieldRef.current) {
        dyFieldRef.current.addEventListener("input", (e) => {
          setDy(e.target.value)
        })
      }
      if (dzFieldRef.current) {
        dzFieldRef.current.addEventListener("input", (e) => {
          setDz(e.target.value)
        })
      }
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const dyLatex = dyFieldRef.current?.getValue("latex") || dy
    const dzLatex = dzFieldRef.current?.getValue("latex") || dz
    onSubmit(dyLatex, dzLatex)
  }

  const toggleSolution = (variable) => {
    setShowSolution((prev) => ({
      ...prev,
      [variable]: !prev[variable],
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-white">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Paso 2: Resuelve las Derivadas</h2>
              <p className="text-purple-100">Calcula las derivadas parciales restantes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Función y derivada dada */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-teal-100 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-100 to-teal-50 p-4 border-b border-teal-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-teal-700">Información Proporcionada</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
            <p className="text-sm text-teal-600 mb-2 font-medium">Función original:</p>
            <div className="text-xl text-center">
              <span className="font-mono">$f(x,y,z) = {resultado?.funcion || "undefined"}$</span>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="text-sm text-green-600 mb-2 font-medium">Derivada parcial calculada por el tutor:</p>
            <div className="text-xl text-center">
              <span className="font-mono">${`\\frac{\\partial f}{\\partial x} = ${resultado?.dx || "undefined"}`}$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de respuestas */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-4 border-b border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-yellow-700">Tu Turno de Resolver</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 px-3 py-1 bg-yellow-200 hover:bg-yellow-300 rounded-lg text-yellow-700 text-sm font-medium transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              {showHints ? "Ocultar" : "Mostrar"} Pistas
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Pistas */}
          {showHints && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Pistas para resolver:
              </h4>
              <div className="space-y-2 text-sm text-blue-700">
                <p>
                  • <strong>Para ∂f/∂y:</strong> Trata x y z como constantes, deriva solo respecto a y
                </p>
                <p>
                  • <strong>Para ∂f/∂z:</strong> Trata x e y como constantes, deriva solo respecto a z
                </p>
                <p>
                  • <strong>Recuerda:</strong> La derivada de una constante es 0
                </p>
                <p>
                  • <strong>Regla de la cadena:</strong> Si tienes f(g(y)), deriva f'(g(y)) × g'(y)
                </p>
              </div>
            </div>
          )}

          {/* Campo ∂f/∂y */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-lg font-semibold text-gray-700">Calcula ∂f/∂y:</label>
              <button
                type="button"
                onClick={() => toggleSolution("dy")}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 text-sm transition-colors"
              >
                {showSolution.dy ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showSolution.dy ? "Ocultar" : "Ver"} ayuda
              </button>
            </div>

            {showSolution.dy && (
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                <p className="text-sm text-orange-700">
                  <strong>Ayuda:</strong> Identifica qué términos contienen 'y' y aplica las reglas de derivación
                  correspondientes.
                </p>
              </div>
            )}

            <math-field
              ref={dyFieldRef}
              virtual-keyboard-mode="manual"
              placeholder="Ingresa ∂f/∂y aquí..."
              class="w-full min-h-[60px] p-4 text-lg rounded-xl border-2 border-yellow-200 focus:outline-none focus:border-yellow-500 shadow-sm bg-yellow-50 transition-all duration-200"
            ></math-field>
          </div>

          {/* Campo ∂f/∂z */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-lg font-semibold text-gray-700">Calcula ∂f/∂z:</label>
              <button
                type="button"
                onClick={() => toggleSolution("dz")}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 text-sm transition-colors"
              >
                {showSolution.dz ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showSolution.dz ? "Ocultar" : "Ver"} ayuda
              </button>
            </div>

            {showSolution.dz && (
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                <p className="text-sm text-orange-700">
                  <strong>Ayuda:</strong> Busca términos que contengan 'z' y deriva cada uno por separado.
                </p>
              </div>
            )}

            <math-field
              ref={dzFieldRef}
              virtual-keyboard-mode="manual"
              placeholder="Ingresa ∂f/∂z aquí..."
              class="w-full min-h-[60px] p-4 text-lg rounded-xl border-2 border-yellow-200 focus:outline-none focus:border-yellow-500 shadow-sm bg-yellow-50 transition-all duration-200"
            ></math-field>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={!dy.trim() && !dz.trim()}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-5 h-5" />
              Verificar Respuestas
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
