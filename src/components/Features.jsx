const features = [
  {
    title: "Aprende jugando",
    description: "Refuerza tus conocimientos en cálculo con juegos de adivinanza.",
  },
  {
    title: "IA que explica",
    description: "Te guiamos paso a paso para entender derivadas con ayuda de la inteligencia artificial.",
  },
  {
    title: "Herramientas modernas",
    description: "Diseñado como una SPA rápida y responsiva usando React y Tailwind.",
  },
]

const Features = () => {
  return (
    <section className="py-16 px-6 bg-white text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-10">¿Por qué usar Deribot?</h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((feat, i) => (
          <div key={i} className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
            <p>{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
