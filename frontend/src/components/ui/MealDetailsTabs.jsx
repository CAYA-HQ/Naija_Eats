import { useState } from "react";

const MealDetailsTabs = ({ meal }) => {
  const [activeTab, setActiveTab] = useState("INGREDIENTS");
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const selectAllIngredients = () => {
    const allChecked = {};
    meal?.ingredients?.forEach((_, i) => {
      allChecked[i] = true;
    });
    setCheckedIngredients(allChecked);
  };
  return (
    <>
      {/* Tabs */}
      <div className="mt-8 px-5">
        <div className="flex justify-around border-b border-black/5">
          {["INGREDIENTS", "STEPS", "TIPS"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-bold tracking-widest transition-all relative cursor-pointer ${
                activeTab === tab
                  ? "text-accent-orange"
                  : "text-text-primary/40 hover:text-text-primary/60"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-orange" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 mb-24">
        {activeTab === "INGREDIENTS" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-text-link">
                Required Ingredients
              </h2>
              <button
                onClick={selectAllIngredients}
                className="text-[10px] font-bold text-accent-orange uppercase tracking-wider"
              >
                Select All
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {meal.ingredients.map((item, index) => (
                <label
                  key={index}
                  className="flex items-center gap-4 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      checked={!!checkedIngredients[index]}
                      onChange={() => toggleIngredient(index)}
                    />
                    <div className="w-6 h-6 border-2 border-black/10 rounded-md peer-checked:bg-accent-orange peer-checked:border-accent-orange transition-all" />
                    <svg
                      className="absolute top-1 left-1 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span
                    className={`text-[15px] font-medium transition-all ${
                      checkedIngredients[index]
                        ? "text-text-primary/40 line-through"
                        : "text-text-primary"
                    }`}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === "STEPS" && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {meal.steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-text-link text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-lg shadow-text-link/20">
                    {index + 1}
                  </div>
                  {index !== meal.steps.length - 1 && (
                    <div className="w-0.5 h-full bg-black/5 rounded-full" />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="text-lg font-display font-bold text-text-link mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-text-primary/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "TIPS" && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300 relative z-1">
            {meal.tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-black/5"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${tip.color} flex items-center justify-center shrink-0`}
                >
                  {tip.icon}
                </div>
                <p className="text-[13px] text-text-primary/80 leading-relaxed">
                  {tip.text}
                </p>
              </div>
            ))}

            <div className="mt-4 bg-text-link rounded-[24px] p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold mb-3 italic">
                  {meal.proTip.title}
                </h3>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                  {meal.proTip.text}
                </p>
              </div>
              {/* Subtle background decoration */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-black/5 rounded-full blur-xl" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MealDetailsTabs;
