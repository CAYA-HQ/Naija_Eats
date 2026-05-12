# Onboarding API Requirements

This document outlines the required backend endpoints and data structures needed to support the frontend onboarding flow located in `frontend/src/components/onboarding`.

## 1. Set Budget Page (`SetBudget.jsx`)

This page collects the user's budget preferences.

**Endpoint:** `POST /api/users/preferences/budget`
**Description:** Saves the user's budget tier, frequency, and fluctuation buffer.

**Request Payload:**
```json
{
  "budgetTier": "Standard",
  "budgetValue": "7000-10000",
  "frequency": "Weekly",
  "fluctuationBuffer": "10%"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Budget preferences saved successfully"
}
```

---

## 2. Cooking Frequency Page (`CookingFrequency.jsx`)

This page collects information about household size and eating habits.

**Endpoint:** `POST /api/users/preferences/frequency`
**Description:** Saves the user's household size, daily meals, dessert preferences, and cooking frequency.

**Request Payload:**
```json
{
  "householdSize": "1",
  "dailyMeals": "3",
  "includeDesserts": false,
  "cookingFrequencies": [
    "Daily (7 Days)", 
    "Most Days (5-6 Days)"
  ]
}
```

**Success Response (200 OK):**
```json
{
  "message": "Cooking frequency preferences saved successfully"
}
```

---

## 3. Food Preferences Page (`FoodPreferences.jsx`)

This page collects favorite food categories, allergies, and dietary tags.

**Endpoint:** `POST /api/users/preferences/food`
**Description:** Saves the user's liked food categories, allergies, and specific dietary requirements.

**Request Payload:**
```json
{
  "selectedPreferences": [0, 2, 5],
  "allergies": "Peanuts, Shellfish",
  "dietaryTags": [
    "Gluten-Free", 
    "Lactose-Intolerant"
  ]
}
```

**Success Response (200 OK):**
```json
{
  "message": "Food preferences saved successfully"
}
```

---

## 4. Generating Plan Page (`GeneratingPlan.jsx`)

This page currently shows a loading animation while the plan is supposedly being generated. In a real-world scenario, reaching this step should trigger the plan generation on the backend using the previously saved preferences.

**Endpoint:** `POST /api/meal-plans/generate`
**Description:** Triggers the algorithm to generate a personalized meal plan based on the user's saved preferences.

*(Optional)* **Request Payload:** If the user is a "Guest", you might need to send all collected preferences (Budget, Frequency, Food) in a single payload here instead of saving them sequentially in steps 1-3.

**Success Response (201 Created):**
```json
{
  "message": "Meal plan generated successfully",
  "data": {
    "planId": "pln_987654321"
  }
}
```

---

## 5. Meal Plan Dashboard (`MealPlan.jsx`)

This page displays the high-level overview of the generated meal plan, including a featured meal, sub-meals, weekly summaries, and budget stats.

**Endpoint:** `GET /api/meal-plans/current` (or `/api/meal-plans/:planId`)
**Description:** Fetches the summary of the active or newly generated meal plan.

**Success Response (200 OK):**
```json
{
  "data": {
    "budgetStats": {
      "weeklyBudget": "₦45,000",
      "totalMeals": 21,
      "prepTimeAvg": "35 Mins"
    },
    "nutritionalInfo": {
      "avgCalories": "650 kcal",
      "protein": "42g"
    },
    "featuredMeal": {
      "day": "MONDAY",
      "title": "Jollof Rice & Grilled Fish",
      "description": "A decade proven meal...",
      "time": "45 mins",
      "calories": "520 kcal",
      "image": "/images/jollof_fish_plantains.png"
    },
    "subMeals": [
      {
        "type": "BREAKFAST",
        "title": "Toast and Tea",
        "image": "/images/tea-bread-small-image.png"
      },
      {
        "type": "DINNER",
        "title": "Swallow and Egusi Soup",
        "image": "/images/swallow_egusi.png"
      }
    ],
    "weeklyMeals": [
      {
        "day": "TUESDAY",
        "title": "Beans & Plantain",
        "description": "A protein rich meal cooked with perfection",
        "time": "30 MINS",
        "image": "/images/dish.webp"
      },
      {
        "day": "WEDNESDAY",
        "title": "Grilled Croaker & Ofada",
        "description": "Locally sourced Ofada rice served with peppered croaker fish.",
        "time": "40 MINS",
        "image": "/images/jollof-image.png"
      },
      {
        "day": "THURSDAY",
        "title": "Catfish Pepper Soup",
        "description": "A light yet intensely flavorful aromatic broth with fresh catch.",
        "time": "25 MINS",
        "image": "/images/fisherman_soup.png"
      },
      {
        "day": "FRIDAY",
        "title": "Suya Spiced Beef Skewers",
        "description": "Classic street-style Suya with yaji spice and vegetable slaw.",
        "time": "20 MINS",
        "image": "/images/beef_suya.png"
      },
      {
        "day": "SATURDAY",
        "title": "Fried Rice Platter",
        "description": "Vibrant fried rice with liver, shrimp, and seasonal peas.",
        "time": "50 MINS",
        "image": "/images/nigerian-jollof-rice.webp"
      },
      {
        "day": "SUNDAY",
        "title": "Efo Riro & Pounded Yam",
        "description": "Traditional spinach stew with stockfish and smoked prawns.",
        "time": "45 MINS",
        "image": "/images/egusi-image.png"
      }
    ]
  }
}
```

