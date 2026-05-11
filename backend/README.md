# Naija Eats Backend

Backend API for Naija Eats, built with Bun, Express, TypeScript, and Supabase.

## What It Does

- Handles user registration and login through Supabase Auth.
- Protects meal and meal-plan routes with bearer-token authentication.
- Saves onboarding preferences, budget details, household profile data, and allergies.
- Reads meals from the Supabase meal catalogue.
- Creates and retrieves saved meal plans for the authenticated user.
- Returns grouped shopping-list ingredients for a saved meal plan.
- Uses shared JSON response helpers for consistent success and error payloads.

## Quick Start

Install dependencies:

```bash
bun install
```

Create a local environment file:

```bash
touch .env
```

Add your Supabase values:

```env
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
PORT=3000
```

Run the API in development mode:

```bash
bun run dev
```

The server listens on `PORT` from `.env`, or `3000` by default.

## Docker

Build and run the image directly:

```bash
docker build -t naija-eats-backend .
docker run --env-file .env -p 3000:3000 naija-eats-backend
```

## Scripts

- `bun run dev`: starts the server with file watching.
- `bun run start`: starts the server once.
- `./test.sh [BASE_URL]`: runs a curl-based smoke test against a running API. Requires `curl` and `jq`.
- `./test-live.sh [BASE_URL]`: same live API smoke test script.

## Documentation

- [Setup guide](docs/setup.md)
- [API reference](docs/api.md)

## Project Structure

```text
src/
  app.ts                 Express app, middleware, and route mounting
  server.ts              Runtime entry point
  config/supabase.ts     Supabase client configuration
  middleware/auth.ts     Bearer-token authentication middleware
  routes/auth.ts         Registration and login routes
  routes/meals.ts        Preference, meal catalogue, meal-plan, and ingredient routes
  utils/helper.ts        Shared response helpers
```
