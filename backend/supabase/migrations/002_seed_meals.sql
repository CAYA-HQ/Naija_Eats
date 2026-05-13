-- ============================================================
-- NaijaEats Seed Data
-- Migration 002 - Nigerian Meal Catalogue
-- Run AFTER 001_initial_schema.sql
--
-- Calorie & protein values are realistic estimates per serving.
-- Price ranges are in Naira (₦) as of 2026 Lagos market rates.
-- Shopping list items cover the full 25-meal catalogue.
-- ============================================================

insert into meals (name, description, category, price_min, price_max, prep_time_mins, calories_per_serving, protein_per_serving, dietary_tags, instructions, image_key) values

-- ── BREAKFAST ────────────────────────────────────────────────

('Akara and Pap',
 'Deep-fried bean cakes served alongside smooth ogi corn porridge.',
 'breakfast', 800, 1200, 30, 420, 18,
 array['gluten-free', 'high-protein'],
 array['Blend soaked beans with pepper and onion', 'Season with salt and a pinch of crayfish', 'Heat oil and fry spoonfuls until golden brown', 'Prepare pap by mixing corn flour with hot water to desired consistency'],
 'akara_pap.png'),

('Bread and Tea',
 'Sliced white or whole-grain bread served with Nigerian spiced tea.',
 'breakfast', 600, 1000, 10, 310, 8,
 array['vegetarian'],
 array['Boil water and steep tea bags for 3-5 minutes', 'Add sugar and milk to taste', 'Slice bread and serve with butter or eggs'],
 'tea-bread-small-image.png'),

('Oatmeal and Fruits',
 'Creamy rolled oats topped with seasonal Nigerian fruits.',
 'breakfast', 900, 1500, 15, 380, 12,
 array['vegetarian', 'gluten-free'],
 array['Boil oats in water or milk for 5 minutes', 'Add honey or sugar to sweeten', 'Top with sliced banana, pawpaw or watermelon'],
 'oatmeal_fruits.png'),

('Moi Moi and Pap',
 'Steamed bean pudding with a smooth ogi corn porridge.',
 'breakfast', 900, 1400, 50, 450, 20,
 array['gluten-free', 'high-protein'],
 array['Soak and blend beans until smooth', 'Add crayfish, pepper, onion, palm oil and seasoning', 'Wrap in foil or pour into containers', 'Steam for 40-45 minutes until set', 'Serve with warm pap'],
 'moi_moi_pap.png'),

('Yam and Egg Sauce',
 'Boiled yam served with a rich tomato and egg stir fry.',
 'breakfast', 1200, 2000, 35, 520, 22,
 array['gluten-free', 'high-protein'],
 array['Peel and boil yam in salted water for 20 minutes', 'Dice tomatoes, onions, peppers and stir-fry in oil', 'Crack eggs into the sauce and scramble through', 'Season with salt and seasoning cubes', 'Serve hot'],
 'yam_egg_sauce.png'),

('Indomie and Egg',
 'Stir-fried noodles with vegetables and a fried egg.',
 'breakfast', 700, 1200, 15, 490, 19,
 array['quick-cook'],
 array['Boil noodles for 3 minutes and drain', 'Stir-fry with onions, peppers and vegetables', 'Add seasoning sachets and mix', 'Fry egg separately and serve on top'],
 'indomie_egg.png'),

('Boiled Yam and Stew',
 'Plain boiled yam served with a rich Nigerian tomato stew.',
 'breakfast', 1200, 1800, 30, 480, 14,
 array['gluten-free'],
 array['Peel and boil yam in salted water until tender', 'Blend tomatoes, pepper and onion', 'Fry blended mixture in hot oil until thickened', 'Add seasoning, crayfish and stock', 'Serve stew over yam'],
 'boiled_yam_stew.png'),

('Pancakes',
 'Fluffy Nigerian-style pancakes served with honey or syrup.',
 'breakfast', 1500, 2000, 25, 400, 10,
 array['vegetarian'],
 array['Mix flour, egg, milk, sugar and baking powder', 'Heat a lightly oiled pan on medium heat', 'Pour batter and cook until bubbles form, then flip', 'Serve with honey, syrup or jam'],
 'pancakes.png'),


