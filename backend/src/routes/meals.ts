import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";
import { _res } from "../utils/helper";

const router = Router();

// ── Preference Endpoints (split per api.md) ─────────────────────────────

// POST /api/users/preferences/budget
// Saves budget tier, range (budgetValue), frequency, and fluctuation buffer.
router.post("/users/preferences/budget", async (req: Request, res: Response) => {
  const user = req.user!;
  const { budgetTier, budgetValue, frequency, fluctuationBuffer } = req.body;

  if (!budgetValue) return _res.error(400, res, "budgetValue is required");

  // Parse "7000-10000" → amount_min=7000, amount_max=10000
  const [minStr, maxStr] = budgetValue.split("-");
  const amount_min = minStr ? parseInt(minStr.replace(/,/g, ''), 10) : undefined;
  const amount_max = maxStr ? parseInt(maxStr.replace(/,/g, ''), 10) : undefined;

  if (isNaN(amount_min!) || isNaN(amount_max!)) {
    return _res.error(400, res, "Invalid budgetValue format. Expected 'min-max'");
  }

  // Parse "10%" → 10
  const fluctuation_buffer = fluctuationBuffer
    ? parseInt(fluctuationBuffer.replace(/%/g, ''), 10)
    : 10;

  try {
    const { data: existing } = await supabase
      .from("budgets")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("budgets")
        .update({
          budget_tier: budgetTier,
          budget_value: budgetValue,
          amount_min,
          amount_max,
          frequency,
          fluctuation_buffer,
        })
        .eq("user_id", user.id);
      if (error) return _res.error(500, res, error.message);
    } else {
      const { error } = await supabase
        .from("budgets")
        .insert({
          user_id: user.id,
          budget_tier: budgetTier,
          budget_value: budgetValue,
          amount_min,
          amount_max,
          frequency,
          fluctuation_buffer,
        });
      if (error) return _res.error(500, res, error.message);
    }

    return _res.success(200, res, "Budget preferences saved successfully");
  } catch (err) {
    return _res.error(500, res, "Failed to save budget preferences");
  }
});

// POST /api/users/preferences/frequency
// Saves household size, daily meals, dessert flag, and cooking frequencies.
router.post("/users/preferences/frequency", async (req: Request, res: Response) => {
  const user = req.user!;
  const { householdSize, dailyMeals, includeDesserts, cookingFrequencies } = req.body;

  try {
    const { data: existing } = await supabase
      .from("household_profiles")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    const payload = {
      household_size: householdSize !== undefined ? parseInt(householdSize) : undefined,
      daily_meals: dailyMeals !== undefined ? parseInt(dailyMeals) : undefined,
      is_dessert: includeDesserts ?? false,
      cooking_frequency: Array.isArray(cookingFrequencies) ? cookingFrequencies : undefined,
    };

    if (existing) {
      const { error } = await supabase
        .from("household_profiles")
        .update(payload)
        .eq("user_id", user.id);
      if (error) return _res.error(500, res, error.message);
    } else {
      const { error } = await supabase
        .from("household_profiles")
        .insert({ user_id: user.id, ...payload });
      if (error) return _res.error(500, res, error.message);
    }

    return _res.success(200, res, "Cooking frequency preferences saved successfully");
  } catch (err) {
    return _res.error(500, res, "Failed to save frequency preferences");
  }
});

