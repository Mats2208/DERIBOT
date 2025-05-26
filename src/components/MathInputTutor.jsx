import { useState } from "react";

export default function MathInput({ onSubmit }) {
  const [formula, setFormula] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formula.trim()) {
      onSubmit(formula);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow border border-purple-200">
      <label className="block font-semibold text-gray-700">Ingresa tu función (LaTeX):</label>
      <input
        type="text"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        placeholder="Ej: x^2 + y^3 + z"
        className="w-full border p-3 rounded-lg text-lg"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Calcular ∂f/∂x
      </button>
    </form>
  );
}

