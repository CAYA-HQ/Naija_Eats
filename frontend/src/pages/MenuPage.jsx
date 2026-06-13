import { useState, useEffect } from "react";
import {
  SearchIcon,
  MealCardHeartIcon,
  ClockIcon,
  MealArrowIcon,
} from "../constants/icons";
import { useNavigate } from "react-router-dom";
import { getMealImage } from "../constants/weekPlan";
import EmptyState from "./EmptyState";
import { planService } from "../services/plan.api";
import {
  SOUP_NAMES,
  SOUP_KEYWORDS,
  RICE_KEYWORDS,
} from "../constants/menuCategories";

function getCategoryLabel(meal) {
  const name = meal.name.toLowerCase().trim();
  const dbCategory = meal.category;

  // swallows — DB category is reliable here
  if (dbCategory === "Swallow") return "Swallows";

  // desserts — map to Proteins (or add Desserts tab if needed)
  if (dbCategory === "Dessert") return "Proteins";

  // exact soup name match first
  if (SOUP_NAMES.has(name)) return "Soups";

  // keyword soup match — catches combos like "Pounded Yam and Egusi Soup"
  // but skip swallow combos (already caught above)
  if (SOUP_KEYWORDS.some((kw) => name.includes(kw))) return "Soups";

  // rice / grain / noodle dishes
  if (RICE_KEYWORDS.some((kw) => name.includes(kw))) return "Rice Dishes";

  // anything left: snacks, sides, breakfast, protein mains
  return "Proteins";
}

function transformMeals(apiData) {
  const meals = apiData.data?.meals || [];
  return meals.map((meal) => ({
    id: meal.id,
    slug: meal.name.toLowerCase().replace(/\s+/g, "-"),
    name: meal.name,
    price: `₦${Number(meal.price_min).toLocaleString()} - ₦${Number(meal.price_max).toLocaleString()}`,
    duration: meal.prep_time_mins ? `${meal.prep_time_mins} mins` : "45 mins",
    description: Array.isArray(meal.instructions)
      ? meal.instructions[0] || "A delicious Nigerian meal."
      : meal.instructions || "A delicious Nigerian meal.",
    img: meal.image_url || getMealImage(meal.name),
    category: getCategoryLabel(meal),
  }));
}

// ── component ───────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Soups", "Rice Dishes", "Swallows", "Proteins"];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await planService.getAllMeals();
        setMeals(transformMeals(data));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const filteredMeals = meals.filter((meal) => {
    const matchesCategory =
      activeCategory === "All" || meal.category === activeCategory;
    const searchTarget = `${meal.name} ${meal.description}`.toLowerCase();
    const matchesSearch = searchTarget.includes(debouncedValue.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // counts per category for the tab badges
  const countFor = (cat) =>
    cat === "All"
      ? meals.length
      : meals.filter((m) => m.category === cat).length;

  return (
    <main className="px-5 pt-8 flex flex-col gap-6">
      <h1 className="text-3xl font-display font-extrabold text-text-primary leading-tight">
        Discover Authentic
        <br />
        Flavors
      </h1>

      {/* search */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
        <input
          type="text"
          placeholder="Search for Jollof, Egusi, Suya..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full max-w-xs bg-white rounded-xl py-4 pl-12 pr-4 border border-text-muted outline-none placeholder:text-text-muted text-sm font-medium"
        />
      </div>

      {/* category tabs with counts */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === category
                ? "bg-text-primary text-white shadow-lg"
                : "bg-[#D1D89D] text-text-primary hover:bg-[#c4cc8b]"
            }`}
          >
            {category}
            {!loading && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeCategory === category
                    ? "bg-white/20 text-white"
                    : "bg-text-primary/10 text-text-primary"
                }`}
              >
                {countFor(category)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* results count */}
      {!loading && !error && (
        <p className="text-xs text-text-muted -mt-3">
          Showing {filteredMeals.length}{" "}
          {filteredMeals.length === 1 ? "meal" : "meals"}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          {debouncedValue ? ` for "${debouncedValue}"` : ""}
        </p>
      )}

      {/* loading skeleton */}
      {loading ? (
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 pb-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-text-primary/10 rounded-md overflow-hidden animate-pulse h-[420px]"
            >
              <div className="h-[50%] bg-text-muted/20" />
              <div className="p-6 flex flex-col gap-3">
                <div className="h-4 w-3/4 bg-text-muted/20 rounded-full" />
                <div className="h-3 w-full bg-text-muted/10 rounded-full" />
                <div className="h-3 w-5/6 bg-text-muted/10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <EmptyState />
      ) : filteredMeals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-3xl">
            🍽️
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            No meals found
          </h3>
          <p className="text-sm text-text-muted max-w-xs">
            Try a different search term or category filter.
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-text-primary rounded-md overflow-hidden shadow-xl flex flex-col h-full max-h-[420px]"
            >
              <div className="relative h-[50%] overflow-hidden">
                <img
                  src={meal.img}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
                {/* category badge */}
                <div className="absolute top-4 left-4 bg-accent-orange/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                    {meal.category}
                  </span>
                </div>
                {/* heart */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                  <MealCardHeartIcon className="text-accent-orange" />
                </div>
                {/* duration */}
                <div className="absolute bottom-4 left-4 bg-text-primary/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                  <ClockIcon className="text-white" />
                  <span className="text-[10px] font-bold text-white uppercase">
                    {meal.duration}
                  </span>
                </div>
              </div>

              <div className="p-6 h-[50%] flex flex-col justify-between items-start gap-3">
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-xl font-display font-bold text-white max-w-[65%] leading-tight">
                    {meal.name}
                  </h3>
                  <span className="text-xs font-bold text-white/80 text-right max-w-[35%]">
                    {meal.price}
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium line-clamp-2">
                  {meal.description}
                </p>
                <button
                  className="bg-accent-orange hover:bg-accent-orange/75 text-white py-3.5 rounded-xs font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 w-full"
                  onClick={() => navigate(`/meal/${meal.slug}`)}
                >
                  View Meal
                  <MealArrowIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MenuPage;
