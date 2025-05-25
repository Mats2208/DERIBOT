"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Trophy, Calendar, BookOpen, Medal, Crown, Award, Home } from "lucide-react"
import quizzes from "../data/quizzes"

export default function RankingPage() {
  const navigate = useNavigate()
  const [rankings, setRankings] = useState([])
  const [filteredRankings, setFilteredRankings] = useState([])
  const [selectedNivel, setSelectedNivel] = useState("")

  // LÓGICA ORIGINAL SIN CAMBIOS
  const nivelesSet = new Set()

  Object.values(quizzes).forEach((grupo) => {
    grupo.forEach((q) => nivelesSet.add(q.title))
  })

  const NIVELES = Array.from(nivelesSet)

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbwC08xe9FjuHrxQ8-AHOouT8Q5kLUM1f226unvLo9gkJNfywJg7Oy6fuzspGXB5cq9rVQ/exec"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(GAS_URL)
        const data = await res.json()

        const cleaned = data.map((item, i) => ({
          id: i,
          estudiante: item.ESTUDIANTE,
          docente: item.DOCENTE,
          materia: item.MATERIA,
          score: Number.parseInt(item.SCORE),
          total: Number.parseInt(item.TOTAL),
          percentage: Number.parseFloat(item.PORCENTAJE),
          quizTitle: item.QUIZTITLE,
          date: new Date(item.TIMESTAMP).toLocaleString(),
        }))

        setRankings(cleaned)
      } catch (err) {
        console.error("Error al obtener datos del ranking:", err)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!selectedNivel) {
      setFilteredRankings([])
      return
    }

    const filtered = rankings
      .filter((entry) => entry.quizTitle === selectedNivel)
      .sort((a, b) => b.percentage - a.percentage)

    setFilteredRankings(filtered)
  }, [selectedNivel, rankings])

  // FUNCIONES SOLO PARA UI
  const getRankIcon = (position) => {
    switch (position) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 2:
        return <Award className="w-6 h-6 text-orange-500" />
      default:
        return <Trophy className="w-5 h-5 text-purple-500" />
    }
  }

  const getRankBadge = (position) => {
    const badges = {
      0: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white",
      1: "bg-gradient-to-r from-gray-300 to-gray-400 text-white",
      2: "bg-gradient-to-r from-orange-400 to-orange-500 text-white",
    }
    return badges[position] || "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
  }

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return "text-green-600 bg-green-50"
    if (percentage >= 80) return "text-blue-600 bg-blue-50"
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header mejorado */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Ranking por Nivel</h1>
                <p className="text-purple-100">Descubre los mejores resultados por categoría</p>
              </div>
            </div>
          </div>

          {/* Botón para volver al inicio */}
          <div className="px-8 pt-4 pb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition-all duration-200 text-sm border border-purple-200 hover:border-purple-300"
            >
              <Home className="w-4 h-4" />
              Volver al inicio
            </button>
          </div>
        </div>

        {/* Selector de nivel mejorado */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-purple-700">Seleccionar Nivel</h2>
          </div>

          <select
            className="w-full p-4 border-2 border-purple-200 rounded-xl text-lg focus:outline-none focus:border-purple-500 bg-purple-50 transition-all duration-200"
            value={selectedNivel}
            onChange={(e) => setSelectedNivel(e.target.value)}
          >
            <option value="">Selecciona un nivel</option>
            {NIVELES.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </div>

        {/* Contenido condicional mejorado */}
        {filteredRankings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {selectedNivel ? "No hay resultados" : "Selecciona un nivel"}
            </h3>
            <p className="text-gray-500">
              {selectedNivel
                ? `Aún no hay participantes para "${selectedNivel}"`
                : "Elige un nivel del menú desplegable para ver los rankings"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-6 border-b border-purple-200">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-purple-700">Ranking: {selectedNivel}</h2>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {filteredRankings.length} participantes
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredRankings.map((entry, i) => (
                <div key={entry.id} className="p-6 hover:bg-purple-50 transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Posición y medalla */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getRankBadge(i)}`}
                        >
                          {i + 1}
                        </div>
                        {getRankIcon(i)}
                      </div>

                      {/* Información del estudiante */}
                      <div>
                        <p className="font-semibold text-gray-800 text-lg group-hover:text-purple-700 transition-colors">
                          {entry.estudiante}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {entry.materia}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {entry.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Puntuación */}
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getPerformanceColor(entry.percentage)}`}
                      >
                        {entry.percentage}%
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {entry.score}/{entry.total}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