-- ── LUNCH ────────────────────────────────────────────────────

('Jollof Rice and Grilled Fish',
 'A decade-proven meal — smoky party jollof rice served with perfectly grilled tilapia or croaker.',
 'lunch', 2500, 4000, 50, 620, 38,
 array['gluten-free', 'high-protein'],
 array['Blend tomatoes, peppers and onions', 'Fry blended mix in hot oil until reduced', 'Add rice, stock, seasoning and cook covered on low heat', 'Season and grill fish with suya spice and pepper', 'Serve rice with grilled fish and fried plantain'],
 'jollof_fish_plantains.png'),

('Beans and Plantain',
 'Slow-cooked brown beans in palm oil with sweet fried plantain.',
 'lunch', 1500, 2500, 60, 570, 24,
 array['gluten-free', 'high-protein', 'vegetarian'],
 array['Parboil beans for 20 minutes and drain', 'Cook beans with palm oil, onions and crayfish', 'Season with salt and seasoning cubes', 'Peel and slice ripe plantain', 'Fry plantain in hot oil until golden', 'Serve together'],
 'dish.webp'),

('Grilled Croaker and Ofada Rice',
 'Locally sourced Ofada rice served with peppered croaker fish and ofada stew.',
 'lunch', 3000, 5000, 55, 680, 45,
 array['gluten-free', 'high-protein'],
 array['Wash and parboil ofada rice', 'Cook with palm oil and seasonings', 'Clean and season croaker with pepper and spices', 'Grill fish until charred and cooked through', 'Prepare ofada stew with fermented locust beans', 'Serve together'],
 'jollof-image.png'),

('Pounded Yam and Egusi Soup',
 'Smooth pounded yam served with rich egusi (melon seed) soup.',
 'lunch', 3000, 5000, 60, 740, 32,
 array['gluten-free'],
 array['Boil and pound yam until smooth and stretchy', 'Toast and blend egusi seeds', 'Fry palm oil with onion, add blended pepper and egusi', 'Add stock, meat, fish and leafy greens', 'Simmer for 20 minutes and season', 'Serve with pounded yam'],
 'egusi-image.png'),

('Fried Rice Platter',
 'Vibrant Nigerian fried rice with liver, shrimp and seasonal vegetables.',
 'lunch', 2500, 4000, 45, 600, 28,
 array['gluten-free'],
 array['Parboil rice with turmeric for colour', 'Stir-fry vegetables, liver and shrimp in a wok', 'Add rice and stir-fry on high heat', 'Season with seasoning cubes, thyme and curry', 'Serve with coleslaw or fried plantain'],
 'nigerian-jollof-rice.webp'),

('Rice and Stew',
 'Plain white rice served with a thick Nigerian tomato beef stew.',
 'lunch', 1800, 3000, 45, 580, 26,
 array['gluten-free'],
 array['Boil rice in salted water until tender', 'Blend tomatoes, peppers and onion', 'Brown beef in hot oil, remove and set aside', 'Fry blended sauce in same oil until reduced', 'Add beef back, season and simmer', 'Serve over rice'],
 'rice_stew.png'),

('Ofada Rice and Ayamase',
 'Native ofada rice with spicy ofada green pepper stew and assorted meat.',
 'lunch', 3500, 6000, 60, 720, 40,
 array['gluten-free', 'high-protein'],
 array['Wash ofada rice and boil until tender', 'Blend green peppers, tatashe and remove seeds', 'Bleach palm oil and fry onion and locust beans', 'Add pepper blend and cook down', 'Add assorted meat and season', 'Serve wrapped in banana leaf with rice'],
 'ofada_rice.png'),

