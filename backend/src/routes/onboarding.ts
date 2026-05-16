import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";
import { _res } from "../utils/helper";

const router = Router();

// POST /api/users/preferences/budget
router.post(
  "/users/preferences/budget",
  async (req: Request, res: Response) => {
    const user = req.user!;
    const { budgetTier, budgetValue, frequency, fluctuationBuffer } = req.body;

    try {
      const { error } = await supabase.from("budgets").upsert(
        {
          user_id: user.id,
          tier: budgetTier,
          value: budgetValue,
          frequency,
          fluctuation_buffer: fluctuationBuffer,
        },
        { onConflict: "user_id" },
      );

      if (error) return _res.error(500, res, error.message);
      return _res.success(200, res, "Budget preferences saved successfully");
    } catch (err) {
      return _res.error(500, res, "Failed to save budget preferences");
    }
  },
);

// POST /api/users/preferences/frequency
router.post(
  "/users/preferences/frequency",
  async (req: Request, res: Response) => {
    const user = req.user!;
    const { householdSize, dailyMeals, includeDesserts, cookingFrequencies } =
      req.body;

    try {
      const { error } = await supabase.from("household_profiles").upsert(
        {
          user_id: user.id,
          household_size: householdSize,
          daily_meals: dailyMeals,
          is_dessert: includeDesserts,
          cooking_frequency: cookingFrequencies,
        },
        { onConflict: "user_id" },
      );

      if (error) return _res.error(500, res, error.message);
      return _res.success(
        200,
        res,
        "Cooking frequency preferences saved successfully",
      );
    } catch (err) {
      return _res.error(
        500,
        res,
        "Failed to save cooking frequency preferences",
      );
    }
  },
);

// POST /api/users/preferences/food
router.post("/users/preferences/food", async (req: Request, res: Response) => {
  const user = req.user!;
  const { selectedPreferences, allergies, dietaryTags } = req.body;

  try {
    // Upsert preferences
    await supabase.from("user_preferences").delete().eq("user_id", user.id);
    if (selectedPreferences && selectedPreferences.length > 0) {
      await supabase
        .from("user_preferences")
        .insert(
          selectedPreferences.map((p: any) => ({
            user_id: user.id,
            preference: p,
          })),
        );
    }

    // Upsert allergies
    await supabase.from("user_allergies").delete().eq("user_id", user.id);
    if (allergies) {
      await supabase
        .from("user_allergies")
        .insert({ user_id: user.id, allergy: allergies });
    }

    // Upsert dietary tags
    await supabase.from("dietary_tags").delete().eq("user_id", user.id);
    if (dietaryTags && dietaryTags.length > 0) {
      await supabase
        .from("dietary_tags")
        .insert(dietaryTags.map((t: string) => ({ user_id: user.id, tag: t })));
    }

    return _res.success(200, res, "Food preferences saved successfully");
  } catch (err) {
    return _res.error(500, res, "Failed to save food preferences");
  }
});

// POST /api/meal-plans/generate
router.post("/meal-plans/generate", async (req: Request, res: Response) => {
  const user = req.user!;
  try {
    // In a real implementation, this would trigger an algorithm.
    // For now, we mock the generation process as per requirement.
    const { data: plan, error: planError } = await supabase
      .from("meal_plans")
      .insert({ user_id: user.id, status: "active" })
      .select()
      .single();

    if (planError) return _res.error(500, res, planError.message);

    return _res.success(201, res, "Meal plan generated successfully", {
      planId: plan.id,
    });
  } catch (err) {
    return _res.error(500, res, "Failed to generate meal plan");
  }
});

// GET /api/meal-plans/current
router.get("/meal-plans/current", async (req: Request, res: Response) => {
  const user = req.user!;
  try {
    const { data, error } = await supabase
      .from("meal_plans")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (error || !data)
      return _res.error(404, res, "No active meal plan found");

    return _res.success(200, res, "Meal plan retrieved successfully", {
      budgetStats: {
        weeklyBudget: "₦45,000",
        totalMeals: 21,
        prepTimeAvg: "35 Mins",
      },
      // ... remainder of structure
    });
  } catch (err) {
    return _res.error(500, res, "Failed to retrieve meal plan");
  }
});

// GET /api/meal-plans/current/details
router.get(
  "/meal-plans/current/details",
  async (req: Request, res: Response) => {
    const user = req.user!;
    try {
      // Logic to fetch detailed breakdown
      return _res.success(
        200,
        res,
        "Meal plan details retrieved successfully",
        {},
      );
    } catch (err) {
      return _res.error(500, res, "Failed to retrieve meal plan details");
    }
  },
);

export default router;
