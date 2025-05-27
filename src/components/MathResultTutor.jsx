"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, RotateCcw, Brain, Trophy, Target, Lightbulb, BookOpen } from "lucide-react"

export default function MathResultTutor({ resultado, onBack }) {
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (window.MathJax) window.MathJax.typeset()

    // Calcular puntuación
    const correctAnswers = Object.values(resultado.verificacion).filter(Boolean).length
    const totalAnswers = Object.keys(resultado.verificacion).length
    const calculatedScore = Math.round((correctAnswers / totalAnswers) * 100)
    setScore(calculatedScore)

    // Mostrar confetti si el score es alto
    if (calculatedScore >= 80) {
      setShowConfetti(true)
      createConfetti()
    }
  }, [resultado])

  const createConfetti = () => {
    const confettiCount = 100
    const container = document.body
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.style.position = "fixed"
      confetti.style.width = "8px"
      confetti.style.height = "8px"
      confetti.style.zIndex = "1000"
      confetti.style.left = Math.random() * 100 + "vw"
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s"
      confetti.style.animationDelay = Math.random() * 2 + "s"
      confetti.style.animationName = "confetti-fall"
      confetti.style.animationTimingFunction = "linear"
      confetti.style.animationFillMode = "forwards"

      const colors = ["#7b2cbf", "#9d4edd", "#2a9d8f", "#f8961e", "#f9c74f"]
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

      container.appendChild(confetti)

      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti)
        }
      }, 5000)
    }
  }

  const getScoreColor = () => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const getScoreMessage = () => {
    if (score >= 90) return "¡Excelente trabajo! 🎉"
    if (score >= 80) return "¡Muy bien hecho! 👏"
    if (score >= 60) return "Buen intento, puedes mejorar 💪"
    return "Sigue practicando, lo lograrás 📚"
  }

  return (
    <>
      <style>
        {`
          @keyframes confetti-fall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
        `}
      </style>

      <div className="space-y-6">
        {/* Header con puntuación */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Resultados del Tutorial</h2>
                  <p className="text-purple-100">Retroalimentación personalizada de IA</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{score}%</div>
                <div className="text-sm text-purple-200">Puntuación</div>
              </div>
            </div>
          </div>
        </div>

        {/* Puntuación detallada */}
        <div
          className={`bg-white rounded-2xl shadow-xl border-2 overflow-hidden ${getScoreColor().includes("green") ? "border-green-200" : getScoreColor().includes("yellow") ? "border-yellow-200" : "border-red-200"}`}
        >
          <div className={`p-6 ${getScoreColor()}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold">{getScoreMessage()}</h3>
                  <p className="text-sm opacity-80">Tu desempeño en este ejercicio</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {Object.values(resultado.verificacion).filter(Boolean).length}/
                  {Object.keys(resultado.verificacion).length}
                </div>
                <div className="text-sm opacity-80">Respuestas correctas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Función y resultados */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 border-b border-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-blue-700">Función y Derivadas</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-600 mb-2 font-medium">Función:</p>
              <div className="text-lg text-center">
                <span className="font-mono">{`f(x, y, z) = ${resultado.funcion}`}</span>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-600 mb-2 font-medium">Derivada respecto a x (calculada por el tutor):</p>
              <div className="text-lg text-center">
                <span className="font-mono">{`∂f/∂x = ${resultado.dx}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verificación de respuestas */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-700">Verificación de tus Respuestas</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border-2 ${resultado.verificacion.dy ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {resultado.verificacion.dy ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className="font-semibold text-lg">∂f/∂y</span>
                </div>
                <p className={`font-medium ${resultado.verificacion.dy ? "text-green-700" : "text-red-700"}`}>
                  {resultado.verificacion.dy ? "✅ Correcto" : "❌ Incorrecto"}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border-2 ${resultado.verificacion.dz ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {resultado.verificacion.dz ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className="font-semibold text-lg">∂f/∂z</span>
                </div>
                <p className={`font-medium ${resultado.verificacion.dz ? "text-green-700" : "text-red-700"}`}>
                  {resultado.verificacion.dz ? "✅ Correcto" : "❌ Incorrecto"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Retroalimentación de IA */}
        {(resultado.retroalimentacion.dy || resultado.retroalimentacion.dz) && (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-4 border-b border-orange-200">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-orange-700">Explicaciones Detalladas</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {resultado.retroalimentacion.dy && (
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Explicación para ∂f/∂y:
                  </h4>
                  <div className="text-orange-700 whitespace-pre-wrap leading-relaxed">
                    {resultado.retroalimentacion.dy}
                  </div>
                </div>
              )}
              {resultado.retroalimentacion.dz && (
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Explicación para ∂f/∂z:
                  </h4>
                  <div className="text-orange-700 whitespace-pre-wrap leading-relaxed">
                    {resultado.retroalimentacion.dz}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botón para reiniciar */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-purple-600" />
            <p className="text-gray-700 font-medium">¿Quieres practicar con otra función?</p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transition-all duration-200 shadow-lg mx-auto transform hover:-translate-y-1"
          >
            <RotateCcw className="w-4 h-4" />
            Nuevo Tutorial
          </button>
        </div>
      </div>
    </>
  )
}
