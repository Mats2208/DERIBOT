// src/components/quiziz/QuizSelector.jsx
import { useState } from "react";
import quizzes from "../../data/quizzes";
import { FaCalculator, FaBrain, FaRocket, FaClock, FaQuestionCircle, FaPlay } from "react-icons/fa";

export default function QuizSelector({ difficulty, onSelectQuiz, onBack }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const quizList = quizzes[difficulty];
  
  const titles = {
    simple: { text: "Derivadas Simples", icon: <FaCalculator />, color: "from-purple-600 to-purple-400" },
    medium: { text: "Derivadas Medias", icon: <FaBrain />, color: "from-teal-600 to-teal-400" },
    complex: { text: "Derivadas Complejas", icon: <FaRocket />, color: "from-orange-500 to-yellow-400" }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`p-6 bg-gradient-to-r ${titles[difficulty].color} text-white`}>
        <div className="flex items-center justify-center gap-3">
          <div className="text-3xl">
            {titles[difficulty].icon}
          </div>
          <h2 className="text-2xl font-bold">
            Selecciona un quiz de {titles[difficulty].text}
          </h2>
        </div>
      </div>
      
      {/* Quiz list */}
      <div className="p-6">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {quizList.map((quiz, index) => (
            <div
              key={index}
              className="relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group"
              style={{ 
                transform: hoveredIndex === index ? 'scale(1.03)' : 'scale(1)',
                boxShadow: hoveredIndex === index ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              onClick={() => onSelectQuiz(quiz)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${titles[difficulty].color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{quiz.title}</h3>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaQuestionCircle />
                    <span>{quiz.questions.length} preguntas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{quiz.timePerQuestion}s/pregunta</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{quiz.description || 'Pon a prueba tus conocimientos con este quiz'}</p>
                
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${titles[difficulty].color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                
                <button className={`mt-2 px-5 py-2 rounded-full bg-gradient-to-r ${titles[difficulty].color} text-white font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <FaPlay /> Comenzar quiz
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Back button */}
        {onBack && (
          <div className="mt-8 text-center">
            <button 
              onClick={onBack}
              className="px-5 py-2 border-2 border-gray-300 rounded-full text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Volver al menú
            </button>
          </div>
        )}
      </div>
    </div>
  );
}