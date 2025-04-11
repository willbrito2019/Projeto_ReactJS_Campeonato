import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Times from "./pages/Times";
import Jogos from "./pages/Jogos";
import Classificacao from "./pages/Classificacao";

export default function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "20px", padding: "20px", background: "#eee" }}>
        <Link to="/">Times</Link>
        <Link to="/jogos">Jogos</Link>
        <Link to="/classificacao">Classificação</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Times />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route path="/classificacao" element={<Classificacao />} />
      </Routes>
    </Router>
  );
}