// POST /api/users/preferences/food
// Saves liked food categories (by index), allergies (comma-separated string), and dietary tags.
// Preference indices map to meal category names defined in PREFERENCE_MAP below.
router.post("/users/preferences/food", async (req: Request, res: Response) => {
  const user = req.user!;
  const { selectedPreferences, allergies, dietaryTags } = req.body;

  try {
    // Convert allergy string "Peanuts, Shellfish" → array
    const allergyArray = allergies
      ? (typeof allergies === "string"
          ? allergies.split(',').map((a: string) => a.trim()).filter(Boolean)
          : Array.isArray(allergies) ? allergies : [])
      : [];

    // Combine selected preference indices mapped to labels + explicit dietaryTags
    const preferenceLabels: string[] = [];
    if (Array.isArray(selectedPreferences)) {
      for (const idx of selectedPreferences) {
        const label = PREFERENCE_MAP[idx];
        if (label) preferenceLabels.push(label);
      }
    }
    if (Array.isArray(dietaryTags)) {
      preferenceLabels.push(...dietaryTags);
    }

    // Upsert preferences (delete old first)
    if (preferenceLabels.length > 0) {
      await supabase.from("user_preferences").delete().eq("user_id", user.id);
      const { error: prefError } = await supabase
        .from("user_preferences")
        .insert(preferenceLabels.map((p) => ({ user_id: user.id, preference: p })));
      if (prefError) return _res.error(500, res, prefError.message);
    }

    // Upsert allergies (delete old first)
    if (allergyArray.length > 0) {
      await supabase.from("user_allergies").delete().eq("user_id", user.id);
      const { error: allergyError } = await supabase
        .from("user_allergies")
        .insert(allergyArray.map((a) => ({ user_id: user.id, allergy: a })));
      if (allergyError) return _res.error(500, res, allergyError.message);
    }

    return _res.success(200, res, "Food preferences saved successfully");
  } catch (err) {
    return _res.error(500, res, "Failed to save food preferences");
  }
});

