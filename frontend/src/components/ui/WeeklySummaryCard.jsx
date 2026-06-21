import { useState, useEffect } from "react";
import Button from "./Button";
import { planService } from "../../services/plan.api";
import { preferencesService } from "../../services/preferences.api";

export const WeeklySummaryCard = ({
  currentSpending = 0,
  onBudgetExceeded,
}) => {
  const [budget, setBudget] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [adjustValue, setAdjustValue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [budgetMeta, setBudgetMeta] = useState({
    frequency: "Weekly",
    fluctuation_buffer: "10%",
    tier: "Standard",
  });

  // ✅ fetch the REAL saved budget directly from the DB — no localStorage guessing
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await planService.getBudget();
        const value = parseInt(res.data?.value, 10) || 0;
        setBudget(value);
        setInputValue(String(value));
        setBudgetMeta({
          frequency: res.data?.frequency || "Weekly",
          fluctuation_buffer: res.data?.fluctuation_buffer || "10%",
          tier: res.data?.tier || "Standard",
        });
      } catch {
        const stored = JSON.parse(
          localStorage.getItem("onboarding_budget") || "{}",
        );
        const value = parseInt(stored?.amount, 10) || 0;
        setBudget(value);
        setInputValue(String(value));
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, []);

  const handleAdjustBudget = async () => {
    if (!adjustValue) {
      setAdjustValue(true);
      return;
    }

    const newBudget = parseInt(inputValue, 10) || 0;
    setSaving(true);

    try {
      // ✅ persist the real change to the database — not just localStorage
      await preferencesService.saveBudgetPreferences({
        budgetTier: budgetMeta.tier,
        budgetValue: String(newBudget),
        frequency: budgetMeta.frequency,
        fluctuationBuffer: budgetMeta.fluctuation_buffer,
      });

      setBudget(newBudget);

      // ✅ compare against the REAL current plan cost passed down from WeeklyPlan
      if (
        currentSpending > 0 &&
        newBudget < currentSpending &&
        onBudgetExceeded
      ) {
        onBudgetExceeded({ newBudget, currentSpending });
      }
    } catch {
      setInputValue(String(budget)); // revert display if save failed
    } finally {
      setSaving(false);
      setAdjustValue(false);
    }
  };

  return (
    <div className="relative z-100">
      <div className="bg-text-primary rounded-2xl p-4 lg:p-6 text-white relative overflow-hidden shadow-lg justify-between flex items-center gap-6">
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
            Budget Summary
          </span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-4xl font-display font-bold">₦</span>
            {loading ? (
              <span className="text-4xl font-display font-bold opacity-50">
                ...
              </span>
            ) : adjustValue ? (
              <input
                value={inputValue}
                type="number"
                onChange={(e) => setInputValue(e.target.value)}
                className="text-4xl font-display font-bold bg-transparent outline-none border-b border-white/50 w-40"
                autoFocus
              />
            ) : (
              <span className="text-4xl font-display font-bold">
                {Number(budget).toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <Button
          variant="primary"
          className="py-2 px-6 rounded-xl text-sm cursor-pointer hover:bg-orange-600 transition-colors"
          onClick={handleAdjustBudget}
          disabled={loading || saving}
        >
          {saving ? "Saving..." : adjustValue ? "Save" : "Adjust"}
        </Button>
      </div>
    </div>
  );
};
