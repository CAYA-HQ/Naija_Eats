import { useState } from "react";
import Button from "./Button";

export const WeeklySummaryCard = ({ planCost = 0, onBudgetExceeded }) => {
  const bufferedAmount = JSON.parse(localStorage.getItem("buffered_budget"));
  const amount = bufferedAmount?.amount;
  const [budget, setBudget] = useState(amount);
  const [adjustValue, setAdjustValue] = useState(false);

  const handleAdjustBudget = () => {
    if (adjustValue) {
      const newBudget = parseInt(String(budget).replace(/,/g, ""), 10) || 0;

      // ✅ save updated budget to localStorage
      const bufferedAmount = JSON.parse(
        localStorage.getItem("buffered_budget"),
      );
      const updated = { ...bufferedAmount, amount: newBudget };
      localStorage.setItem("buffered_budget", JSON.stringify(updated));
      setBudget(newBudget);

      // ✅ if new budget is less than current plan cost → show warning
      if (planCost > 0 && newBudget < planCost && onBudgetExceeded) {
        onBudgetExceeded({
          newBudget,
          planCost,
        });
        setAdjustValue(false);
        return;
      }
    }
    setAdjustValue((prev) => !prev);
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
            {adjustValue ? (
              <input
                value={budget}
                type="number"
                onChange={(e) => setBudget(e.target.value)}
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
        >
          {adjustValue ? "Save" : "Adjust"}
        </Button>
      </div>
    </div>
  );
};
