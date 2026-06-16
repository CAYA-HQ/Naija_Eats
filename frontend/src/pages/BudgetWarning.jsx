import { useNavigate } from "react-router-dom";
import {
  ForkAndKnife,
  WarningIcon,
  TipIcon,
  CalendarIcon,
} from "../constants/icons";
import Button from "../components/ui/Button";

const BudgetWarning = ({ plan, budget, onContinue }) => {
  const navigate = useNavigate();

  // guard against 0 budget to avoid division by zero
  const safeBudget = budget.limit || 1;
  const overAmount = Math.max(0, plan.cost - budget.limit);
  const utilization = Math.round((plan.cost / safeBudget) * 100);

  return (
    <div className="px-4 py-6 space-y-5 max-w-sm mx-auto w-full min-h-screen flex flex-col justify-center">
      {/* alert header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <WarningIcon className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-red-600">Budget Exceeded</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          This plan is{" "}
          <span className="font-semibold text-red-500">
            ₦{overAmount.toLocaleString()}
          </span>{" "}
          over your{" "}
          <span className="font-semibold text-red-500">
            ₦{budget.limit.toLocaleString()}
          </span>{" "}
          limit.
        </p>
      </div>

      {/* plan card */}
      <div className="bg-white rounded-2xl p-4 space-y-4 border border-gray-100">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
          Plan Summary
        </p>
        <div className="flex items-center justify-between">
          <p className="font-bold text-text-primary">{plan.name}</p>
          <p className="text-lg font-bold text-text-primary">
            ₦{plan.cost.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3 space-y-1">
            <ForkAndKnife className="w-5 h-5 text-red-600" />
            <p className="text-xs text-text-muted">Items</p>
            <p className="text-sm font-bold text-text-primary">
              {plan.meals} Meals
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 space-y-1">
            <CalendarIcon className="w-5 h-5 text-red-900" />
            <p className="text-xs text-text-muted">Duration</p>
            <p className="text-sm font-bold text-text-primary">
              {plan.days} Days
            </p>
          </div>
        </div>

        {/* utilization bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Budget Utilization</p>
            <p className="text-xs font-bold text-red-700">{utilization}%</p>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-red-500 transition-all duration-500"
              style={{ width: `${Math.min(utilization, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <Button
        onClick={() => navigate("/onboarding/set-budget")}
        className="w-full"
      >
        Increase Budget
      </Button>

      <Button variant="outline" onClick={onContinue} className="w-full">
        Continue Anyway
      </Button>

      <div className="flex items-center justify-center gap-2">
        <TipIcon className="w-5 h-5 text-accent-black" />
        <p className="text-xs text-text-muted">
          Tip: Increase your budget by at least ₦{overAmount.toLocaleString()}{" "}
          to cover this plan.
        </p>
      </div>
    </div>
  );
};

export default BudgetWarning;
