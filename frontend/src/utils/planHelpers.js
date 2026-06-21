export const getWeeklyPlanKey = () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      if (parsed.id) return `weekly_meal_plan_${parsed.id}`;
      if (parsed.email) return `weekly_meal_plan_${parsed.email}`;
    } catch (e) {
      console.error("Failed to parse user for weekly plan cache key", e);
    }
  }
  return "weekly_meal_plan";
};

export const getMenuMealsKey = () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      if (parsed.id) return `menu_meals_${parsed.id}`;
      if (parsed.email) return `menu_meals_${parsed.email}`;
    } catch (e) {
      console.error("Failed to parse user for menu meals cache key", e);
    }
  }
  return "menu_meals";
};
