import { MEAL_DETAILS } from "../constants/mealDetails";
import { IngredientLookup } from "../constants/ingredientLookup";

export const SLOT_ORDER = ["Breakfast", "Lunch", "Dinner"];

export const SLOT_EMOJI = {
  Breakfast: "🌅",
  Lunch: "☀️",
  Dinner: "🌙",
};

export function getTodayName() {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(),
  );
}

export function normaliseSlot(type = "") {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

export function getMealIngredients(meal) {
  if (meal.ingredients && Array.isArray(meal.ingredients) && meal.ingredients.length > 0) {
    return meal.ingredients.map(ing => typeof ing === "string" ? ing : ing.name);
  }
  if (meal.slug && MEAL_DETAILS[meal.slug]?.ingredients) {
    return MEAL_DETAILS[meal.slug].ingredients;
  }
  const normName = meal.name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const foundKey = Object.keys(MEAL_DETAILS).find(
    (k) => k.toLowerCase().replace(/[^a-z0-9]/g, "") === normName
  );
  if (foundKey && MEAL_DETAILS[foundKey]?.ingredients) {
    return MEAL_DETAILS[foundKey].ingredients;
  }
  return [
    "Fresh ingredients for " + meal.name,
    "Salt and pepper to taste"
  ];
}

export function findLookupIngredient(ingStr) {
  const cleanStr = ingStr.toLowerCase();
  const sortedKeys = Object.keys(IngredientLookup).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    const cleanKey = key.toLowerCase();

    if (cleanStr.includes(cleanKey)) {
      return { key, data: IngredientLookup[key] };
    }

    let keyToCheck = cleanKey;
    if (cleanKey.endsWith("s") && cleanKey.length > 3) {
      keyToCheck = cleanKey.slice(0, -1);
    }
    if (cleanStr.includes(keyToCheck)) {
      return { key, data: IngredientLookup[key] };
    }
  }
  return null;
}
