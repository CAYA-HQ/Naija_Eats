import { useNavigate } from "react-router-dom";
import { WarningIcon, TipIcon } from "../constants/icons";
import Button from "../components/ui/Button";

const BudgetWarning = ({ budget }) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6 space-y-5 max-w-sm mx-auto w-full min-h-screen flex flex-col justify-center">
      {/* alert header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
          <WarningIcon className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-amber-700">Budget Too Low</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Your budget of{" "}
          <span className="font-semibold text-text-primary">
            ₦{budget.limit.toLocaleString()}
          </span>{" "}
          is too low to generate a full weekly meal plan.
        </p>
      </div>

      {/* notice card */}
      <div className="bg-white rounded-2xl p-4 space-y-3 border border-gray-100">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
          Your Budget
        </p>
        <p className="text-2xl font-bold text-text-primary">
          ₦{budget.limit.toLocaleString()}
        </p>
        <p className="text-xs text-text-muted leading-relaxed">
          We can't put together a reliable 7-day plan within this amount. Please
          increase your budget to continue.
        </p>
      </div>

      {/* only action available — Continue Anyway disabled on purpose */}
      <Button
        onClick={() => navigate("/onboarding/set-budget")}
        className="w-full"
      >
        Adjust My Budget
      </Button>

      <Button
        variant="outline"
        disabled
        className="w-full opacity-40 cursor-not-allowed"
      >
        Continue With This Plan
      </Button>

      <div className="flex items-center justify-center gap-2">
        <TipIcon className="w-5 h-5 text-accent-black" />
        <p className="text-xs text-text-muted">
          Tip: Most weekly plans need at least ₦15,000 to cover a full week of
          meals.
        </p>
      </div>
    </div>
  );
};

export default BudgetWarning;
