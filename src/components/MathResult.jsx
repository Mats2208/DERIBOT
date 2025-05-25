"use client"

import { useEffect } from "react"
import { AlertCircle, Brain, ActivityIcon as Function, ArrowLeft, RotateCcw } from "lucide-react"

const MathResult = ({ resultado, onBack }) => {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset()
    }
  }, [resultado])

  if (!resultado || resultado.error) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        {/* Botón de regreso para errores */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a ingresar función
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-400 p-4 text-white">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Error en el cálculo</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">{resultado?.error || "No se pudo cargar el resultado."}</p>
            <button
              onClick={onBack}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    )
  }

  const { funcion, dx, dy, dz, pasos, explicacion_ia } = resultado

  return (
    <div className="max-w-7xl mx-auto mt-8">
      {/* Botón de regreso */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-300 rounded-xl font-semibold text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 shadow-lg transform hover:-translate-y-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Nueva derivada
        </button>

        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
          ✨ Resultado calculado exitosamente
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal - Resultados */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-white">
              <div className="flex items-center gap-3">
                <Function className="w-8 h-8" />
                <h1 className="text-2xl font-bold">Resultado de Derivadas</h1>
              </div>
            </div>
          </div>

          {/* Función original */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 border-b border-purple-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-purple-700">Función original</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-xl math-display text-center">{"$$ f(x,y,z) = " + funcion + " $$"}</div>
              </div>
            </div>
          </div>

          {/* Derivadas parciales */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-teal-100 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-100 to-teal-50 p-4 border-b border-teal-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-teal-700">Derivadas parciales</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-teal-50 rounded-xl p-4">
                <div className="math-display text-center">{"$$ \\frac{\\partial f}{\\partial x} = " + dx + " $$"}</div>
              </div>
              <div className="bg-teal-50 rounded-xl p-4">
                <div className="math-display text-center">{"$$ \\frac{\\partial f}{\\partial y} = " + dy + " $$"}</div>
              </div>
              <div className="bg-teal-50 rounded-xl p-4">
                <div className="math-display text-center">{"$$ \\frac{\\partial f}{\\partial z} = " + dz + " $$"}</div>
              </div>
            </div>
          </div>

          {/* Pasos para cada variable */}
          {["x", "y", "z"].map((v, index) =>
            pasos?.[v]?.length ? (
              <div key={v} className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-4 border-b border-yellow-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-yellow-700">Pasos para ∂f/∂{v}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {pasos[v].map((paso, i) => (
                      <div key={i} className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 mb-2">{paso.descripcion}</p>
                            <div className="bg-white rounded-lg p-3 border">
                              <div className="math-display text-center">{"$$ " + paso.resultado + " $$"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null,
          )}

          {/* Botón adicional para nueva derivada al final */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-6 text-center">
            <p className="text-gray-600 mb-4">¿Quieres calcular otra derivada?</p>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transition-all duration-200 shadow-lg mx-auto transform hover:-translate-y-1"
            >
              <RotateCcw className="w-4 h-4" />
              Calcular nueva derivada
            </button>
          </div>
        </div>

        {/* Sidebar - Explicación de la IA */}
        {explicacion_ia && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-blue-700">Explicación de la IA</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{explicacion_ia}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MathResult
