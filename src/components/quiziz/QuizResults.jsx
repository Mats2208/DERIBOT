"use client"

import { useEffect, useState } from "react"
import { RotateCcw, ArrowLeft, Share, Trophy, Users } from "lucide-react"
import html2canvas from "html2canvas"
import QuizResultCard from "./QuizResultCard"

export default function QuizResults({ quiz, score, onRestart, onBack }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [showRankingModal, setShowRankingModal] = useState(false)
  const [formData, setFormData] = useState({ estudiante: "", docente: "", materia: "" })
  const [rankings, setRankings] = useState([])
  const PROXY_URL = `${import.meta.env.VITE_API_URL}/proxy/gas`;


  const [isValidQuiz, setIsValidQuiz] = useState(true)

  useEffect(() => {
    setIsValidQuiz(!!quiz && Array.isArray(quiz.questions) && quiz.questions.length > 0)
  }, [quiz])

  useEffect(() => {
    if (!quiz || !quiz.questions) return

    const total = quiz.questions.length
    if (total === 0) return

    const rawPercentage = score / total
    if (rawPercentage >= 0.7) {
      setShowConfetti(true)
      createConfetti()
    }

    const timer = setTimeout(() => {
      setPercentage(Math.round(rawPercentage * 100))
    }, 500)

    return () => clearTimeout(timer)
  }, [score, quiz])

  useEffect(() => {
    fetchRankingFromGoogle(); // 👈 ESTE es el que faltaba
  }, []);

  const createConfetti = () => {
    const confettiCount = 150
    const container = document.body
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.style.position = "fixed"
      confetti.style.width = "10px"
      confetti.style.height = "10px"
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

  const exportResultAsImage = () => {
    const resultElement = document.getElementById("result-capture")
    if (!resultElement) return

    html2canvas(resultElement, {
      backgroundColor: "#ffffff",
      scale: 2,
      width: 320,
      height: 320,
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a")
      link.download = `resultado_${formData.estudiante || "quiz"}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    })
  }
    const fetchRankingFromGoogle = async () => {
      try {
        const response = await fetch(PROXY_URL);
        const data = await response.json();
        const cleaned = data.map((item, i) => ({
          id: i,
          estudiante: item.ESTUDIANTE,
          docente: item.DOCENTE,
          materia: item.MATERIA,
          score: parseInt(item.SCORE),
          total: parseInt(item.TOTAL),
          percentage: parseFloat(item.PORCENTAJE),
          quizTitle: item.QUIZTITLE,
          date: new Date(item.TIMESTAMP).toLocaleString(),
        }));
        setRankings(cleaned.sort((a, b) => b.percentage - a.percentage));
      } catch (error) {
        console.error("Error al obtener ranking:", error);
      }
    };

  const saveToRanking = async () => {
    if (!formData.estudiante.trim()) {
      alert("Por favor ingresa el nombre del estudiante");
      return;
    }

    const entry = {
      estudiante: formData.estudiante,
      docente: formData.docente,
      materia: formData.materia,
      score,
      total: quiz.questions.length,
      percentage,
      quizTitle: quiz.title || "Quiz",
    };

    try {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json",
      },
    });

      if (response.ok) {
        setShowRankingModal(false);
        fetchRankingFromGoogle();
      } else {
        alert("Error al guardar en el ranking.");
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un error al conectar con el servidor de ranking.");
    }
  };

  const pctClamped = Math.max(0, Math.min(percentage, 100))

  if (!isValidQuiz) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">Error: El quiz no contiene preguntas válidas.</div>
    )
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

      {/* Modal para datos del resultado */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Datos del resultado</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre del estudiante"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                value={formData.estudiante}
                onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nombre del docente"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                value={formData.docente}
                onChange={(e) => setFormData({ ...formData, docente: e.target.value })}
              />
              <input
                type="text"
                placeholder="Materia"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                value={formData.materia}
                onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="text-gray-600 px-4 py-2 hover:underline">
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowModal(false)
                  setTimeout(() => exportResultAsImage(), 100)
                }}
                className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Generar imagen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ranking */}
      {showRankingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-700 flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6" />
              Guardar en Ranking
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre del estudiante *"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                value={formData.estudiante}
                onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Nombre del docente"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                value={formData.docente}
                onChange={(e) => setFormData({ ...formData, docente: e.target.value })}
              />
              <input
                type="text"
                placeholder="Materia"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                value={formData.materia}
                onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
              />
            </div>
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">
                <strong>Puntuación:</strong> {score}/{quiz.questions.length} ({percentage}%)
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowRankingModal(false)} className="text-gray-600 px-4 py-2 hover:underline">
                Cancelar
              </button>
              <button
                onClick={saveToRanking}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenedor principal integrado */}
      <div className="flex justify-center">
        <div className="w-80 bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
          {/* Resultado principal - solo para captura */}
          <div id="result-capture" className="w-80 h-80 bg-white">
            <QuizResultCard
              score={score}
              total={quiz.questions.length}
              percentage={pctClamped}
              estudiante={formData.estudiante}
              docente={formData.docente}
              materia={formData.materia}
            />
          </div>

          {/* Botones integrados */}
          <div className="p-4 bg-white border-t border-purple-100">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={onRestart}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-600 transition-all duration-200 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Repetir
              </button>

              <button
                onClick={onBack}
                className="flex items-center justify-center gap-2 px-3 py-2 border-2 border-gray-300 rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-lg font-medium hover:from-teal-600 hover:to-teal-500 transition-all duration-200 text-sm"
              >
                <Share className="w-4 h-4" />
                Compartir
              </button>

              <button
                onClick={() => setShowRankingModal(true)}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-500 transition-all duration-200 text-sm"
              >
                <Users className="w-4 h-4" />
                Ranking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar ranking si hay datos */}
      {rankings.length > 0 && (
        <div className="mt-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-4 text-purple-700 flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" />
            Top Rankings
          </h3>
          <div className="bg-white rounded-xl shadow-lg p-4">
            {rankings.slice(0, 5).map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                          ? "bg-gray-400"
                          : index === 2
                            ? "bg-orange-500"
                            : "bg-purple-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{entry.estudiante}</p>
                    <p className="text-sm text-gray-600">
                      {entry.materia} - {entry.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-700">{entry.percentage}%</p>
                  <p className="text-sm text-gray-600">
                    {entry.score}/{entry.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
