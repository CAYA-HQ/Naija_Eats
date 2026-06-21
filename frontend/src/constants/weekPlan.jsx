import { BurgerIcon, ForkAndKnife, SnackIcon, UtensilsIcon } from "./icons";

const DAY_COLORS = {
  Monday: "bg-orange-800",
  Tuesday: "bg-green-900",
  Wednesday: "bg-green-800",
  Thursday: "bg-orange-900",
  Friday: "bg-green-700",
  Saturday: "bg-orange-700",
  Sunday: "bg-green-800",
};

const SLOT_ICONS = {
  Breakfast: <SnackIcon className="text-text-primary" />,
  Lunch: <BurgerIcon className="text-accent-orange" />,
  Dinner: <ForkAndKnife className="text-text-primary" />,
};

// ✅ no more hardcoded map — just use DB image_url
// generic fallback only when DB has no image yet
export function getMealImage(mealName) {
  return "/images/dish.webp";
}

export default function transformTimetable(apiData) {
  const grouped = {};
  const items = apiData.items || apiData.data?.items || [];

  for (const item of items) {
    const { day_of_week, meal_slot, meal } = item;

    if (!grouped[day_of_week]) {
      grouped[day_of_week] = {
        day: day_of_week,
        color: DAY_COLORS[day_of_week] ?? "bg-green-800",
        meals: [],
      };
    }

    grouped[day_of_week].meals.push({
      id: item.id,
      mealId: meal.id,
      slug: meal.name.toLowerCase().replace(/\s+/g, "-"),
      type: meal_slot.toUpperCase(),
      name: meal.name,
      ingredients: meal.ingredients || [],
      prep_time_mins: meal.prep_time_mins ?? null,
      instructions: meal.instructions ?? null,
      // ✅ DB image_url only — generic fallback if null
      image: meal.image_url || "/images/dish.webp",
      price: `₦${Number(meal.price_min).toLocaleString()} - ₦${Number(meal.price_max).toLocaleString()}`,
      icon: SLOT_ICONS[meal_slot] ?? (
        <UtensilsIcon className="text-text-primary" />
      ),
    });
  }

  const ORDER = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return ORDER.filter((d) => grouped[d]).map((d) => grouped[d]);
}
