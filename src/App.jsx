import Header from "./components/Header";
import "./globals.css";
import HomePage from "./pages/HomePage";
import CookingFrequency from "./onboarding/CookingFrequency";
import SetBudget from "./onboarding/SetBudget";

import WelcomePage from "./onboarding/WelcomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import { RequireOnboarding } from "./RequireOnboarding";
import Buffer from "./onboarding/Buffer";

function App() {
  const location = useLocation();
  const isOnboarding = location.pathname.includes("/onboarding/welcome");

  return (
    <>
      {!isOnboarding && <Header />}
      <Routes>
        <Route element={<RequireOnboarding />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/onboarding/welcome" element={<WelcomePage />} />
        <Route path="/onboarding/set-budget" element={<SetBudget />} />
        <Route
          path="/onboarding/cooking-frequency"
          element={<CookingFrequency />}
        />
        <Route path="/onboarding/buffer" element={<Buffer />} />
      </Routes>
    </>
  );
}

export default App;
