# Setup Guide

This project runs on Bun with an Express API server, Prisma ORM, and PostgreSQL.

## Requirements

- Bun installed locally.
- A PostgreSQL database (local or hosted).
- `curl` and `jq` if you want to run the smoke-test scripts.

## Installation

Install dependencies from the backend directory:

```bash
bun install
```

Create a local environment file:

```bash
cp .env.example .env
```

Update `.env` with your database connection and secrets:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/naija_eats"
JWT_SECRET="your-secure-jwt-secret"
PORT=3000
```

## Database Setup

The project uses Prisma to manage the database schema.

### 1. Initialize the Database

Run migrations to create the tables in your PostgreSQL instance:

```bash
bun x prisma migrate dev --name init
```

### 2. Generate Prisma Client

```bash
bun x prisma generate
```

## Data Model (Prisma)

The backend defines the following models in `prisma/schema.prisma`:

- `User`: Core user account (email, hashed password, phone).
- `Profile`: Extended user info (full name, avatar).
- `budgets`: User financial preferences.
- `household_profiles`: Family size and cooking frequency.
- `user_preferences` / `user_allergies`: Dietary constraints.
- `meals`: Catalogue of available meals.
- `meal_plans`: Grouped meal planning sessions.
- `meal_plan_items`: Individual meal assignments within a plan.
- `shopping_list_items`: Ingredients for the market.

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
3. The login response includes a JWT access token.
4. Protected routes require the token in the `Authorization` header:

```http
Authorization: Bearer <jwt_token>
```

The `authMiddleware` in `src/middleware/auth.ts` handles token verification and user context attachment.

## Smoke Testing

With the API running, you can run the smoke tests:

```bash
./test.sh http://localhost:3000
```

The script exercises health, auth, and protected routes. It requires `jq` installed locally.

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