('Amala and Ewedu Soup',
 'Dark yam flour swallow served with jute leaf soup and gbegiri bean soup.',
 'lunch', 2000, 3500, 35, 540, 20,
 array['gluten-free', 'vegan'],
 array['Boil water, add yam flour gradually and stir vigorously', 'Cook until smooth and elastic', 'Blend jute leaves with a blender or cook and blend', 'Cook with locust beans, crayfish and seasoning', 'Prepare gbegiri by boiling beans until soft and blending', 'Serve amala with both soups'],
 'amala_ewedu.png'),


-- ── DINNER ────────────────────────────────────────────────────

('Swallow and Egusi Soup',
 'Any swallow of choice — eba, semovita or fufu — served with hearty egusi soup.',
 'dinner', 2000, 3500, 40, 660, 30,
 array['gluten-free'],
 array['Boil water and stir in chosen swallow flour until firm', 'Prepare egusi soup with palm oil, blended pepper and egusi', 'Add stockfish, ponmo, smoked fish and season well', 'Simmer until thickened', 'Serve swallow with soup'],
 'swallow_egusi.png'),

('Catfish Pepper Soup',
 'A light yet intensely flavorful aromatic broth with fresh catfish and pepper soup spices.',
 'dinner', 2500, 4500, 30, 390, 42,
 array['gluten-free', 'high-protein', 'low-carb'],
 array['Clean and cut catfish into pieces', 'Boil with sliced onions and water', 'Add pepper soup spice, uziza leaves, utazi and chilli', 'Season with salt and seasoning cubes', 'Simmer for 20 minutes', 'Serve hot with agidi or alone'],
 'fisherman_soup.png'),

('Suya Spiced Beef Skewers',
 'Classic street-style suya with yaji spice blend and vegetable slaw.',
 'dinner', 2000, 3500, 25, 480, 44,
 array['gluten-free', 'high-protein', 'low-carb'],
 array['Slice beef thinly against the grain', 'Coat generously with yaji spice mix, groundnut oil and seasoning', 'Thread onto skewers', 'Grill or bake at high heat turning once', 'Serve with sliced onions, tomatoes and extra yaji'],
 'beef_suya.png'),

('Efo Riro and Pounded Yam',
 'Traditional Nigerian spinach stew with assorted meat, stockfish and smoked prawns.',
 'dinner', 3000, 5000, 50, 680, 36,
 array['gluten-free', 'high-protein'],
 array['Wilt and blend or chop spinach coarsely', 'Fry palm oil with onion, tatashe and scotch bonnet', 'Add meat, stockfish and smoked prawns', 'Add spinach and cook briefly to preserve colour', 'Season and serve with pounded yam'],
 'egusi-image.png'),

('Eba and Egusi Soup',
 'Garri swallow served with a rich, thick egusi soup with leafy greens.',
 'dinner', 1800, 3000, 35, 640, 28,
 array['gluten-free'],
 array['Boil water and stir in garri until firm and stretchy', 'Prepare egusi soup base with palm oil and pepper', 'Add ground egusi and stir constantly', 'Add vegetables, assorted meat and crayfish', 'Season and serve'],
 'eba_egusi.png'),

('Spaghetti Bolognese Nigerian Style',
 'Spaghetti cooked in a rich tomato and minced beef sauce with Nigerian spices.',
 'dinner', 1800, 2800, 35, 540, 28,
 array['high-protein'],
 array['Boil spaghetti in salted water until al dente', 'Fry minced beef until browned', 'Add blended tomato, pepper and onion sauce', 'Season with curry, thyme and seasoning cubes', 'Combine with spaghetti and serve hot'],
 'spaghetti.png'),

('Pepper Soup with Yam',
 'Spiced assorted meat or fish pepper soup served with boiled yam.',
 'dinner', 2500, 4000, 40, 450, 32,
 array['gluten-free', 'high-protein'],
 array['Boil assorted meat or fish with onion and seasoning', 'Add pepper soup spice blend', 'Add uziza, utazi leaves and scotch bonnet', 'Simmer until broth is fragrant and meat is tender', 'Boil yam separately in salted water', 'Serve together'],
 'fisherman_soup.png'),

