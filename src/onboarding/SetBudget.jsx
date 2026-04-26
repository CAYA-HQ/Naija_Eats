import { Link } from "react-router-dom";

const SetBudget = () => {
  const currentStep = 1;
  const budgets = [
    "₦4,000 - ₦5,000",
    "₦5,500 - ₦7,000",
    "₦7,000 - ₦10,000",
    "₦10,500+",
  ];

  return (
    <div className=" h-full flex flex-col justify-center items-center gap-4 px-4 pb-5">
      <h1 className="text-[32px] text-left font-bold mb-8 px-5">
        What's your weekly food budget?
      </h1>
      <ul className="flex-col w-full justify-start items-center gap-5">
        {budgets.map((budget) => (
          <li className="flex items-center gap-1 py-4" key={budget}>
            <input type="checkbox" />
            {budget}
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="custom-range"
        id="range"
        placeholder="Custom Range"
        className="border-text-primary rounded-xl border-2 mr-auto py-2 px-4 "
      />
      <p className="italic text-left w-full">This can be changed ANYTIME</p>
      <Link
        className="py-3 px-6 rounded-xl border-2 border-text-primary text-text-primary w-full mx-auto max-w-[200px] my-4 uppercase "
        to="/onboarding/cooking-frequency"
      >
        Next
      </Link>
      <div className="flex gap-5 items-center justify-start">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index <= currentStep
                ? "w-3 h-3 bg-text-primary border border-text-primary"
                : "w-3 h-3 bg-transparent border border-text-primary"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SetBudget;
