import { BurgerIcon, ForkAndKnife, SnackIcon, UtensilsIcon } from "./icons";

const DAY_COLORS = {
  Monday: "bg-orange-800",
  Tuesday: "bg-green-900",
  Wednesday: "bg-green-800",
  Thursday: "bg-orange-900",
  Friday: "bg-green-700",
  Saturday: "bg-orange-700",
  Sunday: "bg-green-800",
};

const SLOT_ICONS = {
  Breakfast: <SnackIcon className="text-text-primary" />,
  Lunch: <BurgerIcon className="text-accent-orange" />,
  Dinner: <ForkAndKnife className="text-text-primary" />,
};

const MEAL_IMAGE_MAP = {
  "jollof rice": "/images/jollof.webp",
  "egusi soup": "/images/swallow_egusi.png",
  "pounded yam": "/images/swallow_egusi.png",
  suya: "/images/beef_suya.png",
  "fried plantain (dodo)": "/images/plantain.jpg",
  "ogbono soup": "/images/ogbona.png",
  "efo riro": "/images/egusi.jpg",
  "fried rice": "/images/jollof_fish_plantains.png",
  akara: "/images/pap-and-akara.webp",
  "moi moi": "/images/moimoi-and-custard.jpg",
  "pepper soup": "/images/fisherman_soup.png",
  "banga soup": "/images/fisherman_soup.png",
  "tuwo shinkafa": "/images/swallow_egusi.png",
  amala: "/images/Amala_ewedu_and_assorted_meat.jpg",
  "ewa agoyin": "/images/plantain.jpg",
  asun: "/images/beef_suya.png",
  "okra soup": "/images/okra.jpg",
  "ofada rice": "/images/ofada-and-ponmo.jpg",
  "meat pie": "/images/puffpuff.png",
  "puff puff": "/images/puffpuff.png",
  "yam porridge": "/images/fried-yam-and-egg-sauce.jpg",
  "chin chin": "/images/puffpuff.png",
  boli: "/images/boiled-plantain.jpg",
  "fish stew": "/images/fisherman_soup.png",
  "chicken stew": "/images/rice-and-stew.jpg",
  "beef stew": "/images/rice-and-stew.jpg",
  "vegetable soup": "/images/vegetable.svg",
  "edikang ikong": "/images/egusi.jpg",
  "afang soup": "/images/egusi.jpg",
  "bitterleaf soup": "/images/egusi.jpg",
  "oha soup": "/images/egusi.jpg",
  "groundnut soup": "/images/swallow_egusi.png",
  "peppered snails": "/images/beef_suya.png",
  "scotch egg": "/images/bread_scrambled_egg.jpg",
  "egg roll": "/images/bread_scrambled_egg.jpg",
  "fried yam": "/images/fried-yam-and-egg-sauce.jpg",
  "roasted corn": "/images/plantain.jpg",
  "boiled corn": "/images/plantain.jpg",
  "plantain chips": "/images/plantain.jpg",
  "egg sauce": "/images/bread_scrambled_egg.jpg",
  "bread and fried egg": "/images/bread_scrambled_egg.jpg",
  semovita: "/images/swallow_egusi.png",
  "wheat flour swallow": "/images/swallow_egusi.png",
  garri: "/images/garri-and-groundnut.jpg",
  fufu: "/images/swallow_egusi.png",
  eba: "/images/swallow_egusi.png",
  "coconut rice": "/images/jollof.webp",
  "beans and plantain": "/images/plantain.jpg",
  "porridge beans": "/images/plantain.jpg",
  "spaghetti jollof": "/images/jollof_fish_plantains.png",
  indomie: "/images/indomie-and-eggs.jpg",
  "yam and egg sauce": "/images/fried-yam-and-egg-sauce.jpg",
  "akara and bread": "/images/pap-and-akara.webp",
  "tea and bread": "/images/tea-bread-small-image.png",
  "custard and akara": "/images/moimoi-and-custard.jpg",
  "pap (ogi)": "/images/pap-and-akara.webp",
  "fried titus fish": "/images/fisherman_soup.png",
  "grilled catfish": "/images/fisherman_soup.png",
  "cowleg pepper soup": "/images/fisherman_soup.png",
  "goat meat pepper soup": "/images/fisherman_soup.png",
  "chicken pepper soup": "/images/fisherman_soup.png",
  nkwobi: "/images/beef_suya.png",
  "isi ewu": "/images/beef_suya.png",
  abacha: "/images/garri-and-groundnut.jpg",
  ugba: "/images/garri-and-groundnut.jpg",
  okpa: "/images/moimoi-and-custard.jpg",
  "tuwo masara": "/images/swallow_egusi.png",
  "miyan kuka": "/images/swallow_egusi.png",
  "miyan tuwo": "/images/swallow_egusi.png",
  kilishi: "/images/beef_suya.png",
  "pasta carbonara": "/images/indomie-and-eggs.jpg",
  "pizza margherita": "/images/puffpuff.png",
  "beef burger": "/images/ribeye.png",
  "caesar salad": "/images/vegetable.svg",
  "sushi roll": "/images/fisherman_soup.png",
  "chicken curry": "/images/rice-and-stew.jpg",
  tacos: "/images/beef_suya.png",
  "grilled salmon": "/images/fisherman_soup.png",
  "vegetable stir-fry": "/images/vegetable.svg",
  pancakes: "/images/pancakes-and-coffee.jpg",
  "french toast": "/images/bread_scrambled_egg.jpg",
  "mashed potatoes": "/images/fried-yam-and-egg-sauce.jpg",
  "greek salad": "/images/vegetable.svg",
  lasagna: "/images/indomie-and-eggs.jpg",
  "chicken wings": "/images/grilled-chicken-and-chips.jpg",
  "fish and chips": "/images/grilled-chicken-and-chips.jpg",
  ramen: "/images/indomie-and-eggs.jpg",
  burrito: "/images/rice-and-stew.jpg",
  "fried rice (chinese)": "/images/jollof_fish_plantains.png",
  omelette: "/images/bread_scrambled_egg.jpg",
  sandwich: "/images/tea-bread-small-image.png",
  "chili con carne": "/images/beef_suya.png",
  "pad thai": "/images/indomie-and-eggs.jpg",
  falafel: "/images/pap-and-akara.webp",
  hummus: "/images/vegetable.svg",
  tiramisu: "/images/pancakes-and-coffee.jpg",
  brownies: "/images/pancakes-and-coffee.jpg",
  "apple pie": "/images/pancakes-and-coffee.jpg",
  "fruit smoothie": "/images/vegetable.svg",
  "steak and fries": "/images/ribeye.png",
};