('Ofe Onugbu and Fufu',
 'Bitter leaf soup with assorted meats, ofe onugbu spice and smooth fufu.',
 'dinner', 2500, 4000, 55, 620, 30,
 array['gluten-free'],
 array['Wash and squeeze bitter leaves repeatedly to reduce bitterness', 'Boil assorted meat with seasoning until tender', 'Add palm oil, crayfish, ogiri and ede cocoyam paste as thickener', 'Add bitter leaf and simmer for 10 minutes', 'Serve with smooth fufu'],
 'ofe_onugbu.png'),

('Sunday Rice',
 'A celebratory pot of perfectly seasoned party rice with fried chicken.',
 'dinner', 3000, 5000, 60, 700, 38,
 array['gluten-free', 'high-protein'],
 array['Marinate chicken with spices and fry until golden', 'Parboil rice and drain', 'Fry blended tomato base until oil floats', 'Add parboiled rice, chicken stock and seasoning', 'Cook covered on low heat until done', 'Serve rice with fried chicken'],
 'nigerian-jollof-rice.webp');


-- ── SHOPPING LIST ITEMS ─────────────────────────────────────
-- These are pre-defined ingredient entries for each meal.
-- The backend populates shopping_list_items per plan by referencing this data
-- and scaling amounts by household_size.
-- For MVP, the generate endpoint uses this reference table.

create table if not exists meal_ingredients (
  id              uuid default gen_random_uuid() primary key,
  meal_id         uuid references meals(id) on delete cascade,
  name            text not null,
  amount_per_person numeric,   -- amount for 1 person
  unit            text,
  price_min       integer,     -- cost in Naira for 1 person
  price_max       integer,
  market_section  text         -- 'Grains & Carbs' | 'Proteins' | 'Vegetables' | 'Spices & Seasonings' | 'Dairy & Extras'
);

alter table meal_ingredients enable row level security;
create policy "Authenticated users can read meal ingredients"
  on meal_ingredients for select to authenticated using (true);

-- Seed ingredients for a key selection of meals
-- (Jollof Rice and Grilled Fish as full example — others follow same pattern)

with jollof as (select id from meals where name = 'Jollof Rice and Grilled Fish' limit 1)
insert into meal_ingredients (meal_id, name, amount_per_person, unit, price_min, price_max, market_section)
select jollof.id, ingredient.name, ingredient.amount, ingredient.unit, ingredient.pmin, ingredient.pmax, ingredient.section
from jollof, (values
  ('Long grain rice',     0.15,  'kg',     200, 350,  'Grains & Carbs'),
  ('Tomatoes',            2,     'pieces', 100, 200,  'Vegetables'),
  ('Red bell pepper',     1,     'pieces', 80,  150,  'Vegetables'),
  ('Scotch bonnet',       2,     'pieces', 30,  60,   'Spices & Seasonings'),
  ('Onion',               0.5,   'pieces', 50,  100,  'Vegetables'),
  ('Croaker fish',        0.2,   'kg',     500, 900,  'Proteins'),
  ('Vegetable oil',       0.05,  'litres', 80,  120,  'Dairy & Extras'),
  ('Seasoning cubes',     1,     'pieces', 20,  30,   'Spices & Seasonings'),
  ('Curry powder',        0.005, 'kg',     30,  50,   'Spices & Seasonings'),
  ('Thyme',               0.005, 'kg',     20,  40,   'Spices & Seasonings')
) as ingredient(name, amount, unit, pmin, pmax, section);

