"use client"

import { useNavigate } from "react-router-dom"
import { Calculator, Brain, Rocket, Trophy, Baby , Play, Bot, Sparkles, ShieldUser , Users } from 'lucide-react'
import Header from "../components/Header"
import Footer from "../components/Footer"

const Card = ({ title, description, icon, type, onClick }) => {
  const colors = {
    simple: {
      icon: "text-purple-700",
      border: "border-purple-200 hover:border-purple-400",
      gradient: "from-purple-50 to-purple-100",
      button: "bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600",
    },
    medium: {
      icon: "text-teal-600",
      border: "border-teal-200 hover:border-teal-400",
      gradient: "from-teal-50 to-teal-100",
      button: "bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600",
    },
    complex: {
      icon: "text-orange-500",
      border: "border-orange-200 hover:border-orange-400",
      gradient: "from-orange-50 to-yellow-50",
      button: "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600",
    },
    leaderboard: {
      icon: "text-yellow-600",
      border: "border-yellow-200 hover:border-yellow-400",
      gradient: "from-yellow-50 to-yellow-100",
      button: "bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600",
    },
    scanner: {
      icon: "text-blue-600",
      border: "border-blue-200 hover:border-blue-400",
      gradient: "from-blue-50 to-blue-100",
      button: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
    },
      Tutor: {
      icon: "text-green-600",
      border: "border-green-200 hover:border-green-400",
      gradient: "from-green-50 to-green-100",
      button: "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600",
    },
  }

  return (
    <div
      onClick={onClick}
      className={`relative bg-gradient-to-br ${colors[type].gradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer 
                  p-8 text-center flex flex-col border-2 ${colors[type].border} hover:-translate-y-2 group overflow-hidden`}
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>

      <div className={`text-5xl mb-6 ${colors[type].icon} transform group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">{title}</h2>
      <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{description}</p>
      <button
        className={`py-3 px-8 rounded-xl font-semibold text-white uppercase tracking-wide text-sm flex items-center justify-center gap-3 mx-auto transition-all duration-300 shadow-lg transform group-hover:scale-105 ${colors[type].button}`}
      >
        <Play className="w-4 h-4" />
        Comenzar
      </button>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-indigo-100">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center text-white text-5xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Bot />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 mb-6 animate-pulse">
              DerivaBot
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
              Domina las derivadas matemáticas con nuestro sistema interactivo de aprendizaje potenciado por IA
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  <span className="text-lg font-bold text-purple-700">Ejercicios</span>
                </div>
                <p className="text-gray-600 text-sm">Múltiples niveles</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="text-lg font-bold text-purple-700">IA Explicativa</span>
                </div>
                <p className="text-gray-600 text-sm">Paso a paso</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <span className="text-lg font-bold text-purple-700">Ranking</span>
                </div>
                <p className="text-gray-600 text-sm">Compite y mejora</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-16 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Elige tu Nivel de Desafío</h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Desde conceptos básicos hasta problemas avanzados, tenemos el contenido perfecto para tu nivel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card
                title="Derivadas Simples"
                description="Practica con derivadas básicas perfectas para empezar tu camino en el cálculo diferencial. Ideal para principiantes."
                icon={<Baby />}
                type="simple"
                onClick={() => navigate("/quiziz/facil")}
              />
              <Card
                title="Derivadas Medias"
                description="Desafíos intermedios con reglas de producto, cociente y cadena para consolidar tus conocimientos matemáticos."
                icon={<Brain />}
                type="medium"
                onClick={() => navigate("/quiziz/medio")}
              />
              <Card
                title="Derivadas Complejas"
                description="Problemas avanzados con funciones compuestas, trigonométricas inversas y logarítmicas para expertos."
                icon={<Rocket />}
                type="complex"
                onClick={() => navigate("/quiziz/pro")}
              />
              <Card
                title="Clasificación Global"
                description="Consulta los mejores puntajes y compite con otros jugadores de todo el mundo en tiempo real."
                icon={<Trophy />}
                type="leaderboard"
                onClick={() => navigate("/ranking")}
              />
              <Card
                title="Solver Inteligente"
                description="Resuelve derivadas paso a paso con IA avanzada. Esta te explicara el ejercicio paso a paso para tu mejor entendimiento."
                icon={<Calculator />}
                type="scanner"
                onClick={() => navigate("/solver")}
              />
              <Card
                title="Tutor IA"
                description="Resuelve y practica junto a nuestro IA tutor de ultima tecnologia."
                icon={<ShieldUser  />}
                type="Tutor"
                onClick={() => navigate("/Tutor")}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
