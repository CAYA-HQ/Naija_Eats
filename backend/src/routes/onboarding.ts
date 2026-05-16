import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { _res } from "../utils/helper";

const router = Router();

// POST /api/users/preferences/budget
router.post(
  "/users/preferences/budget",
  async (req: Request, res: Response) => {
    const user = req.user!;
    const { budgetTier, budgetValue, frequency, fluctuationBuffer } = req.body;

    try {
      await prisma.budgets.upsert({
        where: { user_id: user.id },
        update: {
          tier: budgetTier,
          value: budgetValue,
          frequency,
          fluctuation_buffer: fluctuationBuffer,
        },
        create: {
          user_id: user.id,
          tier: budgetTier,
          value: budgetValue,
          frequency,
          fluctuation_buffer: fluctuationBuffer,
        },
      });

      return _res.success(200, res, "Budget preferences saved successfully");
    } catch (err) {
      console.error(err);
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
      await prisma.household_profiles.upsert({
        where: { user_id: user.id },
        update: {
          household_size: householdSize,
          daily_meals: dailyMeals,
          is_dessert: includeDesserts,
          cooking_frequency: cookingFrequencies,
        },
        create: {
          user_id: user.id,
          household_size: householdSize,
          daily_meals: dailyMeals,
          is_dessert: includeDesserts,
          cooking_frequency: cookingFrequencies,
        },
      });

      return _res.success(
        200,
        res,
        "Cooking frequency preferences saved successfully",
      );
    } catch (err) {
      console.error(err);
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
    await prisma.$transaction(async (tx) => {
      // Upsert preferences
      await tx.user_preferences.deleteMany({ where: { user_id: user.id } });
      if (selectedPreferences && selectedPreferences.length > 0) {
        await tx.user_preferences.createMany({
          data: selectedPreferences.map((p: any) => ({
            user_id: user.id,
            preference: p,
          })),
        });
      }

      // Upsert allergies
      await tx.user_allergies.deleteMany({ where: { user_id: user.id } });
      if (allergies) {
        await tx.user_allergies.create({
          data: { user_id: user.id, allergy: allergies },
        });
      }

      // Upsert dietary tags
      await tx.dietary_tags.deleteMany({ where: { user_id: user.id } });
      if (dietaryTags && dietaryTags.length > 0) {
        await tx.dietary_tags.createMany({
          data: dietaryTags.map((t: string) => ({ user_id: user.id, tag: t })),
        });
      }
    });

    return _res.success(200, res, "Food preferences saved successfully");
  } catch (err) {
    console.error(err);
    return _res.error(500, res, "Failed to save food preferences");
  }
});

// POST /api/meal-plans/generate
router.post("/meal-plans/generate", async (req: Request, res: Response) => {
  const user = req.user!;
  try {
    const plan = await prisma.meal_plans.create({
      data: { user_id: user.id, status: "active" },
    });

    return _res.success(201, res, "Meal plan generated successfully", {
      planId: plan.id,
    });
  } catch (err) {
    console.error(err);
    return _res.error(500, res, "Failed to generate meal plan");
  }
});

// GET /api/meal-plans/current
router.get("/meal-plans/current", async (req: Request, res: Response) => {
  const user = req.user!;
  try {
    const plan = await prisma.meal_plans.findFirst({
      where: { user_id: user.id, status: "active" },
    });

    if (!plan) return _res.error(404, res, "No active meal plan found");

    return _res.success(200, res, "Meal plan retrieved successfully", {
      budgetStats: {
        weeklyBudget: "₦45,000",
        totalMeals: 21,
        prepTimeAvg: "35 Mins",
      },
    });
  } catch (err) {
    console.error(err);
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
