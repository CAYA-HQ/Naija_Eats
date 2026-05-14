# Setup Guide

This project runs on Bun with an Express API server and Supabase for authentication.

## Requirements

- Bun installed locally.
- A Supabase project.
- Supabase URL and anon key available in environment variables.

## Installation

Install dependencies from the backend directory:

```bash
bun install
```

Create a local environment file:

```bash
cp .env.example .env
```

Update `.env` with values for your Supabase project:

```env
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
PORT=3000
```

`src/config/supabase.ts` reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` at startup. If either value is missing, the server throws an error and does not start.

## Running The Server

Start the server with file watching:

```bash
bun run dev
```

Start the server without file watching:

```bash
bun run start
```

By default, the API runs on port `3000` unless `PORT` is set.

## Authentication Flow

1. A user registers with `POST /auth/register`.
2. A user logs in with `POST /auth/login`.
3. The login response includes a Supabase access token.
4. Protected routes require the token in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

## Database Schema

The backend expects the following tables to be present in your Supabase project:

- `profiles`: User profiles (full name, avatar URL).
- `meals`: Catalogue of available meals.
- `budgets`: User meal budgets.
- `household_profiles`: User household information (size, daily meals, etc.).
- `user_preferences`: Specific dietary preferences for users.
- `user_allergies`: User food allergies.
- `meal_plans`: Saved meal plans.
- `meal_plan_items`: Individual meals linked to a plan, categorized by day and slot.
- `shopping_list_items`: Ingredients for meal plans, categorized for the market.

Ensure that Row Level Security (RLS) is configured appropriately on these tables to protect user data.

Most routes use the shared `_res` helper in `src/utils/helper.ts`.

Success responses follow this shape:

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

Error responses follow this shape:

```json
{
  "success": false,
  "message": "Error message"
}
```
