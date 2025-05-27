"use client"

import { Users, Lightbulb, Heart, Star, Rocket, Home, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function AboutMe() {  const teamMembers = [
    {
      name: "Flavia Lozada",
      role: "Leader Creative Didaction",
      description: "Mente creative respecto a features y metodos didacticos de ensenanza.",
      skills: ["Python", "HTML"],
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 border-blue-200",
      icon: "💜",
    },
    {
      name: "Carlos Moisés Zambrana",
      role: "Backend Developer",
      description: "Apasionado por la lógica, la estructura y los sistemas escalables.",
      skills: ["Python", "Flask"],
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-50 border-indigo-200",
      icon: "🚀",
    },
    {
      name: "Mateo Andrés Soto",
      role: "Full Stack Developer & IA Integration  ",
      description: "Conectando IA con las tareas basicas del aprendizaje.",
      skills: ["JavaScript","DevOps"],
      color: "from-gray-600 to-indigo-600",
      bgColor: "bg-gray-50 border-gray-200",
      icon: "⚡",
    },  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl shadow-lg border border-gray-200 flex items-center gap-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <Home className="w-4 h-4" />
          <span className="font-medium">Inicio</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Users />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-800" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-blue-600 to-indigo-600 mb-6">
              Sobre Nosotros
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 font-light mb-8 max-w-4xl mx-auto leading-relaxed">
              Un equipo de estudiantes apasionados transformando ideas en soluciones tecnológicas innovadoras
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-blue-200">
                <span className="text-blue-700 font-semibold">🎓 Ingeniería en Sistemas</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-indigo-200">
                <span className="text-indigo-700 font-semibold">🏆 TECNOUPSA 2025</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
                <span className="text-gray-700 font-semibold">💡 Innovación</span>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Rocket className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Nuestra Historia</h2>
              </div>
              <p className="text-blue-100 text-lg">
                Representando con orgullo a nuestra facultad por segundo año consecutivo
              </p>
            </div>

            <div className="p-8 space-y-6">
              <p className="text-lg leading-relaxed text-gray-700">
                Somos un grupo de estudiantes apasionados de{" "}
                <span className="font-semibold text-blue-600">tercer semestre</span> de la carrera de Ingeniería en
                Sistemas, representando con orgullo a nuestra facultad en la{" "}
                <span className="font-bold text-indigo-600">TECNOUPSA</span> por segundo año consecutivo.
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                Nuestro equipo está compuesto por{" "}
                <span className="font-semibold text-gray-600">mentes creativas, curiosas y comprometidas</span> con el
                desarrollo tecnológico. Nos une el deseo de aprender haciendo, enfrentando desafíos reales y aportando
                soluciones innovadoras que impacten positivamente en nuestra comunidad.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Nuestra Misión</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  En este nuevo desafío, presentamos una propuesta que combina{" "}
                  <span className="font-semibold">tecnología, innovación y propósito</span>. Creemos en el poder de la
                  educación digital y en hacer que el aprendizaje sea accesible, interactivo y efectivo para todos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Users className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Conoce al Equipo</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tres mentes brillantes trabajando juntas para crear el futuro de la educación digital
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div
                  className={`bg-white rounded-3xl shadow-2xl border-2 ${member.bgColor} overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4`}
                >
                  {/* Header con gradiente */}
                  <div className={`bg-gradient-to-r ${member.color} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12">{member.icon}</div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-white/90 font-medium">{member.role}</p>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-8">
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">{member.description}</p>

                    {/* Skills */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        Especialidades:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-700 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¡Gracias por Acompañarnos!</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              En esta nueva aventura tecnológica, donde cada línea de código es un paso hacia el futuro de la educación
              digital.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-white font-semibold">🚀 Innovación</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-white font-semibold">💡 Creatividad</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-white font-semibold">🎯 Propósito</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
