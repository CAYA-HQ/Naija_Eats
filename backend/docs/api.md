# API Reference

The API is mounted from `src/app.ts`.

## Health

### `GET /health`

Checks whether the server is running.

Response:

```json
{
  "status": "OK",
  "message": "Server is healthy"
}
```

## Auth Routes

Auth routes are mounted under `/auth` and do not require a bearer token.

### `POST /auth/register`

Registers a new user with Supabase Auth, stores the user's phone number through Supabase Auth, and inserts a profile row.

Request body:

```json
{
  "full_name": "Example User",
  "email": "user@example.com",
  "phone_number": "+2348000000000",
  "password": "password"
}
```

Success response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com"
    },
    "token": "access-token-or-null"
  }
}
```

### `POST /auth/login`

Logs in an existing user with Supabase Auth.

Request body:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Success response:

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "token": "access-token"
  }
}
```

## Protected Routes

The routes below require:

```http
Authorization: Bearer <access_token>
```

The authentication middleware validates the token through Supabase and attaches the user object to the request.

### `POST /preference`

Saves or updates onboarding and preference data for the authenticated user. This data is distributed across `budgets`, `household_profiles`, `user_preferences`, and `user_allergies` tables.

Request body:

```json
{
  "amount": 50000,
  "frequency": "monthly",
  "fluctuation_buffer": 5000,
  "household_size": 4,
  "daily_meals": 3,
  "is_dessert": false,
  "cooking_frequency": "daily",
  "preferences": ["vegetarian", "spicy"],
  "allergies": ["peanuts"]
}
```

Success response:

```json
{
  "success": true,
  "message": "Preferences saved successfully"
}
```

### `GET /meals`

Returns the catalogue of available meals. Can be filtered by category.

Query parameters:
- `category` (optional): `breakfast`, `lunch`, or `dinner`.

Example: `GET /meals?category=lunch`

Success response:

```json
{
  "success": true,
  "message": "Meals retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Jollof Rice",
      "category": "lunch",
      "price_min": 1500,
      "price_max": 2500,
      "prep_time_mins": 45,
      "dietary_tags": ["spicy", "popular"]
    }
  ]
}
```

### `POST /meals-plan/generate`

Creates a new meal plan for the user based on selected meals.

Request body:

```json
{
  "items": [
    { "meal_id": "uuid", "day_of_week": "monday", "meal_slot": "breakfast" },
    { "meal_id": "uuid", "day_of_week": "monday", "meal_slot": "lunch" }
  ]
}
```

Success response:

```json
{
  "success": true,
  "message": "Meal plan generated successfully",
  "data": {
    "id": "plan-uuid",
    "user_id": "user-uuid",
    "status": "active",
    "created_at": "timestamp",
    "meal_plan_items": [
      {
        "id": "item-uuid",
        "day_of_week": "monday",
        "meal_slot": "breakfast",
        "meals": {
          "id": "meal-uuid",
          "name": "Yam and Egg",
          "category": "breakfast",
          "price_min": 1000,
          "price_max": 1500,
          "prep_time_mins": 20,
          "dietary_tags": ["protein"]
        }
      }
    ]
  }
}
```

### `GET /meals-plan/:id`

Retrieves a specific meal plan by its ID, including all its meal items.

Success response:

```json
{
  "success": true,
  "message": "Meal plan retrieved successfully",
  "data": {
    "id": "plan-uuid",
    "meal_plan_items": [ ... ],
    ...
  }
}
```

### `GET /ingredients/:planId`

Returns all ingredients for a meal plan, grouped by market category (e.g., "Vegetables", "Proteins").

Success response:

```json
{
  "success": true,
  "message": "Ingredients retrieved successfully",
  "data": {
    "plan_id": "plan-uuid",
    "sections": {
      "Vegetables": [
        { "id": "uuid", "name": "Tomatoes", "quantity": "4 large", "category": "Vegetables" }
      ],
      "Proteins": [
        { "id": "uuid", "name": "Chicken", "quantity": "1kg", "category": "Proteins" }
      ]
    }
  }
}
```
