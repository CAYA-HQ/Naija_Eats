import { useState } from "react";
import OnboardingLayout from "../layout/OnboardingLayout";
import {
  RhombusAlertIcon,
  CircleAlertIcon,
  CloseIcon,
  PlusIcon,
} from "../../constants/icons";
import { useNavigate } from "react-router-dom";
import { Preferences } from "../../constants/preferences";

const FoodPreferences = () => {
  const navigate = useNavigate();
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const [allergyInput, setAllergyInput] = useState("");
  const [dietaryTags, setDietaryTags] = useState([
    { label: "Gluten-Free", active: true },
    { label: "Lactose-Intolerant", active: true },
    { label: "Nut-Free", active: false },
  ]);

  const handleTogglePref = (id) => {
    setSelectedPrefs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleToggleTag = (id) => {
    setDietaryTags((prev) =>
      prev.map((tag, i) => (i === id ? { ...tag, active: !tag.active } : tag)),
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
      <h1 className="text-[28px] lg:text-5xl font-bold leading-tight mb-2">
        What do you enjoy eating?
      </h1>
      <p className="text-sm lg:text-base text-body mb-6">
        Tell your flavour so we can help curate the best experience for you!
      </p>

      {/* Food Category Grid */}
      <div className="grid grid-cols-2 l:grid-cols-4 gap-3 mb-8">
        {Preferences.map((pref, id) => (
          <button
            key={id}
            onClick={() => handleTogglePref(id)}
            className="group relative rounded-2xl overflow-hidden h-36 lg:h-72 cursor-pointer transition-all duration-300 "
          >
            <img
              src={pref.image}
              alt={pref.category}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div
              className={` transition-all absolute inset-0 ${selectedPrefs.includes(id) ? "bg-text-primary/70 group-hover:bg-text-primary/70" : "bg-none group-hover:bg-white/50"}`}
            ></div>
            {/* Icon + Label */}
            <div
              className={`group-hover:bottom-2 transition-all w-[90%] absolute -bottom-20 h-20 left-1/2 -translate-x-1/2 right-0 flex flex-col items-center justify-center gap-2  py-1 px-2 rounded-sm ${selectedPrefs.includes(id) ? "bottom-2 bg-text-primary/75 text-white" : "-bottom-20 bg-white group-hover:bg-white "}`}
            >
              <span
                className={`text-lg  drop-shadow-md ${selectedPrefs.includes(id) ? "text-white" : "text-accent-orange"}`}
              >
                {pref.icon}
              </span>
              <span
                className={`${selectedPrefs.includes(id) ? "text-white" : "text-text-primary"} text-xs font-bold leading-tight drop-shadow-md`}
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
          <h2 className="text-base lg:text-2xl font-bold">
            Dietary Requirements
          </h2>
        </div>

        <p className="text- lg:text-base font-medium mb-3">
          Do you have any allergies?
        </p>

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
          {dietaryTags.map((tag, id) => (
            <button
              key={id}
              onClick={() => handleToggleTag(id)}
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