// ── Combined Preference (legacy – kept for potential backward compatibility) ──
// Original endpoint that saves all preference types in one call.
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
    const { data: existingBudget } = await supabase
      .from("budgets")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingBudget) {
      const { error: budgetError } = await supabase
        .from("budgets")
        .update({ amount, frequency, fluctuation_buffer })
        .eq("user_id", user.id);
      if (budgetError) return _res.error(500, res, budgetError.message);
    } else {
      const { error: budgetError } = await supabase
        .from("budgets")
        .insert({ user_id: user.id, amount, frequency, fluctuation_buffer });
      if (budgetError) return _res.error(500, res, budgetError.message);
    }

    // Upsert household profile
    const { data: existingProfile } = await supabase
      .from("household_profiles")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingProfile) {
      const { error: householdError } = await supabase
        .from("household_profiles")
        .update({ household_size, daily_meals, is_dessert, cooking_frequency })
        .eq("user_id", user.id);
      if (householdError) return _res.error(500, res, householdError.message);
    } else {
      const { error: householdError } = await supabase
        .from("household_profiles")
        .insert({
          user_id: user.id,
          household_size,
          daily_meals,
          is_dessert,
          cooking_frequency,
        });
      if (householdError) return _res.error(500, res, householdError.message);
    }

    // Insert preferences (delete old ones first to avoid duplicates)
    if (preferences && Array.isArray(preferences) && preferences.length > 0) {
      await supabase.from("user_preferences").delete().eq("user_id", user.id);
      const prefRows = preferences.map((p: string) => ({
        user_id: user.id,
        preference: p,
      }));
      const { error: prefError } = await supabase
        .from("user_preferences")
        .insert(prefRows);
      if (prefError) return _res.error(500, res, prefError.message);
    }

    // Insert allergies (delete old ones first to avoid duplicates)
    if (allergies && Array.isArray(allergies) && allergies.length > 0) {
      await supabase.from("user_allergies").delete().eq("user_id", user.id);
      const allergyRows = allergies.map((a: string) => ({
        user_id: user.id,
        allergy: a,
      }));
      const { error: allergyError } = await supabase
        .from("user_allergies")
        .insert(allergyRows);
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
    const itemRows = items.map(
      (item: { meal_id: string; day_of_week: string; meal_slot: string }) => ({
        plan_id: plan.id,
        meal_id: item.meal_id,
        day_of_week: item.day_of_week,
        meal_slot: item.meal_slot,
      }),
    );

    const { error: itemsError } = await supabase
      .from("meal_plan_items")
      .insert(itemRows);
    if (itemsError) return _res.error(500, res, itemsError.message);

    // 3. Return the plan with all its items and meal details
    const { data: fullPlan, error: fetchError } = await supabase
      .from("meal_plans")
      .select(
        `
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
      `,
      )
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
      .select(
        `
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
      `,
      )
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

// ── Meal Plan Generation (auto from saved preferences) ────────────────────
// POST /api/meal-plans/generate
// Creates a new meal plan for the authenticated user using their saved
// onboarding preferences (budget, household profile, food preferences, allergies).
// For guest users (no auth), the frontend may pass all preferences in the body.
router.post("/meal-plans/generate", async (req: Request, res: Response) => {
  const user = req.user; // may be undefined for guest mode
  const guestPayload = req.body; // for unauthenticated generation

  try {
    // ── 1. Resolve user preferences ─────────────────────────────────────
    let budget, profile, preferences, allergies;

    if (user) {
      // Authenticated: fetch saved preferences in parallel
      const [
        { data: budgetData, error: budgetErr },
        { data: profileData, error: profileErr },
        { data: prefData, error: prefErr },
        { data: allergyData, error: allergyErr },
      ] = await Promise.all([
        supabase.from("budgets").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("household_profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("user_preferences").select("preference").eq("user_id", user.id),
        supabase.from("user_allergies").select("allergy").eq("user_id", user.id),
      ]);

      if (budgetErr || profileErr || prefErr || allergyErr) {
        return _res.error(500, res, "Failed to load user preferences");
      }
      budget = budgetData;
      profile = profileData;
      preferences = prefData?.map((p: any) => p.preference) || [];
      allergies = allergyData?.map((a: any) => a.allergy) || [];
    } else {
      // Guest mode: expect full preferences in payload
      const {
        // budgets
        budgetTier, budgetValue, frequency, fluctuationBuffer,
        // household
        householdSize, dailyMeals, includeDesserts, cookingFrequencies,
        // food
        selectedPreferences, allergies: guestAllergies, dietaryTags,
      } = guestPayload;

      // Reconstruct budget-like object
      budget = {
        amount_min: parseInt(budgetValue.split("-")[0].replace(/,/g, ''), 10),
        amount_max: parseInt(budgetValue.split("-")[1].replace(/,/g, ''), 10),
        fluctuation_buffer: parseInt(String(fluctuationBuffer || "10").replace(/%/g, ''), 10),
      };
      profile = {
        household_size: parseInt(householdSize),
        daily_meals: parseInt(dailyMeals),
        is_dessert: !!includeDesserts,
        cooking_frequency: Array.isArray(cookingFrequencies) ? cookingFrequencies : [],
      };
      preferences = [
        ...(Array.isArray(selectedPreferences)
          ? selectedPreferences.map((i: number) => PREFERENCE_MAP[i]).filter(Boolean)
          : []),
        ...(Array.isArray(dietaryTags) ? dietaryTags : []),
      ];
      allergies = guestAllergies
        ? Array.isArray(guestAllergies)
          ? guestAllergies
          : String(guestAllergies).split(',').map((a: string) => a.trim())
        : [];
    }

    // Derived values
    const mealsPerDay = profile.daily_meals || 3;
    const householdSize = profile.household_size || 1;
    const [minBudget, maxBudget] = [budget.amount_min, budget.amount_max];

    // ── 2. Fetch eligible meals matching preferences & allergies ───────────
    let query = supabase.from("meals").select("*");
    if (preferences.length > 0) {
      // Match ANY of the preference tags (PostgreSQL overlap operator in RPC would be better,
      // but we'll do simple OR filtering client-side for MVP)
      const prefFilter = preferences.map((p: string) => Supabase.rpc("meals_with_tag", { tag: p }));
      // For simplicity, we'll fetch all meals and filter in this layer since catalogue is small
      query = supabase.from("meals").select("*").eq("category", "breakfast"); // temp, replaced below
    }
    const { data: allMeals, error: mealsErr } = await supabase.from("meals").select("*");
    if (mealsErr) return _res.error(500, res, mealsErr.message);

    // Filter function
    const isAllowed = (meal: any) => {
      // Dietary tag match: at least one preference tag present in meal.dietary_tags
      const tagMatch = preferences.length === 0 ||
        preferences.some((pref: string) =>
          Array.isArray(meal.dietary_tags) && meal.dietary_tags.includes(pref.toLowerCase())
        );
      // Allergy exclusion: meal name/intro should NOT contain allergy words (simple check)
      // In a real system, you'd have a proper allergen table per meal.
      const allergyMatch = allergies.length === 0 ||
        !allergies.some((allergen: string) =>
          meal.name.toLowerCase().includes(allergen.toLowerCase()) ||
          (meal.description || "").toLowerCase().includes(allergen.toLowerCase())
        );
      return tagMatch && allergyMatch;
    };

    const eligibleMeals = allMeals.filter(isAllowed);

    // ── 3. Pick meals to fill a 7-day week ────────────────────────────────
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const slots = ["breakfast", "lunch", "dinner"];
    const picked: Array<{ meal_id: string; day_of_week: string; meal_slot: string }> = [];

    const getRand = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    // Shuffle eligible meals per category for variety
    const breakfastMeals = eligibleMeals.filter((m: any) => m.category === "breakfast");
    const lunchMeals = eligibleMeals.filter((m: any) => m.category === "lunch");
    const dinnerMeals = eligibleMeals.filter((m: any) => m.category === "dinner");

    for (const day of days) {
      for (const slot of slots) {
        let candidates = slot === "breakfast" ? breakfastMeals : slot === "lunch" ? lunchMeals : dinnerMeals;
        if (candidates.length === 0) {
          // Fallback to all eligible if category empty
          candidates = eligibleMeals;
        }
        const chosen = getRand(candidates);
        picked.push({ meal_id: chosen.id, day_of_week: day, meal_slot: slot });
      }
    }

    // ── 4. Persist plan ───────────────────────────────────────────────────
    const { data: plan, error: planErr } = await supabase
      .from("meal_plans")
      .insert({
        user_id: user?.id || null,
        status: "active",
        total_price_min: minBudget,
        total_price_max: maxBudget,
        avg_calories: null,
        avg_protein: null,
        avg_prep_time: null,
        total_meals: picked.length,
      })
      .select()
      .single();

    if (planErr) return _res.error(500, res, planErr.message);

    // Store plan items
    const itemRows = picked.map((p) => ({
      plan_id: plan.id,
      meal_id: p.meal_id,
      day_of_week: p.day_of_week,
      meal_slot: p.meal_slot,
      computed_calories: null,
      computed_protein: null,
    }));
    const { error: itemsErr } = await supabase.from("meal_plan_items").insert(itemRows);
    if (itemsErr) return _res.error(500, res, itemsErr.message);

    // ── 5. Build response ────────────────────────────────────────────────
    const { data: fullPlan, error: fetchErr } = await supabase
      .from("meal_plans")
      .select(
        `*,
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
        )`,
      )
      .eq("id", plan.id)
      .single();

    if (fetchErr) return _res.error(500, res, fetchErr.message);

    return _res.success(201, res, "Meal plan generated successfully", { planId: plan.id });
  } catch (err: any) {
    return _res.error(500, res, "Failed to generate meal plan: " + err.message);
  }
});

// GET /api/meal-plans/current
// Fetches the summary of the active meal plan (overview).
router.get("/meal-plans/current", async (req: Request, res: Response) => {
  const user = req.user!;

  try {
    const { data: plan, error } = await supabase
      .from("meal_plans")
      .select(`*,
        meal_plan_items (
          meals (
            name,
            price_min,
            price_max,
            prep_time_mins,
            calories_per_serving,
            protein_per_serving
          )
        )
      `)
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !plan) {
      return _res.error(404, res, "No active meal plan found");
    }

    // Compute aggregates from items
    const items = plan.meal_plan_items as any[] | null;
    const totalMeals = items?.length || 0;
    const totalPriceMin = items?.reduce((sum: number, it: any) => sum + (it.meals?.price_min || 0), 0) || 0;
    const totalPriceMax = items?.reduce((sum: number, it: any) => sum + (it.meals?.price_max || 0), 0) || 0;
    const avgCalories = items?.length
      ? Math.round(items.reduce((sum: number, it: any) => sum + (it.meals?.calories_per_serving || 0), 0) / items.length)
      : 0;
    const avgProtein = items?.length
      ? Math.round(items.reduce((sum: number, it: any) => sum + (it.meals?.protein_per_serving || 0), 0) / items.length)
      : 0;
    const avgPrep = items?.length
      ? Math.round(items.reduce((sum: number, it: any) => sum + (it.meals?.prep_time_mins || 0), 0) / items.length)
      : 0;

    // Pick a featured meal (e.g., Monday lunch)
    const featuredItem = items?.find((it: any) => it.day_of_week === "monday" && it.meal_slot === "lunch");
    const featuredMeal = featuredItem?.meals;

    // Build sub-meals (breakfast & dinner for Monday)
    const subMeals = (items || [])
      .filter((it: any) => it.day_of_week === "monday" && (it.meal_slot === "breakfast" || it.meal_slot === "dinner"))
      .map((it: any) => ({
        type: it.meal_slot.toUpperCase(),
        title: it.meals?.name,
        image: `/images/${it.meals?.name.toLowerCase().replace(/\s+/g, '_')}.png`, // approximate
      }));

    // Build full week meals array for dashboard (Mon–Sun)
    const weeklyMeals = daysOrder.map((day: string) => {
      const dayItems = (items || []).filter((it: any) => it.day_of_week === day);
      const anyMeal = dayItems[0]?.meals;
      return {
        day: day.toUpperCase(),
        title: anyMeal?.name || "",
        description: anyMeal?.description || "",
        time: `${anyMeal?.prep_time_mins || 0} MINS`,
        image: `/images/${anyMeal?.name.toLowerCase().replace(/\s+/g, '_')}.png`,
      };
    });

    const responseData = {
      budgetStats: {
        weeklyBudget: `₦${(totalPriceMin + totalPriceMax) / 2.toLocaleString()}`,
        totalMeals: totalMeals,
        prepTimeAvg: `${avgPrep} Mins`,
      },
      nutritionalInfo: {
        avgCalories: `${avgCalories} kcal`,
        protein: `${avgProtein}g`,
      },
      featuredMeal: featuredMeal
        ? {
            day: "MONDAY",
            title: featuredMeal.name,
            description: featuredMeal.description || "",
            time: `${featuredMeal.prep_time_mins} mins`,
            calories: `${featuredMeal.calories_per_serving} kcal`,
            image: `/images/${featuredMeal.name.toLowerCase().replace(/\s+/g, '_')}.png`,
          }
        : null,
      subMeals,
      weeklyMeals,
    };

    return _res.success(200, res, "Meal plan retrieved successfully", responseData);
  } catch (err: any) {
    return _res.error(500, res, "Failed to fetch current meal plan: " + err.message);
  }
});

// GET /api/meal-plans/current/details
// Fetches granular day-by-day breakdown of the active meal plan.
router.get("/meal-plans/current/details", async (req: Request, res: Response) => {
  const user = req.user!;

  try {
    const { data: plan, error } = await supabase
      .from("meal_plans")
      .select(`*,
        meal_plan_items (
          day_of_week,
          meal_slot,
          meals (id, name, price_min, price_max)
        )
      `)
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !plan) {
      return _res.error(404, res, "No active meal plan found");
    }

    const items = plan.meal_plan_items as any[] | null;

    // Group items by day
    const weekPlan = daysOrder.map((day: string) => {
      const dayItems = (items || []).filter((it: any) => it.day_of_week === day);
      return {
        day: capitalize(day),
        color: dayColor(day),
        meals: dayItems.map((it: any) => ({
          type: capitalize(it.meal_slot),
          name: it.meals?.name || "",
          price: `₦${(it.meals?.price_min || 0).toLocaleString()}`,
          icon: "icon_identifier",
        })),
      };
    });

    const totalBudget = (plan.total_price_min || 0) + (plan.total_price_max || 0);
    const trend = "12% lower than last week"; // placeholder until we compute history

    return _res.success(200, res, "Meal plan details retrieved successfully", {
      summary: { totalBudget: `₦${(totalBudget / 2).toLocaleString()}`, trend },
      weekPlan,
    });
  } catch (err: any) {
    return _res.error(500, res, "Failed to fetch meal plan details: " + err.message);
  }
});

// ── Helper constants & functions ────────────────────────────────────────
const daysOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const dayColor = (day: string): string => {
  const colors: Record<string, string> = {
    monday: "bg-accent-orange",
    tuesday: "bg-text-primary",
    wednesday: "bg-text-link",
    thursday: "bg-accent-orange",
    friday: "bg-text-primary",
    saturday: "bg-text-link",
    sunday: "bg-accent-orange",
  };
  return colors[day] || "bg-text-primary";
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Mapping of food preference indices to category labels (used by food endpoint)
// This mapping should match the frontend's category list order.
const PREFERENCE_MAP: Record<number, string> = {
  0: "Rice Dishes",
  1: "Swallow",
  2: "Soup & Stew",
  3: "Beans & Legumes",
  4: "Vegetables",
  5: "Porridge",
  6: "Snacks",
  7: "Beverages",
  // Add more as defined in frontend
};

export default router;
