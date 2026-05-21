/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import OnboardingLayout from "../../components/layout/OnboardingLayout";
import {
  WeeklyIcon,
  MonthlyIcon,
  ProInsightIcon,
  CircleAlertIcon,
} from "../../constants/icons";

const SetBudget = () => {
  const [budgetTier, setBudgetTier] = useState("Standard");
  const [frequency, setFrequency] = useState("Weekly");
  const [selectedBuffer, setSelectedBuffer] = useState("10%");
  const [customBuffer, setCustomBuffer] = useState("");
  const [budgetData, setBudgetData] = useState({
    budgetValue: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("onboarding_budget");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.amount) setBudgetData({ budgetValue: data.amount.toString() });
      if (data.frequency)
        setFrequency(data.frequency === "weekly" ? "Weekly" : "Monthly");
      if (data.selectedBuffer) setSelectedBuffer(data.selectedBuffer);
      if (data.customBuffer) setCustomBuffer(data.customBuffer);
      if (data.budgetTier) setBudgetTier(data.budgetTier);
    }
  }, []);

  const getBudgetValuePlaceholder = (tier, freq) => {
    if (freq === "Weekly") {
      if (tier === "Low cost") return "4,500 - 7,000";
      if (tier === "Standard") return "7,000 - 10,000";
      if (tier === "Premium") return "10,000 - 15,000";
    } else {
      if (tier === "Low cost") return "30,000 - 50,000";
      if (tier === "Standard") return "50,000 - 70,000";
      if (tier === "Premium") return "70,000 - 100,000";
    }
  };

  const handleTierChange = (tier) => {
    setBudgetTier(tier);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const numValue = parseInt(value) || 0;

    setBudgetData({ budgetValue: value });

    // Automatically highlight tier based on value
    if (frequency === "Weekly") {
      if (numValue < 7000) setBudgetTier("Low cost");
      else if (numValue >= 7000 && numValue < 10000) setBudgetTier("Standard");
      else if (numValue >= 10000) setBudgetTier("Premium");
    } else {
      if (numValue < 30000) setBudgetTier("Low cost");
      else if (numValue >= 50000 && numValue < 70000) setBudgetTier("Standard");
      else if (numValue >= 70000) setBudgetTier("Premium");
    }
  };

  // const handleSubmitBudget =async (e) => {
  //     e.preventDefault();
  //     setError("");

  //     try {
  //       await (budgetData);

  //     } catch (err) {
  //       setError(
  //         err.message || "An error occurred during sign in. Please try again.",
  //       );
  //     }     };
  const tiers = ["Low cost", "Standard", "Premium"];
  const bufferOptions = ["10%", "15%", "20%", "Custom"];

  const saveData = () => {
    const data = {
      amount: parseInt(budgetData.budgetValue) || 0,
      frequency: frequency.toLowerCase(),
      selectedBuffer: selectedBuffer,
      customBuffer: selectedBuffer === "Custom" ? customBuffer : null,
      budgetTier: budgetTier,
    };
    localStorage.setItem("onboarding_budget", JSON.stringify(data));
  };

  return (
    <OnboardingLayout
      step={1}
      totalSteps={3}
      label="Budget & Buffer"
      prevTo="/"
      nextTo="/onboarding/cooking-frequency"
      nextLabel="Set Frequency"
      submitFunction={saveData}
    >
      <h1 className="text-subheading tracking-tight font-bold leading-tight mb-2">
        Set your weekly budget
      </h1>
      <p className="text-base text-text-primary font-inter mb-2">
        We'll tailor meal plans that fit your wallet.
      </p>
      <span className="text-sm font-bold text-inter uppercase tracking-wider">
        Frequency
      </span>
      <div className="flex gap-3 my-2">
        {["Weekly", "Monthly"].map((freq) => (
          <button
            key={freq}
            onClick={() => {
              setFrequency(freq);
            }}
            className={`flex-1 py-4 lg:py-8 px-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
              frequency === freq
                ? "bg-text-primary/10 text-text-primary border-2 border-text-primary"
                : "bg-white/50 text-text-primary border-2 border-text-muted/30"
            }`}
          >
            <span className="text-lg">
              {freq === "Weekly" ? (
                <WeeklyIcon className="text-text-primary" />
              ) : (
                <MonthlyIcon />
              )}
            </span>
            <span className="text-xs font-semibold font-inter">{freq}</span>
          </button>
        ))}
      </div>

      <div className="bg-text-muted/10 rounded-2xl p-3 mb-3 relative">
        <input
          type="number"
          name="budgetValue"
          value={budgetData.budgetValue}
          onChange={handleInputChange}
          placeholder={getBudgetValuePlaceholder(budgetTier, frequency)}
          className="text-lg lg:text-2xl font-bold w-full border-none font-inter pl-8 py-3 focus:border-b-2 focus:border-b-text-primary focus:outline-0 transition-all placeholder:text-text-muted/40"
          required
        />
        <span className="text-lg text-text-primary absolute top-1/2 -translate-y-1/2 left-6 font-bold">
          ₦
        </span>
      </div>

      <div className="flex items-center gap-4 mb-2">
        {tiers.map((tier) => (
          <button
            key={tier}
            onClick={() => handleTierChange(tier)}
            className={`py-2 px-4 rounded-full text-sm font-semibold font-inter transition-all duration-300 cursor-pointer ${
              budgetTier === tier
                ? "border-2 border-accent-orange text-accent-orange bg-accent-orange/5"
                : "border-2 border-text-muted/30 text-text-muted"
            }`}
          >
            {tier}
          </button>
        ))}
      </div>
      <p className="text-xs italic text-text-muted font-inter mb-3">
        Average meal in Lagos starts from ₦4,500
      </p>

      <div className="flex items-center justify-start gap-3 mb-3">
        <span className="text-sm font-inter font-bold uppercase tracking-wider">
          Fluctuation Buffer
        </span>
        <div className="relative group">
          <CircleAlertIcon
            className={
              "text-xs cursor-help text-text-muted hover:text-accent-orange transition-colors"
            }
          />
          <div className="absolute bottom-full left-1/2 mb-2 w-64 p-3 bg-text-primary text-white text-[11px] -translate-x-1/2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-xl pointer-events-none">
            <p className="font-bold mb-1">Why a buffer?</p>
            Food prices and delivery fees in Nigeria can fluctuate due to peak
            hours, weather, or market changes. This buffer ensures your plan
            stays realistic.
            <div className="absolute top-[99%] right-1/2 border-8 border-transparent border-t-text-primary"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        {bufferOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelectedBuffer(opt)}
            className={`py-2 px-4 rounded-full text-xs font-semibold font-inter transition-all duration-300 cursor-pointer ${
              selectedBuffer === opt
                ? "bg-text-primary text-bg-background border"
                : "bg-white/50 text-text-primary border border-text-muted/30"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {selectedBuffer === "Custom" && (
        <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-xs font-bold font-inter uppercase tracking-wider mb-2 text-text-muted">
            Enter custom percentage
          </label>
          <div className="relative max-w-[150px]">
            <input
              type="number"
              value={customBuffer}
              onChange={(e) => setCustomBuffer(e.target.value)}
              placeholder="0"
              className="w-full bg-white/50 border border-text-muted/30 rounded-xl p-3 text-sm font-bold outline-none focus:border-accent-orange transition-colors pr-8"
              autoFocus
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-text-muted">
              %
            </span>
          </div>
        </div>
      )}

      {/* Pro Insight Card */}
      <div className="bg-text-muted/10 rounded-[8px] py-3 px-5 flex gap-4 items-start overflow-hidden relative">
        <div className="w-1 h-full bg-accent-orange absolute top-0 left-0"></div>
        <span className="w-8 h-8 grid place-items-center rounded-[4px] my-auto bg-accent-orange/20 p-1">
          <ProInsightIcon className="text-accent-orange" />
        </span>
        <div>
          <p className="text-sm font-bold font-inter mb-1">Pro Insight</p>
          <p className="text-xs text-text-light font-inter">
            A 15% buffer is recommended to cover peak-hour delivery surges in
            Victoria Island and Ikeja.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SetBudget;
