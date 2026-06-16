import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { ShoppingCartIcon } from "../../constants/icons";
import { planService } from "../../services/plan.api";
import BudgetWarning from "../../pages/BudgetWarning.jsx";

const MealPlan = () => {
  const navigate = useNavigate();
  const [planStats, setPlanStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const onBoardUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }
    localStorage.setItem("onboarded", "true");
    navigate("/weekly-plan");
  };

  const onRegeneratePlan = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }
    navigate("/onboarding/set-budget");
  };

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const data = await planService.getCurrentMealPlan();
        const stats = data.data?.budgetStats || null;
        setPlanStats(stats);
        if (stats?.exceeded) {
          setShowWarning(true);
        }
      } catch {
        const bufferedBudget =
          JSON.parse(localStorage.getItem("buffered_budget")) || null;
        if (bufferedBudget?.amount) {
          setPlanStats({
            weeklyBudget: `₦${Number(bufferedBudget.amount).toLocaleString()}`,
            currentSpending: null,
            totalMeals: null,
            prepTimeAvg: null,
            exceeded: false,
          });
        }
      } finally {
        setStatsLoading(false);
      }
    };
    fetchMealPlan();
  }, []);

  // ✅ parse "₦15,000" → 15000
  const parseNaira = (str) => {
    if (!str) return 0;
    return parseInt(String(str).replace(/[₦,]/g, ""), 10) || 0;
  };

  const statRows = [
    {
      label: "WEEKLY BUDGET",
      value: statsLoading
        ? "Loading..."
        : (planStats?.weeklyBudget ?? "Not set"),
      highlight: true,
    },
    {
      // ✅ added currentSpending
      label: "CURRENT SPENDING",
      value: statsLoading ? "Loading..." : (planStats?.currentSpending ?? "—"),
      highlight: false,
    },
    {
      label: "TOTAL MEALS",
      value: statsLoading
        ? "Loading..."
        : planStats?.totalMeals != null
          ? `${planStats.totalMeals} Meals`
          : "—",
      highlight: false,
    },
    {
      label: "PREP TIME (AVG)",
      value: statsLoading ? "Loading..." : (planStats?.prepTimeAvg ?? "—"),
      highlight: false,
    },
  ];

  // ✅ show BudgetWarning full screen if exceeded and not dismissed
  if (!statsLoading && showWarning && planStats?.exceeded) {
    return (
      <BudgetWarning
        plan={{
          name: "Weekly Meal Plan",
          cost: parseNaira(planStats.currentSpending),
          meals: planStats.totalMeals ?? 0,
          days: 7,
        }}
        budget={{
          limit: parseNaira(planStats.weeklyBudget),
        }}
        onContinue={() => setShowWarning(false)}
      />
    );
  }

  return (
    <>
      <div className="max-w-350 mx-auto px-6 md:px-12">
        <header className="mb-10">
          <h1 className="text-subheading font-display font-bold leading-tight mb-2">
            Your weekly plan is ready!
          </h1>
          <p className="text-base opacity-80">
            We've curated 7 days of heritage-inspired healthy meals just for
            you.
          </p>
        </header>

        {/* ✅ subtle warning banner if exceeded but user dismissed full screen */}
        {planStats?.exceeded && !showWarning && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-red-700">
              ⚠️ This plan exceeds your budget by ₦
              {Math.max(
                0,
                parseNaira(planStats.currentSpending) -
                  parseNaira(planStats.weeklyBudget),
              ).toLocaleString()}
            </p>
            <button
              onClick={() => setShowWarning(true)}
              className="text-xs font-bold text-red-600 underline whitespace-nowrap"
            >
              View details
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div className="flex flex-col gap-6">
            {/* Weekly Budget Card */}
            <div className="bg-white rounded-4xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <h2 className="text-2xl font-display font-bold mb-3">
                Your Weekly Budget
              </h2>
              <p className="text-text-muted text-sm mb-8 leading-relaxed">
                Based on your preferences, your budget for the incoming week is
                stated below
              </p>

              <div className="space-y-3">
                {statRows.map((stat, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-gray-100 pb-4"
                  >
                    <span className="text-[0.65rem] font-bold text-text-muted tracking-widest">
                      {stat.label}
                    </span>
                    <span
                      className={`font-display font-bold ${
                        stat.highlight
                          ? "text-accent-orange text-lg"
                          : "text-[#2d4a1e]"
                      }`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  variant="primary"
                  className="w-full py-4 rounded-2xl bg-accent-orange hover:bg-[#d55b1a]"
                  onClick={onBoardUser}
                >
                  View Full Plan
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-4 rounded-2xl border-[#2d4a1e] text-[#2d4a1e] hover:bg-[#2d4a1e] hover:text-white transition-all"
                  onClick={onRegeneratePlan}
                >
                  Regenerate Plan
                </Button>
              </div>
            </div>

            {/* Shopping List Card */}
            <div className="bg-white/50 border-2 border-dashed border-[#2d4a1e]/20 rounded-4xl p-4 text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-accent-orange">
                <ShoppingCartIcon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2 text-[#2d4a1e]">
                Shopping List Ready
              </h3>
              <p className="text-sm text-text-muted mb-6 max-w-62.5 leading-relaxed">
                All ingredients for this week are automatically calculated for
                your cart.
              </p>
              <Button
                variant="outline"
                className="w-full py-3 rounded-xl border-[#2d4a1e] text-[#2d4a1e] font-bold"
                onClick={() => navigate("/market")}
              >
                View Shopping List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealPlan;
