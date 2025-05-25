import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenido a Deribot</h1>
      <p className="text-lg md:text-xl mb-6">Una plataforma para aprender y resolver derivadas con ayuda de IA</p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link to="/quiziz" className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-xl shadow hover:bg-gray-100">
          Jugar Quiziz
        </Link>
        <Link to="/solver" className="bg-white text-purple-600 font-semibold px-6 py-2 rounded-xl shadow hover:bg-gray-100">
          Usar Calculadora
        </Link>
      </div>
    </section>
  )
}

export default Hero
