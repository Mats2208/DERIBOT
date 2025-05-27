import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GraduationCap, Brain, Target, Award, BookOpen, Lightbulb, Home } from "lucide-react"
import MathInput from "../components/MathInputTutor"
import MathCheckAnswers from "../components/MathCheckAnswers"
import MathResultTutor from "../components/MathResultTutor"

export default function Tutor() {
  const navigate = useNavigate()
  const [fase, setFase] = useState("input")
  const [dataBase, setDataBase] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progreso, setProgreso] = useState(0)

  // Paso 1: Enviar fórmula al backend
  const manejarFormula = async (formula) => {
    try {
      setLoading(true)
      setProgreso(33)

      const res = await fetch("https://deribot.onrender.com/solverTutorInit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formula }),
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }

      const json = await res.json()
      setDataBase({ formula })

      setResultado({
        funcion: json.funcion,
        dx: json.dx,
        dy: json.dy,
        dz: json.dz,
        verificacion: { dy: false, dz: false },
        retroalimentacion: {}
      })

      setFase("check")
      setProgreso(66)
    } catch (error) {
      console.error("❌ Error enviando fórmula:", error.message)
      // Aquí podrías mostrar un toast o modal de error
    } finally {
      setLoading(false)
    }
  }

  // Paso 2: Enviar respuestas del usuario
  const manejarVerificacion = async (dy, dz) => {
    try {
      setLoading(true)

      const res = await fetch("https://deribot.onrender.com/solverTutorCheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formula: dataBase.formula,
          dy,
          dz,
        }),
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }

      const json = await res.json()
      setResultado(prev => ({
        ...prev,
        verificacion: json.verificacion,
        retroalimentacion: json.retroalimentacion
      }))
      setFase("result")
      setProgreso(100)
    } catch (error) {
      console.error("❌ Error verificando respuestas:", error.message)
    } finally {
      setLoading(false)
    }
  }

  const reiniciar = () => {
    setFase("input")
    setDataBase(null)
    setResultado(null)
    setProgreso(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">        {/* Header mejorado */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <GraduationCap className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-500 mb-2">
            Tutor Inteligente de Derivadas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Aprende paso a paso con retroalimentación personalizada de IA
          </p>

          {/* Botón para volver al inicio */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-purple-50 text-purple-700 rounded-xl font-medium transition-all duration-200 shadow-lg border-2 border-purple-200 hover:border-purple-300"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </button>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-600" />
                <span className="text-lg font-semibold text-purple-700">Progreso del Aprendizaje</span>
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                {progreso}% Completado
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progreso}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div
                className={`p-3 rounded-lg transition-all ${fase === "input" ? "bg-purple-100 border-2 border-purple-300" : progreso > 33 ? "bg-green-100" : "bg-gray-100"}`}
              >
                <BookOpen
                  className={`w-5 h-5 mx-auto mb-1 ${fase === "input" ? "text-purple-600" : progreso > 33 ? "text-green-600" : "text-gray-400"}`}
                />
                <p
                  className={`text-sm font-medium ${fase === "input" ? "text-purple-700" : progreso > 33 ? "text-green-700" : "text-gray-500"}`}
                >
                  Ingresar Función
                </p>
              </div>
              <div
                className={`p-3 rounded-lg transition-all ${fase === "check" ? "bg-purple-100 border-2 border-purple-300" : progreso > 66 ? "bg-green-100" : "bg-gray-100"}`}
              >
                <Brain
                  className={`w-5 h-5 mx-auto mb-1 ${fase === "check" ? "text-purple-600" : progreso > 66 ? "text-green-600" : "text-gray-400"}`}
                />
                <p
                  className={`text-sm font-medium ${fase === "check" ? "text-purple-700" : progreso > 66 ? "text-green-700" : "text-gray-500"}`}
                >
                  Resolver Ejercicio
                </p>
              </div>
              <div
                className={`p-3 rounded-lg transition-all ${fase === "result" ? "bg-purple-100 border-2 border-purple-300" : progreso === 100 ? "bg-green-100" : "bg-gray-100"}`}
              >
                <Award
                  className={`w-5 h-5 mx-auto mb-1 ${fase === "result" ? "text-purple-600" : progreso === 100 ? "text-green-600" : "text-gray-400"}`}
                />
                <p
                  className={`text-sm font-medium ${fase === "result" ? "text-purple-700" : progreso === 100 ? "text-green-700" : "text-gray-500"}`}
                >
                  Ver Resultados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-purple-700 font-semibold text-xl mb-2">Procesando con IA...</p>
              <p className="text-gray-500 text-sm">Analizando tu función matemática</p>
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <div className="space-y-6">
          {fase === "input" && <MathInput onSubmit={manejarFormula} />}

          {fase === "check" && dataBase && (
            <MathCheckAnswers base={dataBase} resultado={resultado} onSubmit={manejarVerificacion} onBack={reiniciar} />
          )}

          {fase === "result" && resultado && <MathResultTutor resultado={resultado} onBack={reiniciar} />}
        </div>

        {/* Tips educativos */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-700">Tips para el Aprendizaje</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">🎯 Regla de la Cadena</h4>
                <p className="text-sm text-blue-700">
                  Para funciones compuestas, deriva la función externa y multiplica por la derivada de la función
                  interna.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">📐 Derivadas Parciales</h4>
                <p className="text-sm text-green-700">
                  Trata las otras variables como constantes cuando derives respecto a una variable específica.
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">⚡ Reglas Básicas</h4>
                <p className="text-sm text-yellow-700">
                  Recuerda: d/dx(x^n) = n·x^(n-1), d/dx(e^x) = e^x, d/dx(ln(x)) = 1/x
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
