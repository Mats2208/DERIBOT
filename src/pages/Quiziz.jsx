// src/pages/Quiziz.jsx
import { useParams, useNavigate } from "react-router-dom";
import QuizSelector from "../components/quiziz/QuizSelector";
import QuizGame from "../components/quiziz/QuizGame";
import QuizResults from "../components/quiziz/QuizResults";
import { useState } from "react";

export default function Quiziz() {
  const { nivel } = useParams();
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const difficultyMap = {
    facil: "simple",
    medio: "medium",
    pro: "complex"
  };

  const difficulty = difficultyMap[nivel] || "simple";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">      {!currentQuiz && !showResults && (
        <QuizSelector
          difficulty={difficulty}
          onSelectQuiz={(quiz) => setCurrentQuiz(quiz)}
          onBack={() => navigate("/")}
        />
      )}
      {currentQuiz && !showResults && (
        <QuizGame
          quiz={currentQuiz}
          onFinish={(finalScore) => {
            setScore(finalScore);
            setShowResults(true);
          }}
        />
      )}      {showResults && (
        <QuizResults
          quiz={currentQuiz}
          score={score}
          onRestart={() => setShowResults(false)}
          onBack={() => navigate("/")}
        />
      )}
    </div>
  );
}