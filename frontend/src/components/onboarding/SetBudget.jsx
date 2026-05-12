import { useState } from "react";
import OnboardingLayout from "../layout/OnboardingLayout";
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
  // const [error, setError] = useState("")
  const [budgetData, setBudgetData] = useState({
    budgetValue: "",
  });

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
    const { name, value } = e.target;
    setBudgetData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return (
    <OnboardingLayout
      step={1}
      totalSteps={3}
      label="Budget & Buffer"
      prevTo="/onboarding/welcome"
      nextTo="/onboarding/cooking-frequency"
      nextLabel="Start Cooking"
      // submitFunction={handleSubmitBudget}
    >
      <h1 className="text-subheading lg:text-5xl tracking-tight font-bold leading-tight mb-2">
        Set your weekly budget
      </h1>
      <p className="text-base lg:text-desktop-body text-text-primary font-inter mb-8">
        We'll tailor meal plans that fit your wallet.
      </p>

      <div className="bg-text-muted/10 rounded-2xl p-6 mb-6 relative">
        <input
          type="number"
          value={budgetData.budgetValue}
          onChange={handleInputChange}
          placeholder={getBudgetValuePlaceholder(budgetTier, frequency)}
          className="text-lg lg:text-2xl font-bold w-full border-none font-inter pl-8 py-3 focus:border-b-2 focus:border-b-text-primary focus:outline-0 transition-all placeholder:text-text-muted/40"
          required
        />
        <span className="text-lg lg:text-2xl text-text-primary absolute top-1/2 -translate-y-1/2 left-6 font-bold">
          ₦
        </span>
      </div>

      <div className="flex items-center gap-4 mb-3">
        {tiers.map((tier) => (
          <button
            key={tier}
            onClick={() => handleTierChange(tier)}
            className={`py-3 px-6 rounded-full text-sm font-semibold font-inter transition-all duration-300 cursor-pointer ${
              budgetTier === tier
                ? "border-2 border-accent-orange text-accent-orange bg-accent-orange/5"
                : "border-2 border-text-muted/30 text-text-muted"
            }`}
          >
            {tier}
          </button>
        ))}
      </div>
      <p className="text-xs italic text-text-muted font-inter mb-6">
        Average meal in Lagos starts from ₦4,500
      </p>

      <span className="text-sm font-bold text-inter uppercase tracking-wider">
        Frequency
      </span>
      <div className="flex gap-3 my-4">
        {["Weekly", "Monthly"].map((freq) => (
          <button
            key={freq}
            onClick={() => {
              setFrequency(freq);
            }}
            className={`flex-1 py-4 px-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
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

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-inter font-bold uppercase tracking-wider">
          Fluctuation Buffer
        </span>
        <CircleAlertIcon className={"text-xs"} />
      </div>
      <div className="flex gap-2 mb-6">
        {bufferOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelectedBuffer(opt)}
            className={`py-2 px-5 rounded-full text-xs font-semibold font-inter transition-all duration-300 cursor-pointer ${
              selectedBuffer === opt
                ? "bg-text-primary text-bg-background border"
                : "bg-white/50 text-text-primary border border-text-muted/30"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Pro Insight Card */}
      <div className="bg-text-muted/10 rounded-[8px] py-4 px-5 flex gap-4 items-start overflow-hidden relative">
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
