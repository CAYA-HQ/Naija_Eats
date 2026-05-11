// import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import {
  HeartIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  StopWatch,
  BoltIcon,
} from "../../constants/icons";

const MealPlan = () => {
  const navigate = useNavigate();

  const featuredMeal = {
    day: "MONDAY",
    title: "Jollof Rice & Grilled Fish",
    description:
      "A decade proven meal that has served various generations of African Heritage.",
    time: "45 mins",
    calories: "520 kcal",
    image: "/images/jollof_fish_plantains.png",
  };

  const subMeals = [
    {
      type: "BREAKFAST",
      title: "Toast and Tea",
      image: "/images/tea-bread-small-image.png",
    },
    {
      type: "DINNER",
      title: "Swallow and Egusi Soup",
      image: "/images/swallow_egusi.png",
    },
  ];

  const weeklyMeals = [
    {
      day: "TUESDAY",
      title: "Beans & Plantain",
      description: "A protein rich meal cooked with perfection",
      time: "30 MINS",
      image: "/images/dish.webp",
    },
    {
      day: "WEDNESDAY",
      title: "Grilled Croaker & Ofada",
      description:
        "Locally sourced Ofada rice served with peppered croaker fish.",
      time: "40 MINS",
      image: "/images/jollof-image.png",
    },
    {
      day: "THURSDAY",
      title: "Catfish Pepper Soup",
      description:
        "A light yet intensely flavorful aromatic broth with fresh catch.",
      time: "25 MINS",
      image: "/images/fisherman_soup.png",
    },
    {
      day: "FRIDAY",
      title: "Suya Spiced Beef Skewers",
      description:
        "Classic street-style Suya with yaji spice and vegetable slaw.",
      time: "20 MINS",
      image: "/images/beef_suya.png",
    },
    {
      day: "SATURDAY",
      title: "Fried Rice Platter",
      description: "Vibrant fried rice with liver, shrimp, and seasonal peas.",
      time: "50 MINS",
      image: "/images/nigerian-jollof-rice.webp",
    },
    {
      day: "SUNDAY",
      title: "Efo Riro & Pounded Yam",
      description: "Traditional spinach stew with stockfish and smoked prawns.",
      time: "45 MINS",
      image: "/images/egusi-image.png",
    },
  ];

  const budgetStats = [
    { label: "WEEKLY BUDGET", value: "₦45,000", highlight: true },
    { label: "TOTAL MEALS", value: "21 Meals" },
    { label: "PREP TIME (AVG)", value: "35 Mins" },
  ];

  const onBoardUser = () => {
    localStorage.setItem("onboarded", "true");
    navigate("/weekly-plan");
  };

  return (
    <div className="min-h-screen bg-[#f4f7e6] text-[#2d4a1e] font-inter pb-12">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <img
            src="/images/naijaeats-logo.svg"
            alt="NaijaEats"
            className="h-10"
          />
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
          <img
            src="/images/Avatar.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-display font-bold leading-tight mb-2">
            Your weekly plan is ready!
          </h1>
          <p className="text-lg opacity-80">
            We've curated 7 days of heritage-inspired healthy meals just for
            you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Weekly Budget Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <h2 className="text-2xl font-display font-bold mb-3">
                Your Weekly Budget
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Based on your preferences, your budget for the incoming week is
                stated below
              </p>

              <div className="space-y-5">
                {budgetStats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-gray-100 pb-4"
                  >
                    <span className="text-[0.65rem] font-bold text-gray-400 tracking-[0.1em]">
                      {stat.label}
                    </span>
                    <span
                      className={`font-display font-bold ${stat.highlight ? "text-[#f36c21] text-lg" : "text-[#2d4a1e]"}`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  variant="primary"
                  className="w-full py-4 rounded-2xl bg-[#f36c21] hover:bg-[#d55b1a]"
                  onClick={onBoardUser}
                >
                  View Full Plan
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-4 rounded-2xl border-[#2d4a1e] text-[#2d4a1e] hover:bg-[#2d4a1e] hover:text-white transition-all"
                >
                  Regenerate Plan
                </Button>
              </div>
            </div>

            {/* Nutritional Info Card */}
            <div className="bg-[#2d4a1e] rounded-[1.5rem] p-5 text-white shadow-lg overflow-hidden relative">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 opacity-80">
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <BoltIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase">
                    Nutritional Info
                  </span>
                </div>

                <div className="flex justify-between items-center px-2">
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] font-bold opacity-60 uppercase mb-0.5">
                      Avg Calories
                    </span>
                    <span className="text-2xl font-bold">650 kcal</span>
                  </div>
                  <div className="w-[1px] h-10 bg-white/20"></div>
                  <div className="flex flex-col items-end">
                    <span className="text-[0.6rem] font-bold opacity-60 uppercase mb-0.5">
                      Protein
                    </span>
                    <span className="text-2xl font-bold">42g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping List Card */}
            <div className="bg-white/50 border-2 border-dashed border-[#2d4a1e]/20 rounded-[2rem] p-8 text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#f36c21]">
                <ShoppingCartIcon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2 text-[#2d4a1e]">
                Shopping List Ready
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-[250px] leading-relaxed">
                All ingredients for this week are automatically calculated for
                your cart.
              </p>
              <Button
                variant="outline"
                className="w-full py-3 rounded-xl border-[#2d4a1e] text-[#2d4a1e] font-bold"
                onClick={() => navigate("/market")}
              >
                View Shopping List
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Featured Meal Card */}
            <div className="bg-[#2d4a1e] rounded-[2.5rem] overflow-hidden text-white shadow-2xl group cursor-pointer transition-all duration-500 hover:shadow-green-900/20">
              <div className="h-[480px] relative overflow-hidden">
                <img
                  src={featuredMeal.image}
                  alt={featuredMeal.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-[#f36c21] text-white px-4 py-1.5 rounded-lg text-[0.7rem] font-black tracking-widest uppercase">
                  {featuredMeal.day}
                </div>
              </div>
              <div className="p-10 relative">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-4xl md:text-5xl font-display font-bold max-w-lg leading-tight">
                    {featuredMeal.title}
                  </h2>
                  <button className="bg-white/10 hover:bg-[#f36c21] p-3 rounded-full transition-colors duration-300">
                    <HeartIcon className="w-7 h-7 text-white fill-none group-hover:fill-current" />
                  </button>
                </div>
                <p className="text-lg opacity-70 mb-8 max-w-xl leading-relaxed">
                  {featuredMeal.description}
                </p>
                <div className="flex gap-8 items-center border-t border-white/10 pt-8">
                  <div className="flex items-center gap-2">
                    <StopWatch className="w-5 h-5 text-[#f36c21]" />
                    <span className="font-bold opacity-80">
                      {featuredMeal.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">•</div>
                  <div className="flex items-center gap-2">
                    <BoltIcon className="w-5 h-5 text-[#f36c21]" />
                    <span className="font-bold opacity-80">
                      {featuredMeal.calories}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub Meals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subMeals.map((meal, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[1.5rem] p-4 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={meal.image}
                      alt={meal.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.65rem] font-black text-gray-400 tracking-widest mb-1 uppercase">
                      {meal.type}
                    </span>
                    <h3 className="text-xl font-display font-bold text-[#2d4a1e] group-hover:text-[#f36c21] transition-colors">
                      {meal.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {weeklyMeals.map((meal, i) => (
            <div
              key={i}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer border border-gray-100 flex flex-col h-full hover:-translate-y-2"
            >
              <div className="h-60 relative overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#2d4a1e] px-3 py-1 rounded-md text-[0.6rem] font-black tracking-widest uppercase shadow-sm">
                  {meal.day}
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-display font-bold leading-tight group-hover:text-[#2d4a1e]">
                    {meal.title}
                  </h3>
                  <button className="text-gray-200 hover:text-[#f36c21] transition-colors">
                    <HeartIcon className="w-6 h-6 fill-none" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                  {meal.description}
                </p>
                <div className="mt-auto pt-5 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest">
                    {meal.time}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#f36c21] transition-colors">
                    <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-[#f36c21] transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-200 bg-white/30 backdrop-blur-sm py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-8">
        <div className="flex gap-12 font-medium">
          <a href="#" className="hover:text-[#2d4a1e] transition-colors">
            Help Center
          </a>
          <a href="#" className="hover:text-[#2d4a1e] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[#2d4a1e] transition-colors">
            Terms
          </a>
        </div>
        <div className="text-gray-400">
          © 2026 NaijaEats. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MealPlan;
