import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GeneratingPlan = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(2), 2500);
    const timer2 = setTimeout(() => setCurrentStep(3), 5000);
    const timer3 = setTimeout(() => setCurrentStep(4), 7500);
    const timer4 = setTimeout(() => navigate("/onboarding/meal-plan"), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto">
      <div className="relative w-56 h-56 mb-10 flex items-center justify-center">
        {/* Animated concentric rings */}
        <div className="absolute inset-0 rounded-full border-[5px] border-[#d8e3d2]/50"></div>
        <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-[#c6d7bc] animate-[spin_2s_linear_infinite]"></div>

        <div className="absolute inset-3 rounded-full border-[3px] border-accent-orange/10"></div>
        <div className="absolute inset-3 rounded-full border-[3px] border-transparent border-r-accent-orange/40 animate-[spin_3s_linear_infinite_reverse]"></div>

        <div className="absolute inset-[22px] rounded-full border border-accent-orange/20"></div>

        {/* Center Content */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2d5016"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          >
            <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
            <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
          </svg>
          <div className="flex gap-2 mt-1">
            <div
              className="w-2.5 h-2.5 rounded-full bg-[#a36017] animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2.5 h-2.5 rounded-full bg-[#a36017] animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2.5 h-2.5 rounded-full bg-[#a36017] animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <h1 className="font-display text-[28px] font-bold text-text-primary text-center mb-4 leading-[1.2]">
        Generating your
        <br />
        personalized meal plan...
      </h1>
      <p className="text-center text-text-primary/70 mb-10 text-[15px] leading-relaxed">
        Balancing authentic Nigerian flavors
        <br />
        with your health goals.
      </p>

      {/* Overall Progress bar */}
      <div className="w-full flex items-center gap-0 mb-8">
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-accent-orange transition-all duration-1000 ease-out"
            style={{
              width: `${Math.min(100, (currentStep - 1) * 33.33 + 15)}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Steps Container */}
      <div className="w-full flex flex-col gap-3">
        {/* Step 1 */}
        <div
          className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-500 ${currentStep > 1 ? "border-gray-100 bg-white shadow-sm" : "border-gray-200 bg-white shadow-md"}`}
        >
          <div className="flex items-center gap-3.5">
            {currentStep > 1 ? (
              <div className="w-6 h-6 rounded-full bg-text-link flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            ) : (
              <div className="w-6 h-6 flex items-center justify-center text-accent-orange animate-spin shrink-0">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
            )}
            <span
              className={`text-[14px] font-bold ${currentStep > 1 ? "text-text-primary" : "text-text-primary"}`}
            >
              Analyzing dietary preferences
            </span>
          </div>
          <span
            className={`text-[13px] font-semibold ${currentStep > 1 ? "text-gray-500" : "text-[#a36017]"}`}
          >
            {currentStep > 1 ? "Done" : "Active"}
          </span>
        </div>

        {/* Step 2 */}
        <div
          className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-500 ${currentStep > 2 ? "border-gray-100 bg-white shadow-sm" : currentStep === 2 ? "border-gray-200 bg-white shadow-md" : "border-dashed border-gray-200 bg-gray-50/50 opacity-60"}`}
        >
          <div className="flex items-center gap-3.5">
            {currentStep > 2 ? (
              <div className="w-6 h-6 rounded-full bg-text-link flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            ) : currentStep === 2 ? (
              <div className="w-6 h-6 flex items-center justify-center text-accent-orange animate-spin shrink-0">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
            ) : (
              <div className="w-6 h-6 flex items-center justify-center text-gray-400 shrink-0">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
            )}
            <span
              className={`text-[14px] font-bold ${currentStep >= 2 ? "text-text-primary" : "text-gray-500"}`}
            >
              Curating seasonal ingredients
            </span>
          </div>
          <span
            className={`text-[13px] font-semibold ${currentStep > 2 ? "text-gray-500" : currentStep === 2 ? "text-[#a36017]" : "text-gray-400"}`}
          >
            {currentStep > 2
              ? "Done"
              : currentStep === 2
                ? "Active"
                : "Pending"}
          </span>
        </div>

        {/* Step 3 */}
        <div
          className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-500 ${currentStep > 3 ? "border-gray-100 bg-white shadow-sm" : currentStep === 3 ? "border-gray-200 bg-white shadow-md" : "border-dashed border-gray-200 bg-gray-50/50 opacity-60"}`}
        >
          <div className="flex items-center gap-3.5">
            {currentStep > 3 ? (
              <div className="w-6 h-6 rounded-full bg-text-link flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            ) : currentStep === 3 ? (
              <div className="w-6 h-6 flex items-center justify-center text-accent-orange animate-spin shrink-0">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
            ) : (
              <div className="w-6 h-6 flex items-center justify-center text-gray-400 shrink-0">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
            )}
            <span
              className={`text-[14px] font-bold ${currentStep >= 3 ? "text-text-primary" : "text-gray-500"}`}
            >
              Optimizing nutritional macros
            </span>
          </div>
          <span
            className={`text-[13px] font-semibold ${currentStep > 3 ? "text-gray-500" : currentStep === 3 ? "text-[#a36017]" : "text-gray-400"}`}
          >
            {currentStep > 3
              ? "Done"
              : currentStep === 3
                ? "Active"
                : "Pending"}
          </span>
        </div>
      </div>
    </main>
  );
};

export default GeneratingPlan;
