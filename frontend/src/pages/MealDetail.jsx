import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  StopWatch,
  UtensilsIcon,
  ChevronRightIcon,
  SpiceIcon,
} from "../constants/icons";
import { MEAL_DETAILS } from "../constants/mealDetails";
import MealDetailsTabs from "../components/ui/mealDetailsTabs";
import { planService } from "../services/plan.api";
import transformTimetable from "../constants/weekPlan";
import { getMealImage } from "../constants/weekPlan";

/* ── helpers ── */
function getHouseholdServings() {
  try {
    // Priority 1: permanent key saved after onboarding completes
    const saved = localStorage.getItem("user_household_size");
    if (saved) {
      const size = parseInt(saved, 10);
      if (!isNaN(size) && size > 0) {
        return size === 1 ? "1 Serving" : `${size} Servings`;
      }
    }
    // Priority 2: still in onboarding flow (not yet finished)
    const freq = localStorage.getItem("onboarding_frequency");
    if (freq) {
      const parsed = JSON.parse(freq);
      const size = parseInt(parsed.household_size, 10);
      if (!isNaN(size) && size > 0) {
        return size === 1 ? "1 Serving" : `${size} Servings`;
      }
    }
  } catch {
    // fallback below
  }
  return "1 Serving";
}

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mealData, setMealData] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const cached = localStorage.getItem("weekly_meal_plan");
        let data;
        if (cached) {
          data = JSON.parse(cached);
        } else {
          data = await planService.getTimetable();
          localStorage.setItem("weekly_meal_plan", JSON.stringify(data));
        }
        const weekPlan = transformTimetable(data);
        const allMeals = weekPlan.flatMap((day) => day.meals);
        const found = allMeals.find((m) => m.slug === id);
        setMealData(found || null);
      } catch {
        setMealData(null);
      }
    };
    fetchMeal();
  }, [id]);

  const details = MEAL_DETAILS[id] || {};

  /* ── ingredients: DB → MEAL_DETAILS → generic ── */
  const getIngredientsList = () => {
    if (
      mealData?.ingredients &&
      Array.isArray(mealData.ingredients) &&
      mealData.ingredients.length > 0
    ) {
      return mealData.ingredients.map((ing) => {
        if (typeof ing === "string") return ing;
        return ing.quantity ? `${ing.name} (${ing.quantity})` : ing.name;
      });
    }
    if (details.ingredients?.length > 0) return details.ingredients;
    return [
      "Freshly sourced ingredients",
      "Local market spices",
      "Traditional Nigerian seasonings",
      "Vegetable Oil",
      "Salt & Pepper to taste",
    ];
  };

  /* ── steps: MEAL_DETAILS → DB instructions → generic ── */
  const getStepsList = () => {
    if (details.steps?.length > 0) return details.steps;

    if (mealData?.instructions) {
      // handle array of strings/objects directly
      if (Array.isArray(mealData.instructions)) {
        const list = mealData.instructions.filter(Boolean);
        if (list.length > 0) {
          return list.map((s, i) => ({
            title: `Step ${i + 1}`,
            desc: typeof s === "string" ? s : s.desc || String(s),
          }));
        }
      }

      // handle string instructions
      if (typeof mealData.instructions === "string") {
        const sentences = mealData.instructions
          .split(/(?<=[.!?])\s+/)
          .filter(Boolean);
        if (sentences.length > 0) {
          return sentences.map((s, i) => ({
            title: `Step ${i + 1}`,
            desc: s,
          }));
        }
      }
    }

    return [
      {
        title: "Prepare the Ingredients",
        desc: "Thoroughly wash and prep all your ingredients. Ensure everything is chopped and ready before you start cooking.",
      },
      {
        title: "Initial Searing",
        desc: "Heat oil in your pot and begin by searing the proteins or aromatics to build a deep flavor base.",
      },
      {
        title: "Build the Sauce",
        desc: "Add your blended base or stew mix and let it simmer until the flavors meld together perfectly.",
      },
      {
        title: "Final Assembly",
        desc: "Combine the main carbohydrate with the sauce and proteins. Let it simmer on low heat to ensure even cooking.",
      },
      {
        title: "The Perfect Finish",
        desc: "Taste for seasoning and let the meal rest for a few minutes before serving to let the flavors settle.",
      },
    ];
  };

  /* ── time: MEAL_DETAILS → DB prep_time_mins → 45 ── */
  const getTime = () => {
    if (details.time) return details.time;
    if (mealData?.prep_time_mins) return `${mealData.prep_time_mins} MINS`;
    return "45 MINS";
  };

  const meal = {
    id,
    name: mealData?.name || details.name || "Recipe Not Found",
    image:
      mealData?.image ||
      getMealImage(details.name || id) ||
      "/images/dish.webp",
    isPremium: true,
    time: getTime(),
    cost: mealData?.price || "VARIABLE COST",
    // ✅ always from user preference, no hardcoded fallback
    servings: getHouseholdServings(),
    ingredients: getIngredientsList(),
    steps: getStepsList(),
    tips: details.tips || [],
    proTip: details.proTip || {
      title: "Pro Tip: Authentic Flavor",
      text: "For that real home-cooked taste, allow your spices to toast slightly in oil before adding liquids. This releases the essential oils and deepens the overall flavor profile of your meal.",
    },
  };

  return (
    <div className="flex flex-col pt-5 px-4 animate-in fade-in duration-500">
      <div className="relative h-100 rounded-2xl overflow-hidden w-full mx-auto">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bg-linear-to-b inset-0 from-transparent via-transparent to-white/50"></div>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          >
            <ChevronRightIcon className="w-6 h-6 rotate-180 text-text-primary" />
          </button>
        </div>
      </div>

      <div className="px-5 -mt-20 relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white rounded-4xl p-6 shadow-xl border border-black/5">
          <div className="flex justify-between items-start mb-2">
            <div>
              {meal.isPremium && (
                <span className="inline-block bg-[#C4E1A4] text-text-link text-[10px] font-bold px-2 py-1 rounded-full mb-2 uppercase tracking-wider">
                  Premium Recipe
                </span>
              )}
              <h1 className="text-3xl font-display font-bold text-text-primary leading-tight">
                {meal.name}
              </h1>
            </div>
            <button className="text-accent-orange hover:scale-110 transition-transform">
              <HeartIcon className="w-6 h-6 fill-current" />
            </button>
          </div>

          <div className="h-px bg-black/5 w-full my-4" />

          <div className="flex justify-between items-center text-center">
            <div className="flex flex-col items-center gap-1">
              <StopWatch className="w-5 h-5 text-text-link" />
              <span className="text-[10px] font-bold text-text-primary/60">
                {meal.time}
              </span>
            </div>
            <div className="w-1 h-8 bg-black/5" />
            <div className="flex flex-col items-center gap-1">
              <SpiceIcon className="w-5 h-5 text-text-link" />
              <span className="text-[10px] font-bold text-text-primary/60">
                {meal.cost}
              </span>
            </div>
            <div className="w-1 h-8 bg-black/5" />
            <div className="flex flex-col items-center gap-1">
              <UtensilsIcon className="w-5 h-5 text-text-link" />
              <span className="text-[10px] font-bold text-text-primary/60">
                {meal.servings}
              </span>
            </div>
          </div>
        </div>
      </div>

      <MealDetailsTabs meal={meal} />
    </div>
  );
};

export default MealDetail;
