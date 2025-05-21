import { useEffect, useRef } from "react"

const MathInput = ({ onSubmit }) => {
  const mathFieldRef = useRef(null)

  useEffect(() => {
    import("https://unpkg.com/mathlive").then(() => {
      if (mathFieldRef.current) {
        mathFieldRef.current.setValue("x^{2}y + \\sin{(xz)}")
      }
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const latex = mathFieldRef.current.getValue("latex")
    onSubmit(latex)
  }

  const setExample = (latex) => {
    if (mathFieldRef.current) {
      mathFieldRef.current.setValue(latex)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Ingresa tu función
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Usa variables <code>x</code>, <code>y</code> y <code>z</code> para calcular derivadas parciales.
      </p>

      {/* Mathlive Field */}
      <div className="relative mb-6">
        <math-field
          ref={mathFieldRef}
          virtual-keyboard-mode="manual"
          class="w-full min-h-[60px] p-4 text-lg rounded-xl border-2 border-indigo-100 focus:outline-none focus:border-indigo-500 shadow-sm"
        ></math-field>
      </div>

      {/* Botones de ejemplo */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 font-medium mb-2">Ejemplos rápidos:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "x²y + sin(xz)", latex: "x^{2}y + \\sin{(xz)}" },
            { label: "ln(xy) + z³", latex: "\\ln{(xy)} + z^3" },
            { label: "e^(xyz) + cos(x+y)", latex: "e^{xyz} + \\cos{(x+y)}" }
          ].map((ejemplo, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setExample(ejemplo.latex)}
              className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm hover:bg-indigo-600 hover:text-white transition"
            >
              {ejemplo.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botón de enviar */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md text-lg"
      >
        Calcular derivadas
      </button>
    </form>
  )
}

export default MathInput
