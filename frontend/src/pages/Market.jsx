import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, SearchIcon } from "../constants/icons";
import { WeeklySummaryCard } from "../components/ui/WeeklySummaryCard";
import { planService } from "../services/plan.api";
import transformTimetable from "../constants/weekPlan";
import EmptyState from "./EmptyState";

/* ─── module-level helpers ─────────────────────────────────────────────── */
const SLOT_ORDER = ["Breakfast", "Lunch", "Dinner"];

const SLOT_EMOJI = {
  Breakfast: "🌅",
  Lunch: "☀️",
  Dinner: "🌙",
};

function getTodayName() {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(),
  );
}

function normaliseSlot(type = "") {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

/* ─── Market ───────────────────────────────────────────────────────────── */
const Market = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Today's Meals");
  const [searchTerm, setSearchTerm] = useState("");
  const [customItems, setCustomItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

  const [todayMeals, setTodayMeals] = useState([]);
  const [planLoading, setPlanLoading] = useState(true);
  const [hasPlan, setHasPlan] = useState(true);

  const filters = ["Today's Meals", "This Week's Meals", "All"];

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await planService.getTimetable();
        const weekPlan = transformTimetable(data);
        const todayDay = weekPlan.find((d) => d.day === getTodayName());

        if (!todayDay || todayDay.meals.length === 0) {
          setHasPlan(false);
        } else {
          const sorted = [...todayDay.meals].sort(
            (a, b) =>
              SLOT_ORDER.indexOf(normaliseSlot(a.type)) -
              SLOT_ORDER.indexOf(normaliseSlot(b.type)),
          );
          setTodayMeals(sorted);
          setHasPlan(true);
        }
      } catch {
        setHasPlan(false);
      } finally {
        setPlanLoading(false);
      }
    };
    fetchPlan();
  }, []);

  const addCustomItem = () => {
    const name = newItemName.trim();
    if (!name) return;
    const price = parseFloat(newItemPrice) || 0;
    setCustomItems((prev) => [
      ...prev,
      { name, price, bought: false, id: Date.now() },
    ]);
    setNewItemName("");
    setNewItemPrice("");
    setShowAddForm(false);
  };

  const removeCustomItem = (id) =>
    setCustomItems((prev) => prev.filter((item) => item.id !== id));

  const toggleCustomBought = (id) =>
    setCustomItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item,
      ),
    );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  return (
    <main className="px-5 pt-6 flex flex-col gap-6 relative pb-10">
      <h1 className="text-[2.5rem] font-display font-extrabold text-text-primary leading-none">
        MARKET
      </h1>
      <WeeklySummaryCard />

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === filter
                ? "bg-accent-orange text-white shadow-lg shadow-orange-200"
                : "bg-black/5 text-text-muted hover:bg-black/10"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* ── Today's Meals ───────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-2xl font-display font-extrabold text-text-primary">
              Today&apos;s Meals
            </h2>
            <p className="text-xs text-text-muted font-medium">
              {getTodayName()} &bull;{" "}
              {hasPlan && todayMeals.length > 0
                ? `${todayMeals.length} meals planned`
                : "No active plan"}
            </p>
          </div>
          {hasPlan && todayMeals.length > 0 && (
            <button
              onClick={() => navigate("/weekly-plan")}
              className="text-accent-orange text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              Full Week
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* meal cards — inline JSX, no sub-components */}
        {planLoading ? (
          /* skeleton — inline grid, not a sub-component */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-text-primary/10 rounded-3xl overflow-hidden animate-pulse h-72"
              >
                <div className="h-44 bg-text-muted/20" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 w-2/3 bg-text-muted/20 rounded-full" />
                  <div className="h-3 w-1/2 bg-text-muted/10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : !hasPlan ? (
          <EmptyState />
        ) : (
          /* meal slot cards — inline map, not a sub-component */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {todayMeals.map((meal, idx) => {
              const slotLabel = normaliseSlot(meal.type);
              const emoji = SLOT_EMOJI[slotLabel] ?? "🍽️";
              return (
                <div
                  key={meal.slug ?? idx}
                  className="bg-text-primary rounded-3xl overflow-hidden text-white flex flex-col group transition-transform hover:-translate-y-1 duration-300 shadow-lg"
                >
                  {/* image */}
                  <div className="relative h-44 shrink-0 overflow-hidden">
                    <img
                      src={meal.image || "/images/dish.webp"}
                      alt={meal.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* slot badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      <span className="text-xs">{emoji}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                        {slotLabel}
                      </span>
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-base font-display font-bold leading-tight">
                        {meal.name}
                      </h3>
                      <span className="text-[11px] font-bold text-accent-orange whitespace-nowrap shrink-0">
                        {meal.price}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/meal/${meal.slug}`)}
                      className="mt-auto bg-accent-orange hover:bg-[#e66a13] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
                    >
                      <ArrowRightIcon />
                      View Recipe
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Search Bar */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
        <input
          type="text"
          placeholder="Search items..."
          name="item-search"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full bg-white border-none rounded-xl py-4 pl-12 pr-4 shadow-sm outline-none placeholder:text-text-muted text-sm"
        />
      </div>

      {/* Custom Items Section */}
      {(customItems.length > 0 || showAddForm) && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 opacity-80">
            <span className="text-xl">✏️</span>
            <h2 className="text-lg font-display font-bold text-text-primary">
              Custom Items
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {customItems
              .filter(
                (item) =>
                  !searchTerm ||
                  item.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-transparent"
                >
                  <div
                    onClick={() => toggleCustomBought(item.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      item.bought
                        ? "bg-accent-orange border-accent-orange"
                        : "border-text-muted"
                    }`}
                  >
                    {item.bought && (
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path
                          d="M1 4L4.5 7.5L11 1"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className="flex-1 flex flex-col cursor-pointer"
                    onClick={() => toggleCustomBought(item.id)}
                  >
                    <span
                      className={`text-sm font-bold ${
                        item.bought
                          ? "text-text-muted line-through"
                          : "text-text-primary"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.price > 0 && (
                      <span
                        className={`text-xs font-bold ${
                          item.bought
                            ? "text-text-muted line-through"
                            : "text-text-primary"
                        }`}
                      >
                        ₦{item.price.toLocaleString()}
                      </span>
                    )}
                    <button
                      onClick={() => removeCustomItem(item.id)}
                      className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors text-red-500"
                      aria-label="Remove item"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Add Custom Item */}
      {showAddForm ? (
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-sm border-2 border-accent-orange/30">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
            New Item
          </p>
          <input
            type="text"
            placeholder="Item name (e.g. Ugwu leaves)"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
            autoFocus
            className="w-full bg-[#F8F8DF] rounded-xl py-3 px-4 text-sm font-medium outline-none placeholder:text-text-muted border border-transparent focus:border-accent-orange/50 transition-colors"
          />
          <input
            type="number"
            placeholder="Estimated price (optional, ₦)"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
            className="w-full bg-[#F8F8DF] rounded-xl py-3 px-4 text-sm font-medium outline-none placeholder:text-text-muted border border-transparent focus:border-accent-orange/50 transition-colors"
          />
          <div className="flex gap-2">
            <button
              onClick={addCustomItem}
              className="flex-1 bg-accent-orange text-white rounded-xl py-2.5 text-sm font-bold hover:bg-[#e66a13] transition-colors"
            >
              Add Item
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewItemName("");
                setNewItemPrice("");
              }}
              className="px-4 bg-black/5 text-text-muted rounded-xl py-2.5 text-sm font-bold hover:bg-black/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-sm font-bold text-accent-orange hover:underline"
        >
          <span className="w-7 h-7 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange font-bold text-lg leading-none">
            +
          </span>
          Add Custom Item
        </button>
      )}
    </main>
  );
};

export default Market;
