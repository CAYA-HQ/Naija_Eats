const CustomRadio = ({ checked }) => {
  return (
    <div
      className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300 ${
        checked
          ? "border-accent-orange bg-transparent"
          : "border-text-muted/50 bg-transparent"
      }`}
    >
      <div
        className={`w-2.5 h-2.5 rounded-full bg-accent-orange transition-all duration-300 ${
          checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      />
    </div>
  );
};

export default CustomRadio;
