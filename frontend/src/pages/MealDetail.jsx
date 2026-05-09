import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  StopWatch,
  UtensilsIcon,
  ChevronRightIcon,
  SpiceIcon,
  LeafIcon,
  GrainIcon,
} from "../constants/icons";
import Button from "../components/ui/Button";

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("INGREDIENTS");
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const meal = {
    id: id,
    name: "Jollof Rice & Grilled Fish",
    image: "/images/jollof_fish_plantains.png",
    isPremium: true,
    time: "45 MINS",
    cost: "LOW COST",
    servings: "4 SERVINGS",
    ingredients: [
      "3 cups Long-grain Parboiled Rice",
      "6 Large Red Bell Peppers (Tatashe)",
      "2 Fresh Tilapia Fish (medium size)",
      "1 cup Vegetable Oil",
      "Seasoning cubes & Bay leaves",
    ],
    steps: [
      {
        title: "Prepare the Base",
        desc: "Blend red bell peppers, scotch bonnets, onions, and fresh tomatoes until smooth. Pour into a pot and boil down until the water evaporates and you're left with a thick paste.",
      },
      {
        title: "Parboil the Rice",
        desc: "Wash long-grain parboiled rice thoroughly until the water runs clear. Parboil in lightly salted water for 5-7 minutes, then drain and set aside.",
      },
      {
        title: "The Stew Base",
        desc: "Heat vegetable oil in a large pot. Fry sliced onions until translucent. Add tomato paste and fry for 5 minutes, then add your boiled-down pepper mix. Season with curry powder, thyme, bay leaves, and bouillon cubes.",
      },
      {
        title: "Fry Tilapia",
        desc: "While the stew simmers, season fresh tilapia fillets with salt and pepper. Fry in a separate pan until the skin is golden and crispy. Set aside to serve with the finished rice.",
      },
      {
        title: "The Final Simmer",
        desc: "Add the parboiled rice to the stew. Add beef or chicken stock until the liquid just covers the rice. Cover tightly with foil and a lid. Simmer on very low heat until the rice is tender and has developed that signature smoky bottom flavor.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "Use a tight lid to trap steam for that smoky flavor. Covering the pot with foil before the lid creates an airtight seal that infuses the rice with the authentic 'party' aroma.",
        color: "bg-[#8B4513]/10",
      },
      {
        icon: <LeafIcon className="w-6 h-6 text-text-primary" />,
        text: "Adjust heat to medium-low once rice is added to prevent burning. Slow cooking ensures every grain is perfectly tender without sticking to the bottom of the pot.",
        color: "bg-[#2D5A27]/10",
      },
      {
        icon: <GrainIcon className="w-6 h-6 text-accent-orange" />,
        text: "Garnish with fresh onions for extra crunch. Adding them in the last 2 minutes of steaming allows them to soften slightly while maintaining a fresh bite.",
        color: "bg-accent-oranetext-accent-orange/10",
      },
    ],
    proTip: {
      title: "Pro Tip: The Rice Choice",
      text: "Long-grain parboiled rice is the gold standard for Jollof. It holds its shape beautifully and doesn't get mushy, ensuring each grain stays distinct and perfectly coated in sauce.",
    },
  };

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const selectAllIngredients = () => {
    const allChecked = {};
    meal.ingredients.forEach((_, i) => {
      allChecked[i] = true;
    });
    setCheckedIngredients(allChecked);
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bg-linear-to-b inset-0 from-transparent via-transparent to-white/50"></div>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <ChevronRightIcon className="w-6 h-6 rotate-180 text-text-primary" />
          </button>
        </div>
      </div>

      <div className="px-5 -mt-10 relative z-10">
        <div className="bg-white rounded-[32px] p-6 shadow-xl border border-black/5">
          <div className="flex justify-between items-start mb-2">
            <div>
              {meal.isPremium && (
                <span className="inline-block bg-[#C4E1A4] text-text-link text-[10px] font-bold px-2 py-1 rounded-full mb-2 uppercase tracking-wider">
                  Premium Recipe
                </span>
              )}
              <h1 className="text-3xl font-display font-bold text-text-primary leading-tight">
                {meal.name}
              </h1>
            </div>
            <button className="text-accent-orange hover:scale-110 transition-transform">
              <HeartIcon className="w-6 h-6 fill-current" />
            </button>
          </div>

          <div className="h-px bg-black/5 w-full my-4" />

          <div className="flex justify-between items-center text-center">
            <div className="flex flex-col items-center gap-1">
              <StopWatch className="w-5 h-5 text-text-link" />
              <span className="text-[10px] font-bold text-text-primary/60">
                {meal.time}
              </span>
            </div>
            <div className="w-1 h-8 bg-black/5" />
            <div className="flex flex-col items-center gap-1">
              <SpiceIcon className="w-5 h-5 text-text-link" />
              <span className="text-[10px] font-bold text-text-primary/60">
                {meal.cost}
              </span>
            </div>
            <div className="w-1 h-8 bg-black/5" />
            <div className="flex flex-col items-center gap-1">
              <UtensilsIcon className="w-5 h-5 text-text-link" />
              <span className="text-[10px] font-bold text-text-primary/60">
                {meal.servings}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 px-5">
        <div className="flex justify-between border-b border-black/5">
          {["INGREDIENTS", "STEPS", "TIPS"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-bold tracking-widest transition-all relative ${
                activeTab === tab
                  ? "text-text-link"
                  : "text-text-primary/40 hover:text-text-primary/60"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text-link" />
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
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
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

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-24 left-0 w-full px-5 pb-6 bg-linear-to-t from-bg-background via-bg-background/80 to-transparent pt-10 pointer-events-none">
        <Button
          variant="primary"
          className="w-full shadow-2xl shadow-accent-orange/30 flex items-center justify-center gap-2 py-4 text-lg pointer-events-auto"
        >
          Start Cooking
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MealDetail;
