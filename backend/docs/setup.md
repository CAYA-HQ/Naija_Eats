# Setup Guide

This project runs on Bun with an Express API server and Supabase for authentication.

## Requirements

- Bun installed locally.
- A Supabase project.
- Supabase URL and anon key available in environment variables.
- `curl` and `jq` if you want to run the smoke-test scripts.

## Installation

Install dependencies from the backend directory:

```bash
bun install
```

Create a local environment file:

```bash
touch .env
```

Update `.env` with values for your Supabase project:

```env
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
PORT=3000
```

`src/config/supabase.ts` reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` at startup. If either value is missing, the server throws an error and does not start.

## Supabase Data Model

The backend expects these Supabase tables to exist:

- `profiles`: receives a row with `full_name` and `avatar_url` during registration.
- `budgets`: upserted by `POST /preference` with `user_id`, `amount`, `frequency`, and `fluctuation_buffer`.
- `household_profiles`: upserted by `POST /preference` with `user_id`, `household_size`, `daily_meals`, `is_dessert`, and `cooking_frequency`.
- `user_preferences`: replaced by `POST /preference` when a `preferences` array is provided.
- `user_allergies`: replaced by `POST /preference` when an `allergies` array is provided.
- `meals`: read by `GET /meals`.
- `meal_plans`: written and read by meal-plan routes.
- `meal_plan_items`: written and read by meal-plan routes.
- `shopping_list_items`: read by `GET /ingredients/:planId`.

The route handlers rely on Supabase Auth user IDs. Row-level security policies should allow authenticated users to access only their own rows where applicable.

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

Check the running server:

```bash
curl http://localhost:3000/health
```

## Authentication Flow

1. A user registers with `POST /auth/register`.
2. A user logs in with `POST /auth/login`.
3. The login response includes a Supabase access token.
4. Protected routes require the token in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

The auth middleware validates the token through Supabase before allowing the request to continue.

## Smoke Testing

With the API running, run:

```bash
./test.sh http://localhost:3000
```

The script creates a temporary test email, exercises health, auth, and protected routes, and prints pass/fail results. It requires a working Supabase project and `jq` installed locally. `./test-live.sh` currently contains the same live API test flow.

## Response Shape

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

When a route does not pass a data payload, the helper sets `data` to `undefined`, so the serialized JSON response omits that key.
