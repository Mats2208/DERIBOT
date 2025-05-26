"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  RotateCcw,
  Brain,
  ActivityIcon as Function,
  Calculator,
  Lightbulb,
  AlertCircle,
  Loader2,
  ChevronRight,
  ChevronDown,
} from "lucide-react"

const MathResult = ({ resultado, onBack }) => {
  const [mathJaxLoaded, setMathJaxLoaded] = useState(false)
  const [expandedSteps, setExpandedSteps] = useState({})
  const [expandedOrders, setExpandedOrders] = useState({})

  useEffect(() => {
    // Configurar MathJax
    if (!window.MathJax) {
      window.MathJax = {
        tex: {
          inlineMath: [
            ["$", "$"],
            ["$$", "$$"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
          processEscapes: true,
          processEnvironments: true,
          packages: { "[+]": ["ams", "newcommand", "configmacros"] },
        },
        options: {
          skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
          ignoreHtmlClass: "tex2jax_ignore",
          processHtmlClass: "tex2jax_process",
        },
        startup: {
          ready: () => {
            window.MathJax.startup.defaultReady()
            setMathJaxLoaded(true)
            console.log("✅ MathJax cargado correctamente")
          },
        },
      }

      // Cargar MathJax
      const script = document.createElement("script")
      script.id = "MathJax-script"
      script.async = true
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      script.onerror = () => {
        console.error("❌ Error cargando MathJax")
        setMathJaxLoaded(false)
      }
      document.head.appendChild(script)
    } else {
      setMathJaxLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (mathJaxLoaded && resultado && !resultado.error && window.MathJax?.typesetPromise) {
      const timer = setTimeout(() => {
        window.MathJax.typesetPromise()
          .then(() => {
            console.log("✅ Fórmulas renderizadas correctamente")
          })
          .catch((err) => {
            console.error("❌ Error renderizando fórmulas:", err)
          })
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [mathJaxLoaded, resultado])

  // Componente para renderizar LaTeX con fallback
  const LaTeXDisplay = ({ children, inline = false, fallback = null }) => {
    const ref = useRef(null)
    const [isRendering, setIsRendering] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
      if (!ref.current || !mathJaxLoaded || !children) return

      const renderMath = async () => {
        try {
          setIsRendering(true)
          setHasError(false)

          if (window.MathJax?.typesetPromise) {
            await window.MathJax.typesetPromise([ref.current])
            setIsRendering(false)
          }
        } catch (err) {
          console.error("Error renderizando LaTeX:", err)
          setHasError(true)
          setIsRendering(false)
        }
      }

      const timer = setTimeout(renderMath, 100)
      return () => clearTimeout(timer)
    }, [children, mathJaxLoaded])

    if (!mathJaxLoaded) {
      return (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span className="text-sm text-gray-500">Cargando renderizador...</span>
        </div>
      )
    }

    if (hasError && fallback) {
      return <div className="bg-gray-100 p-3 rounded border text-sm font-mono text-gray-700">{fallback}</div>
    }

    const delimiter = inline ? "$" : "$$"
    const cleanedChildren = String(children).trim()

    return (
      <div
        ref={ref}
        className={`${inline ? "inline" : "block text-center"} ${isRendering ? "opacity-50" : "opacity-100"} transition-opacity`}
      >
        {delimiter}
        {cleanedChildren}
        {delimiter}
      </div>
    )
  }

  // Componente para formatear texto con fórmulas LaTeX incrustadas
  const FormattedText = ({ text }) => {
    if (!text) return null

    // Regex para detectar fórmulas LaTeX inline ($...$) y display ($$...$$)
    const latexRegex = /(\$\$[\s\S]*?\$\$|\$[^$\n]*?\$)/g
    const parts = text.split(latexRegex)

    return (
      <div className="space-y-2">
        {parts.map((part, index) => {
          // Si es una fórmula LaTeX
          if (part.match(latexRegex)) {
            const isDisplayMath = part.startsWith("$$") && part.endsWith("$$")
            const mathContent = isDisplayMath ? part.slice(2, -2).trim() : part.slice(1, -1).trim()

            return (
              <div key={index} className={isDisplayMath ? "my-4" : "inline"}>
                <LaTeXDisplay inline={!isDisplayMath} fallback={part}>
                  {mathContent}
                </LaTeXDisplay>
              </div>
            )
          }
          // Si es texto normal
          else if (part.trim()) {
            return (
              <span key={index} className="whitespace-pre-wrap">
                {part}
              </span>
            )
          }
          return null
        })}
      </div>
    )
  }

  // Función para obtener el color del paso según su tipo
  const getStepColor = (tipo) => {
    const colors = {
      original: "bg-blue-50 border-blue-200",
      descomposicion: "bg-green-50 border-green-200",
      termino: "bg-yellow-50 border-yellow-200",
      combinacion: "bg-purple-50 border-purple-200",
      final: "bg-teal-50 border-teal-200",
      directo: "bg-orange-50 border-orange-200",
      constante: "bg-gray-50 border-gray-200",
    }
    return colors[tipo] || "bg-gray-50 border-gray-200"
  }

  // Función para obtener el icono del paso
  const getStepIcon = (tipo) => {
    switch (tipo) {
      case "original":
        return "📝"
      case "descomposicion":
        return "🔍"
      case "termino":
        return "⚡"
      case "combinacion":
        return "🔗"
      case "final":
        return "✅"
      case "directo":
        return "🎯"
      case "constante":
        return "📌"
      default:
        return "📋"
    }
  }

  // Función para obtener el color según el orden de derivada
  const getOrderColor = (orden) => {
    const colors = {
      1: "border-teal-100 bg-teal-50",
      2: "border-blue-100 bg-blue-50",
      3: "border-purple-100 bg-purple-50",
      4: "border-pink-100 bg-pink-50",
    }
    return colors[orden] || "border-gray-100 bg-gray-50"
  }

  const toggleSteps = (variable) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [variable]: !prev[variable],
    }))
  }

  const toggleOrder = (orden) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orden]: !prev[orden],
    }))
  }

  if (!resultado || resultado.error) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
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
          <div className="bg-gradient-to-r from-red-500 to-red-400 p-6 text-white">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Error en el cálculo</h2>
                <p className="text-red-100 text-sm">No se pudo procesar la función matemática</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4 text-lg">
              {resultado?.error || "No se pudo resolver la expresión matemática."}
            </p>
            {resultado?.details && (
              <p className="text-gray-600 mb-6 text-sm bg-gray-50 p-3 rounded">{resultado.details}</p>
            )}
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-1"
            >
              <RotateCcw className="w-4 h-4" />
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    )
  }

  const { funcion, dx, dy, dz, pasos, derivadas_superiores, explicacion_ia } = resultado

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Botón de regreso */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-300 rounded-xl font-semibold text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 shadow-lg transform hover:-translate-y-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Nueva derivada
        </button>

        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-green-500" />
          Cálculo completado exitosamente
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
                <div>
                  <h2 className="text-2xl font-bold">Resultado de Derivadas Parciales</h2>
                  <p className="text-purple-100 text-sm">Cálculo automático paso a paso</p>
                </div>
              </div>
            </div>
          </div>

          {/* Función original */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 border-b border-purple-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-purple-700">Función Original</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <LaTeXDisplay fallback={`f(x,y,z) = ${funcion}`}>f(x,y,z) = {funcion}</LaTeXDisplay>
              </div>
            </div>
          </div>

          {/* Derivadas parciales de primer orden */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-teal-100 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-100 to-teal-50 p-4 border-b border-teal-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-teal-700">Derivadas Parciales de Primer Orden</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                <LaTeXDisplay fallback={`∂f/∂x = ${dx}`}>{`\\frac{\\partial f}{\\partial x} = ${dx}`}</LaTeXDisplay>
              </div>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                <LaTeXDisplay fallback={`∂f/∂y = ${dy}`}>{`\\frac{\\partial f}{\\partial y} = ${dy}`}</LaTeXDisplay>
              </div>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                <LaTeXDisplay fallback={`∂f/∂z = ${dz}`}>{`\\frac{\\partial f}{\\partial z} = ${dz}`}</LaTeXDisplay>
              </div>
            </div>
          </div>

          {/* Derivadas de orden superior */}
          {derivadas_superiores &&
            Object.keys(derivadas_superiores).length > 0 &&
            Object.entries(derivadas_superiores).map(([orden, derivadas]) => (
              <div
                key={orden}
                className={`bg-white rounded-2xl shadow-xl border-2 ${getOrderColor(Number.parseInt(orden))} overflow-hidden`}
              >
                <div className={`bg-gradient-to-r p-4 border-b ${getOrderColor(Number.parseInt(orden))}`}>
                  <button
                    onClick={() => toggleOrder(orden)}
                    className="w-full flex items-center justify-between text-left hover:bg-opacity-80 rounded-lg p-2 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${Number.parseInt(orden) === 2 ? "bg-blue-500" : Number.parseInt(orden) === 3 ? "bg-purple-500" : "bg-pink-500"}`}
                      ></div>
                      <h3
                        className={`text-lg font-semibold ${Number.parseInt(orden) === 2 ? "text-blue-700" : Number.parseInt(orden) === 3 ? "text-purple-700" : "text-pink-700"}`}
                      >
                        Derivadas de Orden {orden}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium text-white ${Number.parseInt(orden) === 2 ? "bg-blue-500" : Number.parseInt(orden) === 3 ? "bg-purple-500" : "bg-pink-500"}`}
                      >
                        {derivadas.length} derivadas
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${expandedOrders[orden] ? "rotate-180" : ""} ${Number.parseInt(orden) === 2 ? "text-blue-600" : Number.parseInt(orden) === 3 ? "text-purple-600" : "text-pink-600"}`}
                    />
                  </button>
                </div>

                {expandedOrders[orden] && (
                  <div className="p-6">
                    <div className="grid gap-4">
                      {derivadas.map((derivada, i) => (
                        <div key={i} className={`rounded-xl p-4 border-2 ${getOrderColor(Number.parseInt(orden))}`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${Number.parseInt(orden) === 2 ? "bg-blue-500" : Number.parseInt(orden) === 3 ? "bg-purple-500" : "bg-pink-500"}`}
                            >
                              {i + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{derivada.descripcion}</h4>
                              <p className="text-sm text-gray-600">{derivada.notacion}</p>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                            <LaTeXDisplay fallback={derivada.resultado}>{derivada.resultado}</LaTeXDisplay>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

          {/* Pasos detallados para primer orden */}
          {["x", "y", "z"].map((variable) =>
            pasos?.[variable]?.length > 0 ? (
              <div key={variable} className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-4 border-b border-yellow-200">
                  <button
                    onClick={() => toggleSteps(variable)}
                    className="w-full flex items-center justify-between text-left hover:bg-yellow-200 rounded-lg p-2 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-yellow-700">Pasos detallados para ∂f/∂{variable}</h3>
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {pasos[variable].length} pasos
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-yellow-600 transition-transform ${
                        expandedSteps[variable] ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>

                {expandedSteps[variable] && (
                  <div className="p-6">
                    <div className="space-y-4">
                      {pasos[variable].map((paso, i) => (
                        <div key={i} className={`rounded-xl p-4 border-2 ${getStepColor(paso.tipo)}`}>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                              {getStepIcon(paso.tipo)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-gray-800">{paso.descripcion}</h4>
                                {paso.regla && (
                                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                    {paso.regla}
                                  </span>
                                )}
                              </div>

                              {paso.expresion && paso.expresion !== paso.resultado && (
                                <div className="bg-white rounded-lg p-3 border border-gray-300 mb-3">
                                  <div className="text-sm text-gray-600 mb-1">Expresión:</div>
                                  <LaTeXDisplay fallback={paso.expresion}>{paso.expresion}</LaTeXDisplay>
                                </div>
                              )}

                              <div className="bg-white rounded-lg p-3 border-2 border-yellow-400">
                                <div className="text-sm text-gray-600 mb-1">Resultado:</div>
                                <LaTeXDisplay fallback={paso.resultado}>{paso.resultado}</LaTeXDisplay>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null,
          )}

          {/* Botón para nueva derivada */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-purple-600" />
              <p className="text-gray-700 font-medium">¿Quieres calcular otra derivada?</p>
            </div>
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
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700">Explicación de la IA</h3>
                    <p className="text-blue-600 text-xs">Análisis detallado del proceso</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm leading-relaxed text-gray-700 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <FormattedText text={explicacion_ia} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MathResult