---

## 6. Full Weekly Plan (`WeeklyPlan.jsx`)

This page displays a detailed day-by-day breakdown of the weekly plan.

**Endpoint:** `GET /api/meal-plans/current/details`
**Description:** Fetches the granular, day-by-day breakdown of the meal plan.

**Success Response (200 OK):**
```json
{
  "data": {
    "summary": {
      "totalBudget": "₦8,900",
      "trend": "12% lower than last week"
    },
    "weekPlan": [
      {
        "day": "Monday",
        "color": "bg-accent-orange",
        "meals": [
          {
            "type": "Breakfast",
            "name": "Oatmeal and Fruits",
            "price": "₦1,500",
            "icon": "icon_identifier"
          },
          {
            "type": "Lunch",
            "name": "Jollof Rice",
            "price": "₦3,000",
            "icon": "icon_identifier"
          },
          {
            "type": "Dinner",
            "name": "Yam and Egg Sauce",
            "price": "₦2,000",
            "icon": "icon_identifier"
          }
        ]
      },
      {
        "day": "Tuesday",
        "color": "bg-text-primary",
        "meals": [
          {
            "type": "Breakfast",
            "name": "Akara and Pap",
            "price": "₦1,200",
            "icon": "icon_identifier"
          },
          {
            "type": "Lunch",
            "name": "Beans and Plantain",
            "price": "₦2,500",
            "icon": "icon_identifier"
          },
          {
            "type": "Dinner",
            "name": "Eba and Egusi Soup",
            "price": "₦3,500",
            "icon": "icon_identifier"
          }
        ]
      },
      {
        "day": "Wednesday",
        "color": "bg-text-link",
        "meals": [
          {
            "type": "Breakfast",
            "name": "Bread and Tea",
            "price": "₦1,000",
            "icon": "icon_identifier"
          },
          {
            "type": "Lunch",
            "name": "Fried Rice",
            "price": "₦3,200",
            "icon": "icon_identifier"
          },
          {
            "type": "Dinner",
            "name": "Amala and Ewedu",
            "price": "₦3,000",
            "icon": "icon_identifier"
          }
        ]
      },
      {
        "day": "Thursday",
        "color": "bg-accent-orange",
        "meals": [
          {
            "type": "Breakfast",
            "name": "Moi Moi and Pap",
            "price": "₦1,500",
            "icon": "icon_identifier"
          },
          {
            "type": "Lunch",
            "name": "Pounded Yam and Egusi",
            "price": "₦4,000",
            "icon": "icon_identifier"
          },
          {
            "type": "Dinner",
            "name": "Spaghetti",
            "price": "₦2,000",
            "icon": "icon_identifier"
          }
        ]
      },
      {
        "day": "Friday",
        "color": "bg-text-primary",
        "meals": [
          {
            "type": "Breakfast",
            "name": "Pancakes",
            "price": "₦2,000",
            "icon": "icon_identifier"
          },
          {
            "type": "Lunch",
            "name": "Rice and Stew",
            "price": "₦2,500",
            "icon": "icon_identifier"
          },
          {
            "type": "Dinner",
            "name": "Suya",
            "price": "₦3,500",
            "icon": "icon_identifier"
          }
        ]
      },
      {
        "day": "Saturday",
        "color": "bg-text-link",
        "meals": [
          {
            "type": "Breakfast",
            "name": "Indomie and Egg",
            "price": "₦1,200",
            "icon": "icon_identifier"
          },
          {
            "type": "Lunch",
            "name": "Ofada Rice",
            "price": "₦3,500",
            "icon": "icon_identifier"
          },
          {
            "type": "Dinner",
            "name": "Pepper Soup",
            "price": "₦3,000",
            "icon": "icon_identifier"
          }
        ]
      },
      {
        "day": "Sunday",
        "color": "bg-accent-orange",
        "meals": [
          {
            "type": "Breakfast",
            "name": "Boiled Yam and Stew",
            "price": "₦1,800",
            "icon": "icon_identifier"
          },
          {
            "type": "Lunch",
            "name": "Sunday Rice",
            "price": "₦3,500",
            "icon": "icon_identifier"
          },
          {
            "type": "Dinner",
            "name": "Fruit Salad",
            "price": "₦1,500",
            "icon": "icon_identifier"
          }
        ]
      }
    ]
  }
}
```

## Note for Backend Developers
If supporting "Guest Mode" (users who haven't signed up yet), the frontend might need to pass all onboarding state (from SetBudget, CookingFrequency, and FoodPreferences) in a single request to the `/api/meal-plans/generate` endpoint, rather than relying on sequential preference updates attached to an authenticated user ID.
