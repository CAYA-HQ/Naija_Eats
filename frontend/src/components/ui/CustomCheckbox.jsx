const CustomCheckbox = ({ checked }) => {
  return (
    <div
      className={`relative flex items-center justify-center w-5 h-5 rounded-[5px] border-2 transition-all duration-300 ${
        checked
          ? "bg-accent-orange border-accent-orange"
          : "border-text-muted/50 bg-transparent"
      }`}
    >
      <div
        className={`absolute pointer-events-none transition-all duration-300 ease-out flex items-center justify-center ${
          checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="w-[10px] h-[5px] border-l-2 border-b-2 border-white -rotate-45 mb-1"></div>
      </div>
    </div>
  );
};

export default CustomCheckbox;
