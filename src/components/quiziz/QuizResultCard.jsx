import { Trophy, Star } from "lucide-react"

export default function QuizResultCard({ score, total, percentage, estudiante, docente, materia }) {
  const renderStars = () => {
    const validScore = Math.max(0, Math.min(score || 0, total))
    const starsCount = Math.max(0, Math.min(Math.ceil((validScore / total) * 5), 5))
    const emptyStars = Math.max(0, 5 - starsCount)

    return (
      <div className="flex justify-center mt-2">
        {Array.from({ length: starsCount }, (_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-yellow-400 mx-0.5" />
        ))}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 mx-0.5" />
        ))}
      </div>
    )
  }

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "¡Excelente trabajo!"
    if (percentage >= 80) return "¡Muy bien hecho!"
    if (percentage >= 70) return "¡Buen trabajo!"
    if (percentage >= 60) return "Puedes mejorar"
    return "Sigue practicando"
  }

  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 70) return "text-blue-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }
  return (
    <div className="w-80 h-80 bg-white rounded-t-2xl border-2 border-purple-100 border-b-0 flex flex-col justify-between p-6">      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <Trophy className="w-10 h-10 text-yellow-500 fill-yellow-500" />
        </div>
        <h1 className="text-xl font-bold text-purple-700 mb-1">¡Resultado del Quiz!</h1>
        <p className={`text-sm font-medium ${getPerformanceColor()}`}>{getPerformanceMessage()}</p>
      </div>

      {/* Info del estudiante */}
      <div className="text-center space-y-1">
        <p className="text-xs text-gray-600">
          <span className="font-medium text-gray-800">{estudiante || "Estudiante"}</span>
        </p>
        <p className="text-xs text-gray-600">
          Docente: <span className="font-medium text-gray-800">{docente || "-"}</span>
        </p>
        <p className="text-xs text-gray-600">
          Materia: <span className="font-medium text-gray-800">{materia || "-"}</span>
        </p>
      </div>

      {/* Círculo de progreso */}
      <div className="flex justify-center">
        <div className="w-20 h-20 relative">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset="0"
            />
            <circle
              className="text-purple-600 stroke-current"
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={(1 - percentage / 100) * 251.2}
              style={{
                transition: "stroke-dashoffset 1.5s ease-out",
                filter: "drop-shadow(0 0 6px rgba(147, 51, 234, 0.3))",
              }}
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="text-lg font-bold text-purple-700">{percentage}%</div>
          </div>
        </div>
      </div>

      {/* Puntuación y estrellas */}
      <div className="text-center mb-2">
        <div className="text-sm font-medium text-gray-700 mb-2">
          <span className="text-purple-700 font-bold">{score}</span> de{" "}
          <span className="text-purple-700 font-bold">{total}</span> correctas
        </div>
        {renderStars()}
      </div>
    </div>
  )
}
