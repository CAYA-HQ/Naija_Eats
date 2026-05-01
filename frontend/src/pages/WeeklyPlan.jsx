// import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  FilterIcon,
  CoffeeIcon,
  UtensilsIcon,
  ForkAndKnife,
  TrendDownIcon,
} from "../constants/icons";

const WeeklyPlan = () => {
  const navigate = useNavigate();
  const weeklyPlan = [
    {
      day: "Sunday",
      color: "bg-green-800",
      meals: [
        {
          type: "BREAKFAST",
          name: "Bread & Egg",
          price: "₦700",
          icon: <CoffeeIcon className="text-green-600" />,
        },
        {
          type: "LUNCH",
          name: "Jollof Rice & Grilled Fish",
          price: "₦1,600",
          icon: <UtensilsIcon className="text-orange-500" />,
        },
        {
          type: "DINNER",
          name: "Garri & Groundnut",
          price: "₦400",
          icon: <ForkAndKnife className="text-green-500" />,
        },
      ],
    },
    {
      day: "Monday",
      color: "bg-orange-800",
      meals: [
        {
          type: "BREAKFAST",
          name: "Toast & Tea",
          price: "₦600",
          icon: <CoffeeIcon className="text-green-600" />,
        },
        {
          type: "LUNCH",
          name: "Beans & Fried Plantain",
          price: "₦900",
          icon: <UtensilsIcon className="text-orange-500" />,
        },
        {
          type: "DINNER",
          name: "Indomie & Egg",
          price: "₦700",
          icon: <ForkAndKnife className="text-green-500" />,
        },
      ],
    },
    {
      day: "Tuesday",
      color: "bg-green-900",
      meals: [
        {
          type: "BREAKFAST",
          name: "Pap & Akara",
          price: "₦700",
          icon: <CoffeeIcon className="text-green-600" />,
        },
        {
          type: "LUNCH",
          name: "Simple Beef Suya & Bread",
          price: "₦1,100",
          icon: <UtensilsIcon className="text-orange-500" />,
        },
        {
          type: "DINNER",
          name: "Rice & Stew",
          price: "₦650",
          icon: <ForkAndKnife className="text-green-500" />,
        },
      ],
    },
    {
      day: "Wednesday",
      color: "bg-green-800",
      meals: [
        {
          type: "BREAKFAST",
          name: "Bread & Tea",
          price: "₦500",
          icon: <CoffeeIcon className="text-green-600" />,
        },
        {
          type: "LUNCH",
          name: "Egusi & Pounded Yam",
          price: "₦1,400",
          icon: <UtensilsIcon className="text-orange-500" />,
        },
        {
          type: "DINNER",
          name: "Fried Yam & Egg Sauce",
          price: "₦900",
          icon: <ForkAndKnife className="text-green-500" />,
        },
      ],
    },
  ];

  return (
    <div className="bg-bg-background min-h-screen pb-20">
      {/* Weekly Budget Summary Card */}
      <div className="p-4">
        <div className="bg-text-link rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
              Weekly Budget Summary
            </span>
            <div className="text-4xl font-display font-bold mt-1">₦8,900</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] opacity-80">
              <TrendDownIcon className={"text-lg"} />
              <span>12% lower than last week</span>
            </div>
          </div>
          <Button
            variant="primary"
            className="absolute right-6 bottom-6 py-2 px-6 rounded-xl text-sm"
          >
            Adjust
          </Button>
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-white/5 rounded-full"></div>
        </div>
      </div>

      {/* Title Header */}
      <div className="px-5 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-display font-extrabold text-text-primary">
          Full Weekly Plan
        </h2>
        <FilterIcon className="text-text-primary w-6 h-6 opacity-80 cursor-pointer" />
      </div>

      {/* Plan List */}
      <div className="px-4 space-y-6">
        {weeklyPlan.map((dayPlan, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-6 rounded-full ${dayPlan.color}`}></div>
              <h3 className="text-lg font-display font-bold text-text-primary">
                {dayPlan.day}
              </h3>
            </div>

            <div className="bg-white border border-text-muted/20 rounded-2xl overflow-hidden shadow-sm">
              {dayPlan.meals.map((meal, mIdx) => (
                <div
                  key={mIdx}
                  className={`flex items-center gap-4 p-4 ${
                    mIdx !== dayPlan.meals.length - 1
                      ? "border-b border-text-muted/10"
                      : ""
                  }`}
                >
                  <div className="w-12 h-12 bg-text-muted/10 rounded-xl flex items-center justify-center">
                    {meal.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-text-muted/70 tracking-wider">
                      {meal.type}
                    </span>
                    <div className="text-sm font-bold text-text-primary">
                      {meal.name}
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-orange-900">
                    {meal.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg-background/80 backdrop-blur-md space-y-3 z-50">
        <Button
          variant="primary"
          className="w-full"
          onClick={() => navigate("/market")}
        >
          Accept Plan
        </Button>
        <Button
          variant="outline"
          className="w-full bg-white border-green-900 text-green-900"
        >
          Regenerate
        </Button>
      </div>
    </div>
  );
};

export default WeeklyPlan;
