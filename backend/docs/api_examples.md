# Naija_Eats API Documentation

This document outlines the API endpoints, providing sample request inputs and expected responses.

---

## Auth Routes

### 1. Register User
**Endpoint:** `POST /auth/register`
**Description:** Creates a new user and profile.

**Input:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone_number": "+2348000000000",
  "password": "password123"
}
```

**Output (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid-123",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
  }
}
```

### 2. Login User
**Endpoint:** `POST /auth/login`
**Description:** Authenticates a user and returns a JWT.

**Input:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Output (200 OK):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
  }
}
```

---

## Onboarding Routes

### 3. Save Budget Preferences
**Endpoint:** `POST /api/users/preferences/budget`

**Input:**
```json
{
  "budgetTier": "Standard",
  "budgetValue": "7000-10000",
  "frequency": "Weekly",
  "fluctuationBuffer": "10%"
}
```

**Output (200 OK):**
```json
{
  "success": true,
  "message": "Budget preferences saved successfully"
}
```

### 4. Save Cooking Frequency
**Endpoint:** `POST /api/users/preferences/frequency`

**Input:**
```json
{
  "householdSize": "1",
  "dailyMeals": "3",
  "includeDesserts": false,
  "cookingFrequencies": ["Daily (7 Days)"]
}
```

**Output (200 OK):**
```json
{
  "success": true,
  "message": "Cooking frequency preferences saved successfully"
}
```

### 5. Save Food Preferences
**Endpoint:** `POST /api/users/preferences/food`

**Input:**
```json
{
  "selectedPreferences": ["African", "Continental"],
  "allergies": "Peanuts",
  "dietaryTags": ["Gluten-Free"]
}
```

**Output (200 OK):**
```json
{
  "success": true,
  "message": "Food preferences saved successfully"
}
```

---

## Meal Plan Routes

### 6. Generate Meal Plan
**Endpoint:** `POST /api/meal-plans/generate`

**Input:** (None - Triggered based on user preferences)

**Output (201 Created):**
```json
{
  "success": true,
  "message": "Meal plan generated successfully",
  "data": {
    "planId": "pln_987654321"
  }
}
```

### 7. Get Current Meal Plan
**Endpoint:** `GET /api/meal-plans/current`

**Output (200 OK):**
```json
{
  "success": true,
  "message": "Meal plan retrieved successfully",
  "data": {
    "budgetStats": { "weeklyBudget": "₦45,000", "totalMeals": 21, "prepTimeAvg": "35 Mins" }
  }
}
```
