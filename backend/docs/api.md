# API Reference

The API is mounted from `src/app.ts`.

## Base URL

Local development defaults to:

```text
http://localhost:3000
```

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

Validation errors return `400`. Supabase signup errors also return `400`. Unexpected server errors return `500`.

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

Invalid credentials return `401`. Missing email or password returns `400`.

## Protected Routes

The routes below require:

```http
Authorization: Bearer <access_token>
```

The token is validated with `supabase.auth.getUser(token)`. Missing, malformed, invalid, or expired tokens return `401`.

### `POST /preference`

Saves onboarding data for the authenticated user. The handler upserts one budget row and one household profile row, then replaces preference and allergy rows when arrays are provided.

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
  "preferences": ["high-protein", "local-meals"],
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

Returns meals from the Supabase `meals` table, ordered by `name`.

Optional query parameters:

```text
category=breakfast|lunch|dinner
```

Example:

```http
GET /meals?category=breakfast
```

Success response:

```json
{
  "success": true,
  "message": "Meals retrieved successfully",
  "data": [
    {
      "id": "meal-id",
      "name": "Akara and Pap",
      "category": "breakfast",
      "price_min": 1500,
      "price_max": 2500,
      "prep_time_mins": 30,
      "dietary_tags": ["vegetarian"]
    }
  ]
}
```

### `POST /meals-plan/generate`

Creates a new active meal plan for the authenticated user and inserts the selected meal items.

Request body:

```json
{
  "items": [
    {
      "meal_id": "meal-id-1",
      "day_of_week": "monday",
      "meal_slot": "breakfast"
    },
    {
      "meal_id": "meal-id-2",
      "day_of_week": "monday",
      "meal_slot": "lunch"
    }
  ]
}
```

`items` is required and must be a non-empty array. Missing or empty `items` returns `400`.

Success response:

```json
{
  "success": true,
  "message": "Meal plan generated successfully",
  "data": {
    "id": "plan-id",
    "user_id": "user-id",
    "status": "active",
    "meal_plan_items": [
      {
        "id": "item-id",
        "day_of_week": "monday",
        "meal_slot": "breakfast",
        "meals": {
          "id": "meal-id-1",
          "name": "Akara and Pap",
          "category": "breakfast",
          "price_min": 1500,
          "price_max": 2500,
          "prep_time_mins": 30,
          "dietary_tags": ["vegetarian"]
        }
      }
    ]
  }
}
```

### `GET /meals-plan/:id`

Returns one saved meal plan that belongs to the authenticated user. Users cannot fetch another user's plan through this endpoint.

Success response:

```json
{
  "success": true,
  "message": "Meal plan retrieved successfully",
  "data": {
    "id": "plan-id",
    "user_id": "user-id",
    "status": "active",
    "meal_plan_items": [
      {
        "id": "item-id",
        "day_of_week": "monday",
        "meal_slot": "breakfast",
        "meals": {
          "id": "meal-id",
          "name": "Akara and Pap",
          "category": "breakfast",
          "price_min": 1500,
          "price_max": 2500,
          "prep_time_mins": 30,
          "dietary_tags": ["vegetarian"],
          "instructions": "Preparation instructions"
        }
      }
    ]
  }
}
```

If the plan does not exist or does not belong to the authenticated user, the route returns `404`.

### `GET /ingredients/:planId`

Returns shopping-list ingredients for a meal plan that belongs to the authenticated user. Items are grouped by `category`, which represents the market section.

Success response:

```json
{
  "success": true,
  "message": "Ingredients retrieved successfully",
  "data": {
    "plan_id": "plan-id",
    "sections": {
      "Produce": [
        {
          "id": "item-id",
          "meal_plan_id": "plan-id",
          "name": "Tomatoes",
          "quantity": "6",
          "category": "Produce"
        }
      ],
      "Other": []
    }
  }
}
```

If the plan does not exist or does not belong to the authenticated user, the route returns `404`.

## Error Response Shape

Errors use the shared helper in `src/utils/helper.ts`:

```json
{
  "success": false,
  "message": "Error message"
}
```
