import { Link } from "react-router-dom";

const CookingFrequency = () => {
  const currentStep = 2;
  const frequency = [
    "Daily (7 days)",
    "Most Days (5 - 6 days)",
    "Once in a while (3 - 4)",
    "Rarely (1 - 2)",
  ];

  return (
    <div className=" h-full flex flex-col justify-center items-center gap-4 px-4 pb-5">
      <h1 className="text-[32px] text-left font-bold mb-8">
        How often do you cook?
      </h1>
      <ul className="flex-col w-full justify-start items-center gap-5">
        {frequency.map((f) => (
          <li className="flex items-center gap-1 py-4" key={f}>
            <input type="checkbox" />
            {f}
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
      <p className="italic text-left w-full">We’ll plan accordingly</p>
      <Link
        to="/onboarding/buffer"
        className="py-3 px-6 rounded-xl border-2 border-text-primary text-text-primary text-center w-full mx-auto max-w-[200px] my-4 uppercase"
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

export default CookingFrequency;
