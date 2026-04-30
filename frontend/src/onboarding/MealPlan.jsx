// import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  FlameIcon,
  StopWatch,
  MenuLinesIcon,
} from "../constants/icons";

const MealPlan = () => {
  const restOfWeek = [
    { day: "THU", meal: "Grilled Croaker & Plantain" },
    { day: "FRI", meal: "Yam Porridge with Ugu" },
    { day: "SAT", meal: "Okra Soup & Oat Swallow" },
    { day: "SUN", meal: "Sunday Roast Chicken" },
  ];

  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-[500px] mx-auto bg-bg-background min-h-screen flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-2">
        <h1 className="text-[2.2rem] text-text-primary mb-2 leading-[1.1] font-display font-bold">
          Your Weekly Plan is Ready!
        </h1>
        <p className="text-body text-[0.95rem] leading-normal">
          We've curated 7 days of heritage-inspired healthy meals just for you.
        </p>
      </div>

      <div className="bg-[#2d4a1e] rounded-3xl overflow-hidden text-white relative shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1">
        <div className="w-full h-[220px] relative">
          <img
            src="/images/jollof.png"
            alt="Smoky Jollof"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-accent-orange text-white px-3 py-1 rounded-lg text-[0.7rem] font-bold tracking-wider uppercase font-inter">
            Monday
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-[1.4rem] m-0 text-white font-display">
              Smoky Jollof & Basil Chicken
            </h2>
            <button
              className="text-accent-orange bg-transparent border-none cursor-pointer p-1 flex items-center justify-center transition-transform duration-200 hover:scale-110"
              aria-label="Like"
            >
              <HeartIcon className="w-6 h-6 fill-current" />
            </button>
          </div>
          <p className="text-[0.85rem] opacity-80 mb-4 leading-[1.4]">
            A nutrient-dense twist on a classic, using brown rice and organic
            peppers.
          </p>
          <div className="flex gap-4 text-[0.75rem] opacity-70">
            <div className="flex items-center gap-1">
              <StopWatch className="w-4 h-4" />
              <span>45 mins</span>
            </div>
            <div className="flex items-center gap-1">
              <FlameIcon className="w-4 h-4" />
              <span>520 kcal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-[#2d4a1e] rounded-2xl flex items-center p-3 gap-4 text-white no-underline transition-colors duration-200 hover:bg-[#385a26] cursor-pointer">
          <img
            src="/images/salad.png"
            alt="Garden Egg Salad"
            className="w-[60px] h-[60px] rounded-lg object-cover"
          />
          <div className="flex-1">
            <span className="text-[0.65rem] text-accent-orange uppercase font-bold mb-0.5">
              Tuesday
            </span>
            <h3 className="text-base m-0 font-semibold font-inter">
              Garden Egg Salad
            </h3>
            <p className="text-[0.75rem] opacity-70 m-0">
              Light & refreshing citrus zest
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5" />
        </div>

        <div className="bg-[#2d4a1e] rounded-2xl flex items-center p-3 gap-4 text-white no-underline transition-colors duration-200 hover:bg-[#385a26] cursor-pointer">
          <img
            src="/images/egusi.png"
            alt="Lean Beef Egusi"
            className="w-[60px] h-[60px] rounded-lg object-cover"
          />
          <div className="flex-1">
            <span className="text-[0.65rem] text-accent-orange uppercase font-bold mb-0.5">
              Wednesday
            </span>
            <h3 className="text-base m-0 font-semibold font-inter">
              Lean Beef Egusi
            </h3>
            <p className="text-[0.75rem] opacity-70 m-0">
              Rich in protein and healthy fats
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl text-text-primary mb-4 font-display font-bold">
          Rest of the Week
        </h3>
        <div className="flex flex-col">
          {restOfWeek.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-4 border-b border-black/5"
            >
              <span className="text-accent-orange font-bold text-[0.75rem] w-10 uppercase">
                {item.day}
              </span>
              <span className="flex-1 text-text-primary font-medium text-[0.95rem] ml-4">
                {item.meal}
              </span>
              <MenuLinesIcon className="text-accent-orange opacity-60 w-5 h-5" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#2d4a1e]/5 border-2 border-dashed border-[#2d4a1e]/20 rounded-2xl p-6 text-center mt-4">
        <div className="text-[#8b5e3c] mb-2 flex justify-center">
          <ShoppingCartIcon className="w-8 h-8" />
        </div>
        <h4 className="text-[1.4rem] mb-2 text-text-primary font-display font-bold">
          Shopping List Ready
        </h4>
        <p className="text-[0.85rem] text-body mb-5">
          All ingredients for this week are automatically calculated for your
          cart.
        </p>
        <button className="bg-transparent border border-text-primary text-text-primary px-6 py-2.5 rounded-lg font-semibold text-[0.9rem] cursor-pointer transition-all duration-200 w-full hover:bg-text-primary hover:text-white">
          View Shopping List
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <button
          className="bg-accent-orange text-white border-none py-3.5 rounded-lg font-bold text-base cursor-pointer transition-colors duration-200 hover:bg-[#e66a14]"
          onClick={() => navigate("/weekly-plan")}
        >
          View Full Plan
        </button>
        <button className="bg-white border-[1.5px] border-[#2d4a1e] text-[#2d4a1e] py-3.5 rounded-lg font-bold text-base cursor-pointer transition-all duration-200 hover:bg-[#f8fcf5]">
          Regenerate Plan
        </button>
      </div>
    </div>
  );
};

export default MealPlan;