export function getMealImage(mealName) {
  if (!mealName) return "/images/dish.webp";
  return MEAL_IMAGE_MAP[mealName.toLowerCase()] ?? "/images/dish.webp";
}

export default function transformTimetable(apiData) {
  const grouped = {};
  const items = apiData.items || apiData.data?.items || [];

  for (const item of items) {
    const { day_of_week, meal_slot, meal } = item;

    if (!grouped[day_of_week]) {
      grouped[day_of_week] = {
        day: day_of_week,
        color: DAY_COLORS[day_of_week] ?? "bg-green-800",
        meals: [],
      };
    }

    grouped[day_of_week].meals.push({
      id: item.id,
      mealId: meal.id,
      slug: meal.name.toLowerCase().replace(/\s+/g, "-"),
      type: meal_slot.toUpperCase(),
      name: meal.name,
      ingredients: meal.ingredients || [],
      prep_time_mins: meal.prep_time_mins ?? null,
      instructions: meal.instructions ?? null,
      // ✅ DB image_url takes priority, falls back to local image map
      image: meal.image_url || getMealImage(meal.name),
      price: `₦${Number(meal.price_min).toLocaleString()} - ₦${Number(meal.price_max).toLocaleString()}`,
      icon: SLOT_ICONS[meal_slot] ?? (
        <UtensilsIcon className="text-text-primary" />
      ),
    });
  }

  const ORDER = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return ORDER.filter((d) => grouped[d]).map((d) => grouped[d]);
}
