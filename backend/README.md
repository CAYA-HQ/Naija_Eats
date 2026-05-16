# Naija Eats Backend

Backend API for Naija Eats, built with Bun, Express, TypeScript, Prisma, and PostgreSQL.

## What It Does

- Handles user registration and login with secure password hashing and JWT authentication.
- Protects meal and meal-plan routes with bearer-token authentication.
- Saves onboarding preferences, budget details, household profile data, and allergies.
- Manages a comprehensive meal catalogue with pricing and dietary information.
- Provides endpoints for creating, retrieving, and managing user-specific meal plans.
- Generates categorized shopping lists (ingredients) from active meal plans.
- Uses shared JSON response helpers for consistent success and error payloads.

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Environment Setup

Create a local environment file:

```bash
cp .env.example .env
```

Add your PostgreSQL connection string and secrets:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/naija_eats"
JWT_SECRET="your-secure-jwt-secret"
PORT=3000
```

### 3. Database Migration

Run Prisma migrations to set up your local database:

```bash
bun x prisma migrate dev
```

### 4. Run the API

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
prisma/
  schema.prisma          Prisma schema definition
  migrations/            Database migration history
src/
  app.ts                 Express app, middleware, and route mounting
  server.ts              Runtime entry point
  config/prisma.ts       Prisma client configuration
  middleware/auth.ts     JWT authentication middleware
  routes/auth.ts         Registration and login routes (Local Auth)
  routes/meals.ts        Meal catalogue and meal-plan routes
  routes/onboarding.ts   Preference and onboarding routes
  utils/helper.ts        Shared response helpers
```
