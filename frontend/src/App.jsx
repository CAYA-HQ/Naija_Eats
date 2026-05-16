import "./globals.css";
import HomePageLayout from "./components/layout/HomePageLayout";
import HomePage from "./pages/HomePage";
import CookingFrequency from "./components/onboarding/CookingFrequency";
import SetBudget from "./components/onboarding/SetBudget";

import WelcomePage from "./components/onboarding/WelcomePage";
import { Routes, Route } from "react-router-dom";
import { RequireOnboarding } from "./RequireOnboarding";
// import Buffer from "./onboarding/Buffer";
import FoodPreferences from "./components/onboarding/FoodPreferences";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import GeneratingPlan from "./components/onboarding/GeneratingPlan";
import MealPlan from "./components/onboarding/MealPlan";
import WeeklyPlan from "./components/onboarding/WeeklyPlan";
import Market from "./pages/Market";
import MenuPage from "./pages/MenuPage";
import Profile from "./pages/Profile";
import MealDetail from "./pages/MealDetail";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RequireOnboarding />}>
          <Route
            path="/"
            element={
              <HomePageLayout>
                <HomePage />
              </HomePageLayout>
            }
          />
          <Route
            path="/market"
            element={
              <HomePageLayout>
                <Market />
              </HomePageLayout>
            }
          />
          <Route
            path="/menu-page"
            element={
              <HomePageLayout>
                <MenuPage />
              </HomePageLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <HomePageLayout>
                <Profile />
              </HomePageLayout>
            }
          />
          <Route
            path="/weekly-plan"
            element={
              <HomePageLayout>
                <WeeklyPlan />
              </HomePageLayout>
            }
          />
          <Route
            path="/meal/:id"
            element={
              <HomePageLayout>
                <MealDetail />
              </HomePageLayout>
            }
          />
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
      </Routes>
    </>
  );
}

export default App;
