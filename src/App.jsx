import Header from "./components/Header";
import "./globals.css";
import HomePage from "./HomePage";
import WelcomePage from "./onboarding/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
