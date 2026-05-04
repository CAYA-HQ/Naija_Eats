import { useState } from "react";
import OnboardingLayout from "../components/OnboardingLayout";
import {
  RhombusAlertIcon,
  CircleAlertIcon,
  CloseIcon,
  PlusIcon,
  ForkAndKnife,
  StopWatch,
  LeafIcon,
  SnackIcon,
} from "../constants/icons";
import { useNavigate } from "react-router-dom";

const FoodPreferences = () => {
  const navigate = useNavigate();
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
      image: "/images/traditional-meals.webp",
      icon: <ForkAndKnife />,
    },
    {
      category: "Quick Meals",
      image: "/images/quick-meals.webp",
      icon: <StopWatch />,
    },
    {
      category: "Light Snacks",
      image: "/images/light-snacks.webp",
      icon: <SnackIcon />,
    },
    {
      category: "Vegetarian Options",
      image: "/images/vegetarian-options.webp",
      icon: <LeafIcon />,
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

  // const handleGeneratePlan = () => {
  //   // Navigate to home or generate plan
  //   Navigate("/onboarding/generating-plan");
  // };

  return (
    <OnboardingLayout
      step={3}
      totalSteps={3}
      label="Preferences"
      prevTo="/onboarding/cooking-frequency"
      onNext={() => navigate("/onboarding/generating-plan")}
      nextLabel="Generate Your Plan"
    >
      {/* Title */}
      <h1 className="text-[28px] font-bold leading-tight mb-2">
        What do you enjoy eating?
      </h1>
      <p className="text-sm text-body mb-6">
        Tell your flavour so we can help curate the best experience for you!
      </p>

      {/* Food Category Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {preferences.map((pref, idx) => (
          <button
            key={idx}
            onClick={() => handleTogglePref(idx)}
            className="group relative rounded-2xl overflow-hidden h-36 cursor-pointer transition-all duration-300 "
          >
            <img
              src={pref.image}
              alt={pref.category}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div
              className={` transition-all absolute inset-0 ${selectedPrefs.includes(idx) ? "bg-text-primary/70 group-hover:bg-text-primary/70" : "bg-none group-hover:bg-white/50"}`}
            ></div>
            {/* Icon + Label */}
            <div
              className={`group-hover:bottom-2 transition-all w-[90%] absolute -bottom-20 h-20 left-1/2 -translate-x-1/2 right-0 flex flex-col items-center justify-center gap-2  py-1 px-2 rounded-sm ${selectedPrefs.includes(idx) ? "bottom-2 bg-text-primary/75 text-white" : "-bottom-20 bg-white group-hover:bg-white "}`}
            >
              <span
                className={`text-lg  drop-shadow-md ${selectedPrefs.includes(idx) ? "text-white" : "text-accent-orange"}`}
              >
                {pref.icon}
              </span>
              <span
                className={`${selectedPrefs.includes(idx) ? "text-white" : "text-text-primary"} text-xs font-bold leading-tight drop-shadow-md`}
              >
                {pref.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Dietary Requirements Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <RhombusAlertIcon className={"text-lg text-accent-orange"} />
          <h2 className="text-base font-bold">Dietary Requirements</h2>
        </div>

        <p className="text-sm font-medium mb-3">Do you have any allergies?</p>

        {/* Allergy Input */}
        <div className="relative mb-4">
          <textarea
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            placeholder="e.g. Peanuts, Shellfish, Gluten..."
            className="w-full bg-white/50 border border-body/20 rounded-xl p-4 text-sm resize-none h-20 outline-none focus:border-accent-orange transition-colors"
          />
          <CircleAlertIcon
            className={"text-body text-xs absolute bottom-2 right-2"}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {dietaryTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleToggleTag(idx)}
              className={`py-2 px-4 rounded-sm text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                tag.active
                  ? "bg-text-primary/20 text-text-primary border "
                  : "bg-white/50 text-body border border-body/20"
              }`}
            >
              <span className="text-[10px]">
                {tag.active ? <CloseIcon /> : <PlusIcon />}
              </span>
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default FoodPreferences;
