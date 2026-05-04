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

The current implementation returns placeholder data for these endpoints.

### `POST /preference`

Saves or retrieves meal preference data.

Current response:

```json
{
  "success": true,
  "message": "preference retrieved successfully",
  "data": {}
}
```

### `GET /meals`

Returns available meals.

Current response:

```json
{
  "success": true,
  "message": "meals retrieved successfully",
  "data": {}
}
```

### `POST /meals-plan/generate`

Generates a meal plan.

Current response:

```json
{
  "success": true,
  "message": "meals plan generated successfully",
  "data": {}
}
```

### `GET /meals-plan/:id`

Returns one meal plan by ID.

Current response:

```json
{
  "success": true,
  "message": "meals plan generated successfully",
  "data": {}
}
```

### `GET /ingredients/:planId`

Returns ingredients for a meal plan.

Current response:

```json
{
  "success": true,
  "message": "ingredients retrieved successfully",
  "data": {}
}
```
