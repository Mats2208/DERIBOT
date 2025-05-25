import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiziz from "./pages/Quiziz";
import Solver from "./pages/Solver";
import RankingPage from "./pages/Ranking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiziz/:nivel" element={<Quiziz />} />
        <Route path="/solver" element={<Solver />} />
        <Route path="/ranking" element={<RankingPage />} /> {/* <- Aquí */}
      </Routes>
    </Router>
  );
}

export default App;
