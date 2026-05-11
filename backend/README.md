# Naija Eats Backend

Backend API for Naija Eats, built with Bun, Express, TypeScript, and Supabase.

## What It Does

- Handles user registration and login through Supabase Auth.
- Protects meal and meal-plan routes with bearer-token authentication.
- Provides placeholder endpoints for preferences, meals, meal plans, and ingredients.
- Uses shared JSON response helpers for consistent success and error payloads.

## Quick Start

Install dependencies:

```bash
bun install
```

Create your environment file:

```bash
cp .env.example .env
```

Run the API in development mode:

```bash
bun run dev
```

The server listens on `PORT` from `.env`, or `3000` by default.

## Docker

Build and start the API with Docker Compose:

```bash
docker compose up --build
```

Or build and run the image directly:

```bash
docker build -t naija-eats-backend .
docker run --env-file .env -p 3000:3000 naija-eats-backend
```

## Scripts

- `bun run dev`: starts the server with file watching.
- `bun run start`: starts the server once.

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
  routes/meals.ts        Meal preference, meals, meal-plan, and ingredient routes
  utils/helper.ts        Shared response helpers
```
