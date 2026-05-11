import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";
import { _res } from "../utils/helper";

const router = Router();

// POST /preference
// Saves onboarding data for the authenticated user across 3 tables:
// budgets, household_profiles, and user_preferences
router.post("/preference", async (req: Request, res: Response) => {
  const user = req.user!;

  const {
    // budgets table
    amount,
    frequency,
    fluctuation_buffer,
    // household_profiles table
    household_size,
    daily_meals,
    is_dessert,
    cooking_frequency,
    // user_preferences table (any extra preference strings e.g. "vegetarian")
    preferences,
    // user_allergies table
    allergies,
  } = req.body;

  try {
    // Upsert budget — one budget row per user
    const { error: budgetError } = await supabase
      .from("budgets")
      .upsert(
        { user_id: user.id, amount, frequency, fluctuation_buffer },
        { onConflict: "user_id" }
      );
    if (budgetError) return _res.error(500, res, budgetError.message);

    // Upsert household profile
    const { error: householdError } = await supabase
      .from("household_profiles")
      .upsert(
        { user_id: user.id, household_size, daily_meals, is_dessert, cooking_frequency },
        { onConflict: "user_id" }
      );
    if (householdError) return _res.error(500, res, householdError.message);

    // Insert preferences (delete old ones first to avoid duplicates)
    if (preferences && Array.isArray(preferences) && preferences.length > 0) {
      await supabase.from("user_preferences").delete().eq("user_id", user.id);
      const prefRows = preferences.map((p: string) => ({ user_id: user.id, preference: p }));
      const { error: prefError } = await supabase.from("user_preferences").insert(prefRows);
      if (prefError) return _res.error(500, res, prefError.message);
    }

    // Insert allergies (delete old ones first to avoid duplicates)
    if (allergies && Array.isArray(allergies) && allergies.length > 0) {
      await supabase.from("user_allergies").delete().eq("user_id", user.id);
      const allergyRows = allergies.map((a: string) => ({ user_id: user.id, allergy: a }));
      const { error: allergyError } = await supabase.from("user_allergies").insert(allergyRows);
      if (allergyError) return _res.error(500, res, allergyError.message);
    }

    return _res.success(200, res, "Preferences saved successfully");
  } catch (err) {
    return _res.error(500, res, "Failed to save preferences");
  }
});

// GET /meals
// Returns all meals from the catalogue, with optional filtering by category
// Query params: ?category=breakfast|lunch|dinner
router.get("/meals", async (req: Request, res: Response) => {
  const { category } = req.query;

  try {
    let query = supabase.from("meals").select("*").order("name");

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) return _res.error(500, res, error.message);

    return _res.success(200, res, "Meals retrieved successfully", data);
  } catch (err) {
    return _res.error(500, res, "Failed to retrieve meals");
  }
});

// POST /meals-plan/generate
// Creates a new meal plan for the authenticated user.
// The frontend sends the chosen meal IDs per day/slot — the backend
// persists the plan and its items, then returns the full plan.
//
// Expected body:
// {
//   items: [
//     { meal_id: "uuid", day_of_week: "monday", meal_slot: "breakfast" },
//     { meal_id: "uuid", day_of_week: "monday", meal_slot: "lunch" },
//     ...
//   ]
// }
router.post("/meals-plan/generate", async (req: Request, res: Response) => {
  const user = req.user!;
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return _res.error(400, res, "items array is required");
  }

  try {
    // 1. Create the meal plan record
    const { data: plan, error: planError } = await supabase
      .from("meal_plans")
      .insert({ user_id: user.id, status: "active" })
      .select()
      .single();
    if (planError) return _res.error(500, res, planError.message);

    // 2. Insert all meal plan items linked to this plan
    const itemRows = items.map((item: {
      meal_id: string;
      day_of_week: string;
      meal_slot: string;
    }) => ({
      plan_id: plan.id,
      meal_id: item.meal_id,
      day_of_week: item.day_of_week,
      meal_slot: item.meal_slot,
    }));

    const { error: itemsError } = await supabase
      .from("meal_plan_items")
      .insert(itemRows);
    if (itemsError) return _res.error(500, res, itemsError.message);

    // 3. Return the plan with all its items and meal details
    const { data: fullPlan, error: fetchError } = await supabase
      .from("meal_plans")
      .select(`
        *,
        meal_plan_items (
          id,
          day_of_week,
          meal_slot,
          meals (
            id,
            name,
            category,
            price_min,
            price_max,
            prep_time_mins,
            dietary_tags
          )
        )
      `)
      .eq("id", plan.id)
      .single();
    if (fetchError) return _res.error(500, res, fetchError.message);

    return _res.success(201, res, "Meal plan generated successfully", fullPlan);
  } catch (err) {
    return _res.error(500, res, "Failed to generate meal plan");
  }
});

// GET /meals-plan/:id
// Returns a saved meal plan with all its meals, grouped by day
router.get("/meals-plan/:id", async (req: Request, res: Response) => {
  const user = req.user!;
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("meal_plans")
      .select(`
        *,
        meal_plan_items (
          id,
          day_of_week,
          meal_slot,
          meals (
            id,
            name,
            category,
            price_min,
            price_max,
            prep_time_mins,
            dietary_tags,
            instructions
          )
        )
      `)
      .eq("id", id)
      .eq("user_id", user.id) // ensures users can only access their own plans
      .single();

    if (error) return _res.error(404, res, "Meal plan not found");

    return _res.success(200, res, "Meal plan retrieved successfully", data);
  } catch (err) {
    return _res.error(500, res, "Failed to retrieve meal plan");
  }
});

// GET /ingredients/:planId
// Returns all ingredients for a meal plan, grouped by market_section.
// This powers the categorized shopping list on the frontend.
router.get("/ingredients/:planId", async (req: Request, res: Response) => {
  const user = req.user!;
  const { planId } = req.params;

  try {
    // First verify the plan belongs to this user
    const { data: plan, error: planError } = await supabase
      .from("meal_plans")
      .select("id")
      .eq("id", planId)
      .eq("user_id", user.id)
      .single();
    if (planError || !plan) return _res.error(404, res, "Meal plan not found");

    // Fetch all shopping list items for this plan
    const { data: items, error: itemsError } = await supabase
      .from("shopping_list_items")
      .select("*")
      .eq("meal_plan_id", planId)
      .order("category");
    if (itemsError) return _res.error(500, res, itemsError.message);

    // Group items by category (market section) for the frontend shopping list
    const grouped = items.reduce((acc: Record<string, typeof items>, item) => {
      const section = item.category || "Other";
      if (!acc[section]) acc[section] = [];
      acc[section].push(item);
      return acc;
    }, {});

    return _res.success(200, res, "Ingredients retrieved successfully", {
      plan_id: planId,
      sections: grouped,
    });
  } catch (err) {
    return _res.error(500, res, "Failed to retrieve ingredients");
  }
});

export default router;
