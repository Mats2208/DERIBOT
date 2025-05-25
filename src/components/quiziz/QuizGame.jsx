// src/components/quiziz/QuizGame.jsx
import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaArrowRight, FaRegClock } from "react-icons/fa";

const motivationalPhrases = [
  "¡Excelente trabajo! Tu comprensión de las derivadas es impresionante.",
  "¡Correcto! Eres un genio del cálculo II.",
  "¡Perfecto! Cada respuesta correcta te acerca a dominar el tema.",
  "¡Bien hecho! Tu habilidad para derivar es notable.",
  "¡Respuesta correcta! Sigue así y serás imparable.",
  "¡Impresionante! Tu mente analítica es asombrosa.",
  "¡Fantástico! Cada derivada que resuelves fortalece tu conocimiento.",
  "¡Correcto! Demuestras gran destreza matemática.",
  "¡Perfecto! Eres un maestro de las técnicas de derivación.",
  "¡Bien hecho! Tu precisión es digna de admiración."
];

export default function QuizGame({ quiz, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ correct: false, explanation: "" });
  const [timeLeft, setTimeLeft] = useState(quiz.timePerQuestion || 30);
  const [timer, setTimer] = useState(null);

  const question = quiz.questions[index];

  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(quiz.timePerQuestion || 30);
    const newTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(newTimer);
          if (selected === null) {
            handleOptionClick(-1); // Auto-select wrong answer on timeout
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimer(newTimer);
    return () => clearInterval(newTimer);
  }, [index, quiz.timePerQuestion]);

  const handleOptionClick = (i) => {
    if (selected !== null) return;
    clearInterval(timer);
    setSelected(i);
    const correct = i === question.correctAnswer;
    if (correct) setScore((s) => s + 1);
    setFeedback({
      correct,
      explanation: question.explanation
    });
    setShowFeedback(true);
  };

  const next = () => {
    setSelected(null);
    setShowFeedback(false);
    if (index + 1 < quiz.questions.length) {
      setIndex(index + 1);
    } else {
      onFinish(score);
    }
  };

  // Calculate progress percentage
  const progress = ((index) / quiz.questions.length) * 100;
  
  // Determine timer color based on time left
  const getTimerColor = () => {
    if (timeLeft <= 3) return "text-red-500 bg-red-100";
    if (timeLeft <= 5) return "text-orange-500 bg-orange-100";
    return "text-purple-500 bg-purple-100";
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="p-6">
        {/* Header with score and timer */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="text-sm font-medium text-gray-500">
              Pregunta {index + 1} de {quiz.questions.length}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 font-semibold">
              {score} puntos
            </div>
            <div className={`px-3 py-1 rounded-full flex items-center gap-1 font-semibold ${getTimerColor()}`}>
              <FaRegClock className="text-xs" /> {timeLeft}s
            </div>
          </div>
        </div>
        
        {/* Question */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">{question.question}</h2>
        </div>
        
        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(i)}
              disabled={selected !== null}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 flex items-center
                ${selected === null ? "hover:border-purple-300 hover:bg-purple-50 active:bg-purple-100" : ""}
                ${selected === i && i === question.correctAnswer ? "bg-green-50 border-green-500 text-green-700" : ""}
                ${selected === i && i !== question.correctAnswer ? "bg-red-50 border-red-500 text-red-700" : ""}
                ${selected !== null && i === question.correctAnswer && selected !== i ? "bg-green-50 border-green-500 text-green-700" : ""}
                ${selected !== null && i !== question.correctAnswer && selected !== i ? "opacity-70" : ""}
              `}
            >
              <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center font-semibold text-sm
                ${selected === null ? "bg-gray-200 text-gray-700" : ""}
                ${selected === i && i === question.correctAnswer ? "bg-green-500 text-white" : ""}
                ${selected === i && i !== question.correctAnswer ? "bg-red-500 text-white" : ""}
                ${selected !== null && i === question.correctAnswer && selected !== i ? "bg-green-500 text-white" : ""}
                ${selected !== null && i !== question.correctAnswer && selected !== i ? "bg-gray-200 text-gray-700" : ""}
              `}>
                {String.fromCharCode(65 + i)}
              </div>
              <span className="flex-grow">{opt}</span>
              {selected !== null && i === question.correctAnswer && (
                <FaCheck className="text-green-500 ml-2" />
              )}
              {selected === i && i !== question.correctAnswer && (
                <FaTimes className="text-red-500 ml-2" />
              )}
            </button>
          ))}
        </div>
        
        {/* Feedback */}
        {showFeedback && (
          <div className={`mb-6 p-5 rounded-lg border-l-4 animate-fadeIn
            ${feedback.correct 
              ? "bg-green-50 border-green-500 text-green-700" 
              : "bg-red-50 border-red-500 text-red-700"}`
            }
          >
            {feedback.correct ? (
              <p className="font-medium italic">{motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]}</p>
            ) : (
              <>
                <p className="font-semibold mb-2">La respuesta correcta es: {question.options[question.correctAnswer]}</p>
                <div className="text-sm bg-white p-3 rounded border border-red-200 mt-2">
                  <p className="font-medium mb-1">Explicación:</p>
                  <p>{feedback.explanation}</p>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Next button */}
        <div className="flex justify-end">
          <button
            onClick={next}
            disabled={selected === null}
            className={`px-6 py-3 rounded-full font-semibold text-white flex items-center gap-2
              ${selected === null 
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 transform hover:-translate-y-1 transition-all duration-200"}`
              }
          >
            {index + 1 < quiz.questions.length ? "Siguiente" : "Finalizar"}
            <FaArrowRight />
          </button>
        </div>
      </div>
      
      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}