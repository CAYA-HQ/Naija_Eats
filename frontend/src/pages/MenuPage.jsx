import { useState, useEffect } from "react";
import { SearchIcon } from "../constants/icons";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Soups", "Rice Dishes", "Swallows", "Proteins"];
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const meals = [
    {
      id: 1,
      name: "Smokey Party Jollof",
      price: "₦4,500",
      duration: "45 mins",
      description:
        "Authentic firewood-smoked Jollof rice served with peppered protein and...",
      img: "/images/smoked_jollof.png",
      category: "Rice Dishes",
    },
    {
      id: 2,
      name: "Swallow & Egusi Soup",
      price: "₦5,200",
      duration: "60 mins",
      description:
        "Hand-peeled melon seeds cooked with bitter-leaf, stockfish and assorted...",
      img: "/images/swallow_egusi.png",
      category: ["Swallows", "Soups"],
    },
    {
      id: 3,
      name: "Simple Beef Suya",
      price: "₦2,000",
      duration: "20 mins",
      description:
        "Premium beef cuts marinated in suya spice, grilled over red-hot charcoal...",
      img: "/images/beef_suya.png",
      category: "Proteins",
    },
    {
      id: 4,
      name: "Pounded Yam & Ogbono",
      price: "₦3,800",
      duration: "30 mins",
      description:
        "Fluffy, hand-pounded yam served with draw-soup rich in proteins.",
      img: "/images/ogbona.png",
      category: ["Rice Dishes", "Soups"],
    },
  ];
  const filteredMeals = meals.filter((meal) => {
    const matchesCategory =
      activeCategory === "All" ||
      [].concat(meal.category).includes(activeCategory);
    const matchesSearch =
      meal.name.toLowerCase().includes(debouncedValue.toLowerCase()) ||
      meal.description.toLowerCase().includes(debouncedValue.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="px-5 pt-8 flex flex-col gap-6">
      <h1 className="text-3xl font-display font-extrabold text-text-primary leading-tight">
        Discover Authentic
        <br />
        Flavors
      </h1>

      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
        <input
          type="text"
          placeholder="Search for Jollof, Egusi, Suya..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-white rounded-xl py-4 pl-12 pr-4 border border-text-muted outline-none placeholder:text-text-muted text-sm font-medium"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === category
                ? "bg-text-primary text-white shadow-lg"
                : "bg-[#D1D89D] text-text-primary hover:bg-[#c4cc8b]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 pb-12">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-text-primary rounded-md overflow-hidden shadow-xl flex flex-col"
          >
            <div className="relative h-56">
              <img
                src={meal.img}
                alt={meal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF7A1A"
                  strokeWidth="2.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 bg-text-primary/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="text-[10px] font-bold text-white uppercase">
                  {meal.duration}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-display font-bold text-white max-w-[70%] leading-tight">
                  {meal.name}
                </h3>
                <span className="text-sm font-bold text-white opacity-80">
                  {meal.price}
                </span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                {meal.description}
              </p>
              <button className="bg-[#FF7A1A] hover:bg-[#e66a13] text-white py-3.5 rounded-xs font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 mt-2">
                View Meal
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MenuPage;
