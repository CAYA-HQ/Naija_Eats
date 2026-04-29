import { useState } from "react";
import { Link } from "react-router-dom";
import CustomCheckbox from "../components/CustomCheckbox";

const Buffer = () => {
  const currentStep = 3;
  const bufferOptions = ["10%", "15%", "20%", "No Buffer"];

  const [selectedBuffers, setSelectedBuffers] = useState([]);

  const handleToggle = (buffer) => {
    setSelectedBuffers((prev) =>
      prev.includes(buffer)
        ? prev.filter((item) => item !== buffer)
        : [...prev, buffer],
    );
  };

  return (
    <div className=" h-full flex flex-col justify-center items-center gap-4 px-4 py-5">
      <h1 className="text-[32px] text-left font-bold mb-8">
        Select your buffer range?
      </h1>
      <p className="italic text-left">
        This is allow for price fluctuations while shopping
      </p>
      <ul className="flex flex-col w-full justify-start items-center gap-2">
        {bufferOptions.map((buffer) => (
          <li
            className="flex items-center gap-3 py-4 w-full cursor-pointer"
            key={buffer}
            onClick={() => handleToggle(buffer)}
          >
            <CustomCheckbox
              checked={selectedBuffers.includes(buffer)}
            />
            <span className="text-sm font-medium">{buffer}</span>
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
        to="/onboarding/food-preferences"
        className="py-3 px-6 rounded-xl border-2 border-text-primary text-text-primary text-center w-full mx-auto max-w-[200px] my-4 uppercase"
      >
        Next
      </Link>
      <div className="flex gap-5 items-center justify-start mt-6">
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

export default Buffer;
