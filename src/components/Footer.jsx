"use client"

import { Bot, Heart, Github, Twitter, Mail, BookOpen, Calculator, Trophy } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
                  DERIBOT
                </h3>
                <p className="text-sm text-gray-400">Sistema de Aprendizaje</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Domina las derivadas matemáticas con nuestro sistema interactivo de aprendizaje. Practica, aprende y
              mejora tus habilidades en cálculo diferencial.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-300">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Quizzes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Solver
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Ranking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 DERIBOT - TECNOUPSA. Todos los derechos reservados.</p>
            <p className="text-gray-400 text-sm flex items-center gap-1 mt-2 md:mt-0">
              Hecho con <Heart className="w-4 h-4 text-red-500" /> para estudiantes a partir de otros estudiantes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
