import { useState } from "react";
import OnboardingLayout from "../layout/OnboardingLayout";
import CustomCheckbox from "../ui/CustomCheckbox";
import { GroupIcon, SweetTooth } from "../../constants/icons";

const CookingFrequency = () => {
  const [householdSize, setHouseholdSize] = useState("1");
  const [dailyMeals, setDailyMeals] = useState("1");
  const [includeDesserts, setIncludeDesserts] = useState(false);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);

  const householdOptions = [
    { value: "1", label: "SOLO", number: "1" },
    { value: "2", label: "DUO", number: "2" },
    { value: "3", label: "SMALL", number: "3" },
    { value: "4", label: "FAMILY", number: "4" },
  ];

  const mealCounts = ["1", "2", "3"];

  const frequencyOptions = [
    "Daily (7 Days)",
    "Most Days (5-6 Days)",
    "Once in a while (3-4 Days)",
    "Rarely (1-2 Days)",
  ];

  const handleFrequencyToggle = (option) => {
    setSelectedFrequencies((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  return (
    <OnboardingLayout
      step={2}
      totalSteps={3}
      label="Frequency"
      prevTo="/onboarding/set-budget"
      nextTo="/onboarding/food-preferences"
      nextLabel="Start Cooking"
    >
      <h1 className="text-subheading font-bold leading-tight mb-2">
        Your Daily Rhythm
      </h1>
      <p className="text-base text-body font-inter mb-6">
        Tell us how you'd like to experience your meals so we can tailor the
        perfect plan for your household.
      </p>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
        <div className="bg-white/50 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <GroupIcon className={"text-lg"} />
            <span className="text-sm font-bold font-inter">Household Size</span>
          </div>
          <div className="flex gap-2">
            {householdOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setHouseholdSize(opt.value)}
                className={`flex-1 py-5 rounded-sm flex flex-col items-center gap-1 transition-all duration-300 cursor-pointer ${
                  householdSize === opt.value
                    ? "bg-text-primary border text-bg-background"
                    : "bg-white/80 text-text-primary border border-body/20"
                }`}
              >
                <span className="text-lg  font-bold font-inter">
                  {opt.number}
                </span>
                <span className="text-[10px]  font-semibold font-inter uppercase tracking-wider">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/50 rounded-2xl p-5 mb-4">
          <span className="text-sm  font-bold font-inter mb-1">
            Daily Meals
          </span>
          <p className="text-xs  text-body font-inter mb-4">
            How many meals daily?
          </p>
          <div className="flex gap-2">
            {mealCounts.map((count) => (
              <button
                key={count}
                onClick={() => setDailyMeals(count)}
                className={`flex-1 py-1.5  rounded-full text-sm font-semibold font-inter transition-all duration-300 cursor-pointer ${
                  dailyMeals === count
                    ? "bg-text-primary text-bg-background"
                    : "bg-transparent text-body"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 place-items-stretch">
        <div className="bg-white/50 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold font-inter">Sweet Tooth</span>
            <SweetTooth className={"text-lg text-accent-orange/50"} />
          </div>
          <p className="text-xs text-body font-inter mb-4">Include desserts?</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold font-inter text-body">
              NO
            </span>
            <button
              onClick={() => setIncludeDesserts(!includeDesserts)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 cursor-pointer ${
                includeDesserts ? "bg-accent-orange" : "bg-body/30"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                  includeDesserts ? "left-[calc(100%-1.625rem)]" : "left-0.5"
                }`}
              ></div>
            </button>
            <span className="text-xs font-semibold font-inter text-body">
              YES
            </span>
          </div>
        </div>

        <div className="bg-white/50 rounded-2xl p-5">
          <span className="text-sm font-bold font-inter mb-4">
            How often do you cook?
          </span>
          <ul className="flex flex-col gap-1">
            {frequencyOptions.map((option) => (
              <li
                key={option}
                className="flex items-center gap-3 py-3 cursor-pointer"
                onClick={() => handleFrequencyToggle(option)}
              >
                <CustomCheckbox
                  checked={selectedFrequencies.includes(option)}
                />
                <span className="text-sm font-medium font-inter">{option}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CookingFrequency;