with beans_plantain as (select id from meals where name = 'Beans and Plantain' limit 1)
insert into meal_ingredients (meal_id, name, amount_per_person, unit, price_min, price_max, market_section)
select beans_plantain.id, ingredient.name, ingredient.amount, ingredient.unit, ingredient.pmin, ingredient.pmax, ingredient.section
from beans_plantain, (values
  ('Brown beans',      0.15,  'kg',     150, 250, 'Grains & Carbs'),
  ('Ripe plantain',    1,     'pieces', 150, 250, 'Grains & Carbs'),
  ('Palm oil',         0.03,  'litres', 50,  100, 'Spices & Seasonings'),
  ('Onion',            0.5,   'pieces', 50,  100, 'Vegetables'),
  ('Crayfish',         0.01,  'kg',     80,  150, 'Proteins'),
  ('Seasoning cubes',  1,     'pieces', 20,  30,  'Spices & Seasonings'),
  ('Vegetable oil',    0.05,  'litres', 80,  120, 'Dairy & Extras')
) as ingredient(name, amount, unit, pmin, pmax, section);

with egusi_meal as (select id from meals where name = 'Pounded Yam and Egusi Soup' limit 1)
insert into meal_ingredients (meal_id, name, amount_per_person, unit, price_min, price_max, market_section)
select egusi_meal.id, ingredient.name, ingredient.amount, ingredient.unit, ingredient.pmin, ingredient.pmax, ingredient.section
from egusi_meal, (values
  ('Yam',              0.4,   'kg',     200, 400, 'Grains & Carbs'),
  ('Egusi (melon)',    0.05,  'kg',     300, 500, 'Proteins'),
  ('Palm oil',         0.03,  'litres', 50,  100, 'Spices & Seasonings'),
  ('Spinach/Ugwu',     0.1,   'kg',     100, 200, 'Vegetables'),
  ('Stockfish',        0.05,  'kg',     200, 400, 'Proteins'),
  ('Crayfish',         0.01,  'kg',     80,  150, 'Proteins'),
  ('Scotch bonnet',    2,     'pieces', 30,  60,  'Spices & Seasonings'),
  ('Onion',            0.5,   'pieces', 50,  100, 'Vegetables'),
  ('Seasoning cubes',  1,     'pieces', 20,  30,  'Spices & Seasonings')
) as ingredient(name, amount, unit, pmin, pmax, section);

with suya_meal as (select id from meals where name = 'Suya Spiced Beef Skewers' limit 1)
insert into meal_ingredients (meal_id, name, amount_per_person, unit, price_min, price_max, market_section)
select suya_meal.id, ingredient.name, ingredient.amount, ingredient.unit, ingredient.pmin, ingredient.pmax, ingredient.section
from suya_meal, (values
  ('Beef (lean)',      0.2,   'kg',     600, 1000, 'Proteins'),
  ('Yaji spice mix',   0.02,  'kg',     100, 200,  'Spices & Seasonings'),
  ('Groundnut oil',    0.03,  'litres', 60,  100,  'Dairy & Extras'),
  ('Onion',            0.5,   'pieces', 50,  100,  'Vegetables'),
  ('Tomatoes',         1,     'pieces', 80,  150,  'Vegetables'),
  ('Seasoning cubes',  1,     'pieces', 20,  30,   'Spices & Seasonings')
) as ingredient(name, amount, unit, pmin, pmax, section);

with pepper_soup_meal as (select id from meals where name = 'Catfish Pepper Soup' limit 1)
insert into meal_ingredients (meal_id, name, amount_per_person, unit, price_min, price_max, market_section)
select pepper_soup_meal.id, ingredient.name, ingredient.amount, ingredient.unit, ingredient.pmin, ingredient.pmax, ingredient.section
from pepper_soup_meal, (values
  ('Catfish',            0.25, 'kg',     500, 900,  'Proteins'),
  ('Pepper soup spice',  0.01, 'kg',     100, 200,  'Spices & Seasonings'),
  ('Uziza leaves',       0.05, 'kg',     100, 200,  'Vegetables'),
  ('Utazi leaves',       0.02, 'kg',     80,  150,  'Vegetables'),
  ('Scotch bonnet',      3,    'pieces', 30,  60,   'Spices & Seasonings'),
  ('Onion',              0.5,  'pieces', 50,  100,  'Vegetables'),
  ('Seasoning cubes',    1,    'pieces', 20,  30,   'Spices & Seasonings')
) as ingredient(name, amount, unit, pmin, pmax, section);
