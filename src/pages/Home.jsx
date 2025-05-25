import { useNavigate } from "react-router-dom";
import { FaRobot, FaCalculator, FaBrain, FaRocket, FaTrophy, FaCamera, FaPlay } from "react-icons/fa";

const Card = ({ title, description, icon, type, onClick }) => {
  // Configurar colores según el tipo de tarjeta
  const colors = {
    simple: {
      icon: "text-purple-700",
      border: "before:bg-gradient-to-r before:from-purple-700 before:to-purple-400",
      button: "bg-gradient-to-r from-purple-700 to-purple-400 hover:from-purple-400 hover:to-purple-700"
    },
    medium: {
      icon: "text-teal-600",
      border: "before:bg-gradient-to-r before:from-teal-600 before:to-teal-400",
      button: "bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-400 hover:to-teal-600"
    },
    complex: {
      icon: "text-orange-500",
      border: "before:bg-gradient-to-r before:from-orange-500 before:to-yellow-400",
      button: "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-yellow-400 hover:to-orange-500"
    },
    leaderboard: {
      icon: "text-gray-600",
      border: "before:bg-gradient-to-r before:from-gray-600 before:to-gray-400",
      button: "bg-transparent border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
    },
    scanner: {
      icon: "text-blue-600",
      border: "before:bg-gradient-to-r before:from-blue-600 before:to-blue-400",
      button: "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600"
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer 
                  p-8 text-center flex flex-col overflow-hidden hover:-translate-y-2 ${colors[type].border}
                  before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[5px]`}
    >
      <div className={`text-4xl mb-5 ${colors[type].icon}`}>{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-500 mb-6 flex-grow">{description}</p>
      <button className={`py-3 px-6 rounded-full font-semibold text-white uppercase tracking-wide text-sm flex items-center justify-center gap-2 mx-auto transition-all duration-300 ${colors[type].button}`}>
        <FaPlay /> Comenzar
      </button>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-5 flex flex-col items-center">
      <header className="text-center mb-10 max-w-2xl animate-fadeIn">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-700 to-purple-400 rounded-full flex items-center justify-center text-white text-4xl shadow-md">
            <FaRobot />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-400 mb-4">DERIVABOT</h1>
        <p className="text-lg text-gray-600 font-light">
          Domina las derivadas matemáticas con nuestro sistema interactivo de aprendizaje
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        <Card
          title="Derivadas Simples"
          description="Practica con derivadas básicas perfectas para empezar tu camino en el cálculo diferencial"
          icon={<FaCalculator />}
          type="simple"
          onClick={() => navigate("/quiziz/facil")}
        />
        <Card
          title="Derivadas Medias"
          description="Desafíos intermedios con reglas de producto, cociente y cadena para consolidar tus conocimientos"
          icon={<FaBrain />}
          type="medium"
          onClick={() => navigate("/quiziz/medio")}
        />
        <Card
          title="Derivadas Complejas"
          description="Problemas avanzados con funciones compuestas, trigonométricas inversas y logarítmicas para expertos"
          icon={<FaRocket />}
          type="complex"
          onClick={() => navigate("/quiziz/pro")}
        />
        <Card
          title="Clasificación"
          description="Consulta los mejores puntajes y compite con otros jugadores"
          icon={<FaTrophy />}
          type="leaderboard"
          onClick={() => navigate("/ranking")}
        />
        <Card
          title="Escáner de Derivadas"
          description="Resuelve derivadas paso a paso subiendo una foto de tu ejercicio"
          icon={<FaCamera />}
          type="scanner"
          onClick={() => navigate("/solver")}
        />
      </div>

      {/* Añadir animación de fadeIn */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease;
        }
      `}</style>
    </div>
  );
}