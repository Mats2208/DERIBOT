import { Link } from "react-router-dom"

const CallToAction = () => {
  return (
    <section className="py-16 px-6 bg-indigo-50 text-center">
      <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
      <p className="text-lg mb-6">Ya sea para estudiar o practicar, Deribot está aquí para ayudarte.</p>
      <Link to="/solver" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">
        Probar la calculadora
      </Link>
    </section>
  )
}

export default CallToAction
