import Header from "./components/Header";
import "./globals.css";
import HomePage from "./pages/HomePage";
import CookingFrequency from "./onboarding/CookingFrequency";
import SetBudget from "./onboarding/SetBudget";

import WelcomePage from "./onboarding/WelcomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import { RequireOnboarding } from "./RequireOnboarding";
// import Buffer from "./onboarding/Buffer";
import FoodPreferences from "./onboarding/FoodPreferences";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import GeneratingPlan from "./onboarding/GeneratingPlan";
import MealPlan from "./onboarding/MealPlan";
import WeeklyPlan from "./pages/WeeklyPlan";
import Market from "./pages/Market";

function App() {
  const location = useLocation();
  const hideGlobalHeader =
    location.pathname.includes("/onboarding/welcome") ||
    location.pathname.includes("/onboarding/generating-plan") ||
    location.pathname.includes("/sign-in") ||
    location.pathname.includes("/sign-up");

  return (
    <>
      {!hideGlobalHeader && <Header />}
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
        <Route
          path="/onboarding/food-preferences"
          element={<FoodPreferences />}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/onboarding/generating-plan"
          element={<GeneratingPlan />}
        />
        <Route path="/onboarding/meal-plan" element={<MealPlan />} />
        <Route path="/weekly-plan" element={<WeeklyPlan />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </>
  );
}

export default App;
