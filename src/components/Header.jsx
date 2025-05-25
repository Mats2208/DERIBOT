"use client"

import { Bot, Menu, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-lg border-b-2 border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-500">
                DERIBOT
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Sistema de Aprendizaje</p>
            </div>
          </div>          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate("/")}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Inicio
            </button>
            <button 
              onClick={() => navigate("/quiziz/facil")}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Quizzes
            </button>
            <button 
              onClick={() => navigate("/ranking")}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Ranking
            </button>
            <button 
              onClick={() => navigate("/solver")}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Solver
            </button>
          </nav>          {/* CTA Button Desktop */}
          <div className="hidden md:flex">
            <button 
              onClick={() => navigate("/solver")}
              className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transition-all duration-200 shadow-lg transform hover:-translate-y-1"
            >
              Comenzar Ahora
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors text-left"
              >
                Inicio
              </button>
              <button 
                onClick={() => navigate("/quiziz/facil")}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors text-left"
              >
                Quizzes
              </button>
              <button 
                onClick={() => navigate("/ranking")}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors text-left"
              >
                Ranking
              </button>
              <button 
                onClick={() => navigate("/solver")}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transition-all duration-200 shadow-lg w-full"
              >
                Solver
              </button>
              <button 
                onClick={() => navigate("/solver")}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transition-all duration-200 shadow-lg w-full"
              >
                Comenzar Ahora
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
