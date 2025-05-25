import { useEffect, useState } from "react";
import quizzes from "../data/quizzes";

export default function RankingPage() {
  const [rankings, setRankings] = useState([]);
  const [filteredRankings, setFilteredRankings] = useState([]);
  const [selectedNivel, setSelectedNivel] = useState("");

    const nivelesSet = new Set();

    Object.values(quizzes).forEach(grupo => {
    grupo.forEach(q => nivelesSet.add(q.title));
    });

    const NIVELES = Array.from(nivelesSet);

  const GAS_URL = "https://script.google.com/macros/s/AKfycbwC08xe9FjuHrxQ8-AHOouT8Q5kLUM1f226unvLo9gkJNfywJg7Oy6fuzspGXB5cq9rVQ/exec";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(GAS_URL);
        const data = await res.json();

        const cleaned = data.map((item, i) => ({
          id: i,
          estudiante: item.ESTUDIANTE,
          docente: item.DOCENTE,
          materia: item.MATERIA,
          score: parseInt(item.SCORE),
          total: parseInt(item.TOTAL),
          percentage: parseFloat(item.PORCENTAJE),
          quizTitle: item.QUIZTITLE,
          date: new Date(item.TIMESTAMP).toLocaleString(),
        }));

        setRankings(cleaned);
      } catch (err) {
        console.error("Error al obtener datos del ranking:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedNivel) {
      setFilteredRankings([]);
      return;
    }

    const filtered = rankings
      .filter((entry) => entry.quizTitle === selectedNivel)
      .sort((a, b) => b.percentage - a.percentage);

    setFilteredRankings(filtered);
  }, [selectedNivel, rankings]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">Ranking por Nivel</h1>

      <select
        className="w-full p-3 border-2 rounded-lg mb-6"
        value={selectedNivel}
        onChange={(e) => setSelectedNivel(e.target.value)}
      >
        <option value="">Selecciona un nivel</option>
        {NIVELES.map((nivel) => (
          <option key={nivel} value={nivel}>{nivel}</option>
        ))}
      </select>

      {filteredRankings.length === 0 ? (
        <p className="text-center text-gray-500">Selecciona un nivel para ver resultados.</p>
      ) : (
        <div className="bg-white shadow rounded-xl divide-y">
          {filteredRankings.map((entry, i) => (
            <div key={entry.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{entry.estudiante}</p>
                <p className="text-sm text-gray-600">{entry.materia} • {entry.date}</p>
              </div>
              <div className="text-right">
                <p className="text-purple-700 font-bold">{entry.percentage}%</p>
                <p className="text-sm text-gray-500">{entry.score}/{entry.total}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
