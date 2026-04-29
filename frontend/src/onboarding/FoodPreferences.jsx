import { useState } from "react";
import OnboardingLayout from "../components/OnboardingLayout";

const FoodPreferences = () => {
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const [allergyInput, setAllergyInput] = useState("");
  const [dietaryTags, setDietaryTags] = useState([
    { label: "Gluten-Free", active: true },
    { label: "Lactose-Intolerant", active: true },
    { label: "Nut-Free", active: false },
  ]);

  const preferences = [
    {
      category: "Traditional Nigerian Meals",
      image: "/images/traditional-meals.png",
      icon: "🍴",
    },
    {
      category: "Quick Meals",
      image: "/images/quick-meals.png",
      icon: "⏱️",
    },
    {
      category: "Light Snacks",
      image: "/images/light-snacks.png",
      icon: "🍞",
    },
    {
      category: "Vegetarian Options",
      image: "/images/vegetarian-options.png",
      icon: "🥗",
    },
  ];

  const handleTogglePref = (idx) => {
    setSelectedPrefs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const handleToggleTag = (idx) => {
    setDietaryTags((prev) =>
      prev.map((tag, i) => (i === idx ? { ...tag, active: !tag.active } : tag)),
    );
  };

  const handleGeneratePlan = () => {
    // Navigate to home or generate plan
    return;
  };

  return (
    <OnboardingLayout
      step={3}
      totalSteps={3}
      label="Preferences"
      prevTo="/onboarding/cooking-frequency"
      onNext={handleGeneratePlan}
      nextLabel="Generate Your Plan"
    >
      {/* Title */}
      <h1 className="text-[28px] font-bold leading-tight mb-2">
        What do you enjoy eating?
      </h1>
      <p className="text-sm text-body font-inter mb-6">
        Tell your flavour so we can help curate the best experience for you!
      </p>

      {/* Food Category Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {preferences.map((pref, idx) => (
          <button
            key={idx}
            onClick={() => handleTogglePref(idx)}
            className={`relative rounded-2xl overflow-hidden h-36 cursor-pointer transition-all duration-300 ${
              selectedPrefs.includes(idx)
                ? "ring-3 ring-accent-orange ring-offset-2"
                : ""
            }`}
          >
            <img
              src={pref.image}
              alt={pref.category}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
            {/* Icon + Label */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end gap-2">
              <span className="text-lg drop-shadow-md">{pref.icon}</span>
              <span className="text-white text-xs font-bold font-inter leading-tight drop-shadow-md">
                {pref.category}
              </span>
            </div>
            {/* Selected check */}
            {selectedPrefs.includes(idx) && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center">
                <div className="w-[10px] h-[5px] border-l-2 border-b-2 border-white -rotate-45 mb-0.5"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Dietary Requirements Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">◇</span>
          <h2 className="text-base font-bold">Dietary Requirements</h2>
        </div>

        <p className="text-sm font-medium font-inter mb-3">
          Do you have any allergies?
        </p>

        {/* Allergy Input */}
        <div className="relative mb-4">
          <textarea
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            placeholder="e.g. Peanuts, Shellfish, Gluten..."
            className="w-full bg-white/50 border border-body/20 rounded-xl p-4 text-sm font-inter resize-none h-20 outline-none focus:border-accent-orange transition-colors"
          />
          <span className="absolute bottom-3 right-3 text-body text-sm cursor-pointer">
            ⓘ
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {dietaryTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleToggleTag(idx)}
              className={`py-2 px-4 rounded-sm text-xs font-semibold font-inter transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                tag.active
                  ? "bg-text-primary/20 text-text-primary border "
                  : "bg-white/50 text-body border border-body/20"
              }`}
            >
              <span className="text-[10px]">{tag.active ? "✕" : "+"}</span>
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default FoodPreferences;
