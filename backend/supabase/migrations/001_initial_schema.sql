-- ============================================================
-- NaijaEats Database Schema
-- Migration 001 - Initial Schema
-- Run this in Supabase SQL Editor to set up the full database
-- ============================================================


-- ── PROFILES ────────────────────────────────────────────────
-- Extends Supabase auth.users with display info.
-- id must match auth.users(id) exactly.
create table if not exists profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table profiles enable row level security;
create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);


-- ── BUDGETS ─────────────────────────────────────────────────
-- Stores budget data from SetBudget onboarding screen.
-- budget_tier: 'Low cost' | 'Standard' | 'Premium'
-- frequency: 'Weekly' | 'Monthly'
-- fluctuation_buffer: e.g. 10, 15, 20 (stored as integer %)
create table if not exists budgets (
  id                  uuid default gen_random_uuid() primary key,
  user_id             uuid references auth.users(id) on delete cascade unique,
  budget_tier         text,
  budget_value        text,      -- e.g. "7000-10000"
  amount_min          numeric,   -- lower bound parsed from budget_value
  amount_max          numeric,   -- upper bound parsed from budget_value
  frequency           text,      -- 'Weekly' | 'Monthly'
  fluctuation_buffer  integer default 10,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

alter table budgets enable row level security;
create policy "Users can manage own budget"
  on budgets for all using (auth.uid() = user_id);


-- ── HOUSEHOLD PROFILES ──────────────────────────────────────
-- Stores cooking frequency data from CookingFrequency onboarding screen.
-- household_size: 1 | 2 | 3 | 4
-- daily_meals: 1 | 2 | 3
-- cooking_frequency: e.g. 'Daily (7 Days)' — stored as array since user can pick multiple
create table if not exists household_profiles (
  id                  uuid default gen_random_uuid() primary key,
  user_id             uuid references auth.users(id) on delete cascade unique,
  household_size      integer default 1,
  daily_meals         integer default 3,
  is_dessert          boolean default false,
  cooking_frequency   text[] default '{}',
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

alter table household_profiles enable row level security;
create policy "Users can manage own household profile"
  on household_profiles for all using (auth.uid() = user_id);


-- ── USER PREFERENCES ────────────────────────────────────────
-- One row per preference tag (e.g. 'Rice Dishes', 'Soups & Stews').
-- Selected preference indices from FoodPreferences screen map to these labels.
create table if not exists user_preferences (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  preference  text not null,
  created_at  timestamptz default now()
);

alter table user_preferences enable row level security;
create policy "Users can manage own preferences"
  on user_preferences for all using (auth.uid() = user_id);


-- ── USER ALLERGIES ──────────────────────────────────────────
-- One row per allergy entry. Populated from FoodPreferences screen.
create table if not exists user_allergies (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  allergy     text not null,
  created_at  timestamptz default now()
);

alter table user_allergies enable row level security;
create policy "Users can manage own allergies"
  on user_allergies for all using (auth.uid() = user_id);


-- ── MEALS ───────────────────────────────────────────────────
-- The Nigerian meal catalogue. Seeded via 002_seed_meals.sql.
-- calories_per_serving: base calories for a single serving
-- protein_per_serving: grams of protein per serving
-- image_key: filename of the image (matches /images/ folder in frontend)
-- dietary_tags: array e.g. ['gluten-free', 'high-protein']
-- instructions: ordered array of cooking steps
create table if not exists meals (
  id                    uuid default gen_random_uuid() primary key,
  name                  text not null,
  description           text,
  category              text not null,   -- 'breakfast' | 'lunch' | 'dinner'
  price_min             integer not null, -- in Naira, per serving
  price_max             integer not null,
  prep_time_mins        integer,
  calories_per_serving  integer,         -- kcal per single serving
  protein_per_serving   integer,         -- grams per single serving
  dietary_tags          text[] default '{}',
  instructions          text[] default '{}',
  image_key             text,            -- e.g. 'jollof_fish_plantains.png'
  created_at            timestamptz default now()
);

-- Meals are public read — any authenticated user can fetch the catalogue
alter table meals enable row level security;
create policy "Authenticated users can read meals"
  on meals for select to authenticated using (true);


-- ── MEAL PLANS ──────────────────────────────────────────────
-- One row per generated plan. Status: 'active' | 'saved' | 'archived'
-- computed_* fields are populated by the backend at generation time
create table if not exists meal_plans (
  id                    uuid default gen_random_uuid() primary key,
  user_id               uuid references auth.users(id) on delete cascade,
  status                text default 'active',
  total_price_min       integer,          -- sum of all meal price_min
  total_price_max       integer,          -- sum of all meal price_max
  avg_calories          integer,          -- average calories per meal across the plan
  avg_protein           integer,          -- average protein per meal
  avg_prep_time         integer,          -- average prep time in minutes
  total_meals           integer,          -- number of meal slots in the plan
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

alter table meal_plans enable row level security;
create policy "Users can manage own meal plans"
  on meal_plans for all using (auth.uid() = user_id);


-- ── MEAL PLAN ITEMS ─────────────────────────────────────────
-- Join table between meal_plans and meals.
-- day_of_week: 'monday' | 'tuesday' | ... | 'sunday'
-- meal_slot: 'breakfast' | 'lunch' | 'dinner'
-- computed_calories: calories adjusted for household size (see calorie logic below)
create table if not exists meal_plan_items (
  id                  uuid default gen_random_uuid() primary key,
  plan_id             uuid references meal_plans(id) on delete cascade,
  meal_id             uuid references meals(id),
  day_of_week         text not null,
  meal_slot           text not null,
  computed_calories   integer,   -- calories_per_serving * household_size (scaled)
  computed_protein    integer    -- protein_per_serving * household_size (scaled)
);

alter table meal_plan_items enable row level security;
create policy "Users can manage own plan items"
  on meal_plan_items for all
  using (
    exists (
      select 1 from meal_plans
      where meal_plans.id = meal_plan_items.plan_id
        and meal_plans.user_id = auth.uid()
    )
  );


-- ── SHOPPING LIST ITEMS ─────────────────────────────────────
-- Populated by the backend when a meal plan is generated.
-- market_section: 'Grains & Carbs' | 'Proteins' | 'Vegetables' | 'Spices & Seasonings' | 'Dairy & Extras'
create table if not exists shopping_list_items (
  id              uuid default gen_random_uuid() primary key,
  meal_plan_id    uuid references meal_plans(id) on delete cascade,
  name            text not null,
  amount          numeric,
  unit            text,          -- 'kg' | 'g' | 'pieces' | 'litres' | 'cups'
  price_min       integer,
  price_max       integer,
  market_section  text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table shopping_list_items enable row level security;
create policy "Users can manage own shopping list"
  on shopping_list_items for all
  using (
    exists (
      select 1 from meal_plans
      where meal_plans.id = shopping_list_items.meal_plan_id
        and meal_plans.user_id = auth.uid()
    )
  );
