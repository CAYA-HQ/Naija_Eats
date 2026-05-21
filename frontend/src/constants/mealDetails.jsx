import {
  SpiceIcon,
  LeafIcon,
  GrainIcon,
  UtensilsIcon,
} from "./icons";

export const MEAL_DETAILS = {
  "bread-and-egg": {
    time: "15 MINS",
    servings: "1 SERVING",
    ingredients: [
      "2 slices of Agege or Sliced Bread",
      "2 Large Eggs",
      "Half Onion (chopped)",
      "1 Small Tomato (chopped)",
      "1 tbsp Vegetable Oil",
      "Pinch of Salt & Pepper",
    ],
    steps: [
      {
        title: "Prep Veggies",
        desc: "Chop the onions and tomatoes into small pieces.",
      },
      {
        title: "Whisk Eggs",
        desc: "Crack eggs into a bowl, add chopped veggies, salt, and pepper. Whisk thoroughly.",
      },
      {
        title: "Fry Eggs",
        desc: "Heat oil in a pan. Pour egg mixture and fry on medium heat until set. Flip and cook the other side.",
      },
      {
        title: "Serve",
        desc: "Butter your bread and serve with the hot fried eggs.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "Add some sardine to the egg for extra flavor.",
        color: "bg-[#8B4513]/10",
      },
    ],
    proTip: {
      title: "Perfect Toast",
      text: "Lightly toast the bread on the pan after frying the eggs to soak up the remaining buttery flavor.",
    },
  },
  "jollof-rice-and-grilled-fish": {
    time: "55 MINS",
    servings: "4 SERVINGS",
    ingredients: [
      "3 cups Long-grain Rice",
      "2 Large Tilapia Fish",
      "6 Red Bell Peppers (Tatashe)",
      "3 Scotch Bonnets (Atarodo)",
      "1 cup Vegetable Oil",
      "Bay leaves & Thyme",
    ],
    steps: [
      {
        title: "Blend & Boil",
        desc: "Blend peppers, tomatoes, and onions. Boil the mixture until the water dries up.",
      },
      {
        title: "Fry Stew",
        desc: "Heat oil, fry onions, add tomato paste, then add the boiled pepper mix. Season well.",
      },
      {
        title: "Cook Rice",
        desc: "Add parboiled rice to the stew with stock. Cover with foil and lid. Cook on low heat.",
      },
      {
        title: "Grill Fish",
        desc: "Season fish with ginger, garlic, and pepper. Grill until golden brown.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "The secret is the steam! Keep the pot tightly sealed.",
        color: "bg-[#8B4513]/10",
      },
    ],
    proTip: {
      title: "Party Flavor",
      text: "Let the rice burn slightly at the bottom for that authentic smoky 'Party Jollof' taste.",
    },
  },
  "garri-and-groundnut": {
    time: "5 MINS",
    servings: "1 SERVING",
    ingredients: [
      "1 cup White or Yellow Garri",
      "Half cup Roasted Groundnuts",
      "Chilled Water",
      "Milk & Sugar (optional)",
    ],
    steps: [
      {
        title: "Wash Garri",
        desc: "Pour garri into a bowl and add water to rinse off any chaff. Drain quickly.",
      },
      {
        title: "Soak",
        desc: "Add fresh chilled water to the desired level.",
      },
      {
        title: "Sweeten",
        desc: "Add sugar and milk to taste.",
      },
      {
        title: "Add Crunch",
        desc: "Pour in your roasted groundnuts and enjoy.",
      },
    ],
    tips: [
      {
        icon: <LeafIcon className="w-6 h-6 text-text-primary" />,
        text: "Use ice-cold water for the most refreshing experience.",
        color: "bg-[#2D5A27]/10",
      },
    ],
    proTip: {
      title: "Ijebu Special",
      text: "Ijebu Garri is best for soaking because of its signature sour tang and how well it floats.",
    },
  },
  "toast-and-tea": {
    time: "10 MINS",
    servings: "1 SERVING",
    ingredients: [
      "4 slices of Bread",
      "1 Tea bag",
      "Milk & Sugar",
      "Butter or Jam",
    ],
    steps: [
      {
        title: "Brew Tea",
        desc: "Boil water and steep the tea bag for 3-5 minutes.",
      },
      {
        title: "Toast Bread",
        desc: "Place bread in a toaster or on a dry pan until golden brown.",
      },
      {
        title: "Mix Tea",
        desc: "Add milk and sugar to your preference.",
      },
      {
        title: "Spread",
        desc: "Apply butter or jam to your warm toast.",
      },
    ],
    tips: [
      {
        icon: <GrainIcon className="w-6 h-6 text-accent-orange" />,
        text: "Milo or chocolate powder makes it extra comforting.",
        color: "bg-accent-orange/10",
      },
    ],
    proTip: {
      title: "The Dip",
      text: "Dipping the toast into the tea is a classic way to enjoy this meal!",
    },
  },
  "beans-and-fried-plantain": {
    time: "60 MINS",
    servings: "2 SERVINGS",
    ingredients: [
      "2 cups Honey Beans",
      "2 Ripe Plantains",
      "Half cup Palm Oil",
      "Ground Crayfish",
      "1 Large Onion",
      "Dry Pepper",
    ],
    steps: [
      {
        title: "Boil Beans",
        desc: "Pick beans and boil until very soft. Add onions early to help it soften faster.",
      },
      {
        title: "Season",
        desc: "Add palm oil, crayfish, salt, and pepper. Stir and let it simmer for 10 minutes.",
      },
      {
        title: "Prep Plantain",
        desc: "Peel and slice plantains into rounds or diagonals. Sprinkle a little salt.",
      },
      {
        title: "Fry",
        desc: "Fry plantains in hot vegetable oil until golden brown.",
      },
    ],
    tips: [
      {
        icon: <UtensilsIcon className="w-6 h-6 text-text-link" />,
        text: "Adding a pinch of potash or onions makes beans cook faster.",
        color: "bg-text-link/10",
      },
    ],
    proTip: {
      title: "Dodo Quality",
      text: "The riper the plantain (with black spots), the sweeter it will be when fried.",
    },
  },
  "indomie-and-egg": {
    time: "10 MINS",
    servings: "1 SERVING",
    ingredients: [
      "2 packs of Instant Noodles",
      "1 or 2 Eggs",
      "Fresh Peppers & Onions",
      "Noodle Seasoning",
    ],
    steps: [
      {
        title: "Boil Water",
        desc: "Boil 2 cups of water in a small pot.",
      },
      {
        title: "Add Noodles",
        desc: "Add noodles and seasoning. Add chopped peppers and onions.",
      },
      {
        title: "Cook",
        desc: "Let it cook for 3 minutes until the water is almost dried up.",
      },
      {
        title: "Add Egg",
        desc: "Either boil the egg with the noodles or fry it separately as a side.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "Add a bit of vegetable oil to keep the noodles from sticking.",
        color: "bg-[#8B4513]/10",
      },
    ],
    proTip: {
      title: "The Stir-fry",
      text: "For more flavor, drain the water completely and stir-fry the noodles with the seasoning and egg.",
    },
  },
  "pap-and-akara": {
    time: "40 MINS",
    servings: "2 SERVINGS",
    ingredients: [
      "2 cups Peeled Beans",
      "Corn Starch (Pap/Ogi)",
      "Vegetable Oil for frying",
      "Onions & Scotch Bonnet",
    ],
    steps: [
      {
        title: "Blend Beans",
        desc: "Blend peeled beans with peppers and onions with very little water.",
      },
      {
        title: "Whisk",
        desc: "Whisk the bean paste thoroughly to incorporate air for fluffy akara.",
      },
      {
        title: "Fry",
        desc: "Scoop paste into hot oil and fry until golden brown.",
      },
      {
        title: "Make Pap",
        desc: "Dissolve pap in cold water, then pour boiling water over it while stirring.",
      },
    ],
    tips: [
      {
        icon: <LeafIcon className="w-6 h-6 text-text-primary" />,
        text: "Don't add salt to the akara paste until just before frying.",
        color: "bg-[#2D5A27]/10",
      },
    ],
    proTip: {
      title: "Fluffy Akara",
      text: "Whisking the batter in one direction for at least 5 minutes makes it light and airy.",
    },
  },
  "simple-beef-suya-and-bread": {
    time: "30 MINS",
    servings: "1 SERVING",
    ingredients: [
      "250g Lean Beef strips",
      "Suya Spice (Yaji)",
      "1 loaf of Fresh Bread",
      "Sliced Onions & Cabbage",
      "Vegetable Oil",
    ],
    steps: [
      {
        title: "Slice Beef",
        desc: "Thinly slice the beef against the grain.",
      },
      {
        title: "Coat",
        desc: "Coat the beef generously with suya spice and a little oil.",
      },
      {
        title: "Grill",
        desc: "Grill on skewers or flat until the beef is cooked through and slightly charred.",
      },
      {
        title: "Assemble",
        desc: "Serve with fresh bread, extra spice, and sliced onions.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "If you don't have a grill, a very hot cast iron pan works too.",
        color: "bg-[#8B4513]/10",
      },
    ],
    proTip: {
      title: "The Yaji Mix",
      text: "Add a little bit of groundnut oil to your Suya spice before coating for a more authentic 'Mai Suya' taste.",
    },
  },
  "rice-and-stew": {
    time: "45 MINS",
    servings: "4 SERVINGS",
    ingredients: [
      "3 cups White Rice",
      "Tomato & Pepper blend",
      "Beef or Chicken chunks",
      "Palm or Vegetable Oil",
      "Onions & Ginger/Garlic",
    ],
    steps: [
      {
        title: "Cook Rice",
        desc: "Wash and boil rice with a pinch of salt until tender.",
      },
      {
        title: "Fry Meat",
        desc: "Boil meat with seasonings, then fry or grill until brown.",
      },
      {
        title: "Cook Stew",
        desc: "Fry onions, add pepper blend, and cook until the oil separates from the mix.",
      },
      {
        title: "Combine",
        desc: "Add the meat to the stew and simmer for 10 minutes.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "Parboil your rice to remove excess starch for non-sticky grains.",
        color: "bg-[#8B4513]/10",
      },
    ],
    proTip: {
      title: "The Stew Secret",
      text: "Adding a little bit of palm oil to your vegetable oil stew gives it a richer, more traditional depth.",
    },
  },
  "bread-and-tea": {
    time: "10 MINS",
    servings: "1 SERVING",
    ingredients: [
      "1 Fresh Bread Loaf",
      "Hot Water",
      "Cocoa powder or Tea",
      "Condensed or Powdered Milk",
    ],
    steps: [
      {
        title: "Boil Water",
        desc: "Bring water to a rolling boil.",
      },
      {
        title: "Mix Drink",
        desc: "Combine tea/cocoa, milk, and sugar in a large mug.",
      },
      {
        title: "Slice Bread",
        desc: "Slice your bread or just tear it into chunks for 'dipping'.",
      },
    ],
    tips: [
      {
        icon: <GrainIcon className="w-6 h-6 text-accent-orange" />,
        text: "Warm the bread slightly for that 'just baked' feel.",
        color: "bg-accent-orange/10",
      },
    ],
    proTip: {
      title: "The Creamy Finish",
      text: "Add the milk last after the tea has steeped to maintain the richest texture.",
    },
  },
  "egusi-and-pounded-yam": {
    time: "75 MINS",
    servings: "3 SERVINGS",
    ingredients: [
      "2 cups Ground Egusi (Melon seeds)",
      "Spinach or Pumpkin leaves (Ugu)",
      "Assorted Meat & Stockfish",
      "Yam chunks for pounding",
      "Palm Oil",
    ],
    steps: [
      {
        title: "Boil Meat",
        desc: "Cook meat and stockfish with onions and seasoning until tender.",
      },
      {
        title: "Prep Egusi",
        desc: "Mix egusi with a little water to form a thick paste. Fry in palm oil to form lumps.",
      },
      {
        title: "Cook Soup",
        desc: "Add meat stock, pepper blend, and simmer. Add vegetables last.",
      },
      {
        title: "Pound Yam",
        desc: "Boil yam until soft, then pound in a mortar or use a food processor until stretchy.",
      },
    ],
    tips: [
      {
        icon: <UtensilsIcon className="w-6 h-6 text-text-link" />,
        text: "For the best lumps, don't stir the egusi for the first 5 minutes of frying.",
        color: "bg-text-link/10",
      },
    ],
    proTip: {
      title: "Stretchy Yam",
      text: "Add a little bit of the hot yam water while pounding to get that perfect smooth and stretchy consistency.",
    },
  },
  "fried-yam-and-egg-sauce": {
    time: "30 MINS",
    servings: "2 SERVINGS",
    ingredients: [
      "Half Yam tuber",
      "3 Eggs",
      "Tomatoes, Peppers, Onions",
      "Vegetable Oil",
      "Salt",
    ],
    steps: [
      {
        title: "Prep Yam",
        desc: "Slice yam into sticks or rounds. Wash and sprinkle with salt.",
      },
      {
        title: "Fry Yam",
        desc: "Deep fry in hot oil until the outside is crispy and the inside is soft.",
      },
      {
        title: "Make Sauce",
        desc: "Sauté onions and peppers, add whisked eggs, and scramble gently.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "Soak yam in salted water for 10 mins before frying for better texture.",
        color: "bg-[#8B4513]/10",
      },
    ],
    proTip: {
      title: "Golden Yam",
      text: "Add a teaspoon of sugar to the frying oil to give the yam a beautiful golden-brown color.",
    },
  },
  "moi-moi-and-custard": {
    time: "60 MINS",
    servings: "2 SERVINGS",
    ingredients: [
      "2 cups Peeled Beans",
      "Red Bell Peppers",
      "Boiled Eggs or Fish (for filling)",
      "Custard Powder",
      "Milk & Sugar",
    ],
    steps: [
      {
        title: "Blend Beans",
        desc: "Blend beans with peppers and onions until very smooth.",
      },
      {
        title: "Mix",
        desc: "Add oil, seasoning, and a little water. Mix until light.",
      },
      {
        title: "Steam",
        desc: "Pour into containers/leaves, add egg/fish, and steam for 45 mins.",
      },
      {
        title: "Make Custard",
        desc: "Mix custard with cold water, then add boiling water until it thickens.",
      },
    ],
    tips: [
      {
        icon: <LeafIcon className="w-6 h-6 text-text-primary" />,
        text: "Using 'Uma' leaves for steaming gives Moi Moi a unique traditional aroma.",
        color: "bg-[#2D5A27]/10",
      },
    ],
    proTip: {
      title: "Smooth Texture",
      text: "A little bit of vegetable oil mixed into the custard before adding boiling water prevents lumps.",
    },
  },
  "amala-and-ewedu": {
    time: "40 MINS",
    servings: "2 SERVINGS",
    ingredients: [
      "Yam Flour (Elubo)",
      "Jute Leaves (Ewedu)",
      "Locust Beans (Iru)",
      "Ground Crayfish",
      "Gbegiri (optional)",
    ],
    steps: [
      {
        title: "Make Amala",
        desc: "Boil water, turn off heat, add yam flour and stir vigorously until smooth. Add a little hot water and simmer.",
      },
      {
        title: "Cook Ewedu",
        desc: "Pick and wash jute leaves. Boil with a little water and iru until soft. Blend or use a short broom (ijabe).",
      },
      {
        title: "Serve",
        desc: "Serve hot with a side of stew and meat.",
      },
    ],
    tips: [
      {
        icon: <UtensilsIcon className="w-6 h-6 text-text-link" />,
        text: "Use a small amount of baking soda to help the Ewedu stay green and draw better.",
        color: "bg-text-link/10",
      },
    ],
    proTip: {
      title: "The 'Turn'",
      text: "The secret to smooth Amala is the strength of the 'turning'. Use a wooden spatula and be vigorous!",
    },
  },
  "grilled-chicken-and-fries": {
    time: "45 MINS",
    servings: "2 SERVINGS",
    ingredients: [
      "2 Chicken quarters",
      "4 Large Potatoes",
      "Chicken seasoning mix",
      "Vegetable Oil",
      "Ketchup/Mayonnaise",
    ],
    steps: [
      {
        title: "Marinate",
        desc: "Season chicken with spices and oil. Let it sit for 20 mins.",
      },
      {
        title: "Grill",
        desc: "Grill chicken at 200°C for 30-35 mins, turning halfway.",
      },
      {
        title: "Fry Chips",
        desc: "Peel and slice potatoes. Deep fry until crispy and golden.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "Double-fry the potatoes for extra crunch.",
        color: "bg-[#8B4513]/10",
      },
    ],
    proTip: {
      title: "Juicy Chicken",
      text: "Don't overcook! Internal temperature should be 75°C. Let it rest for 5 mins before serving.",
    },
  },
  "akara-and-ogi": {
    time: "40 MINS",
    servings: "2 SERVINGS",
    ingredients: [
      "Peeled Beans",
      "Corn Paste (Ogi)",
      "Peppers & Onions",
      "Oil for frying",
    ],
    steps: [
      {
        title: "Blend Beans",
        desc: "Blend beans with minimal water. Whisk until light and airy.",
      },
      {
        title: "Fry Akara",
        desc: "Scoop batter into hot oil. Fry until both sides are golden brown.",
      },
      {
        title: "Make Ogi",
        desc: "Dissolve corn paste in cold water. Pour boiling water over it and stir until it sets.",
      },
    ],
    tips: [
      {
        icon: <LeafIcon className="w-6 h-6 text-text-primary" />,
        text: "Add chopped onions directly to the batter for a nice crunch.",
        color: "bg-[#2D5A27]/10",
      },
    ],
    proTip: {
      title: "The Ogi Balance",
      text: "Always mix the Ogi into a thick, smooth paste with cold water before adding boiling water to avoid any lumps.",
    },
  },
  "eba-and-okra-soup": {
    time: "45 MINS",
    servings: "2 SERVINGS",
    ingredients: [
      "Garri (White or Yellow)",
      "Fresh Okra (chopped)",
      "Palm Oil",
      "Assorted Meat & Fish",
      "Crayfish",
    ],
    steps: [
      {
        title: "Boil Meat",
        desc: "Cook meat and fish with seasoning until soft.",
      },
      {
        title: "Cook Okra",
        desc: "Add palm oil to meat stock, then add chopped okra. Cook for 5 mins.",
      },
      {
        title: "Make Eba",
        desc: "Add garri to boiling water. Let it sit for 2 mins, then stir until firm.",
      },
    ],
    tips: [
      {
        icon: <UtensilsIcon className="w-6 h-6 text-text-link" />,
        text: "Don't overcook okra; it should still have a bit of a crunch.",
        color: "bg-text-link/10",
      },
    ],
    proTip: {
      title: "The Draw",
      text: "Adding a little bit of ogbono or kaun (potash) can increase the 'draw' of your okra soup.",
    },
  },
  "suya-and-cold-zobo": {
    time: "40 MINS",
    servings: "1 SERVING",
    ingredients: [
      "Suya Beef",
      "Hibiscus Leaves (Zobo)",
      "Ginger & Cloves",
      "Pineapple/Cucumber (for Zobo)",
      "Sugar or Honey",
    ],
    steps: [
      {
        title: "Brew Zobo",
        desc: "Boil hibiscus leaves with ginger and cloves for 20 mins. Strain and let it cool.",
      },
      {
        title: "Flavor",
        desc: "Add pineapple juice and sweetener. Chill in the fridge.",
      },
      {
        title: "Suya",
        desc: "Reheat your suya or grill fresh beef strips with yaji spice.",
      },
      {
        title: "Serve",
        desc: "Enjoy the hot spicy suya with the ice-cold refreshing Zobo.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "Zobo tastes better the next day after the flavors have melded.",
        color: "bg-[#8B4513]/10",
      },
    ],
    proTip: {
      title: "The Zobo Zing",
      text: "Add some fresh mint leaves or lemon slices to the cold Zobo for an extra refreshing kick.",
    },
  },
  "pancakes-and-coffee": {
    time: "20 MINS",
    servings: "1 SERVING",
    ingredients: [
      "1 cup Flour",
      "1 Egg",
      "Half cup Milk",
      "Sugar & Vanilla",
      "Coffee granules",
    ],
    steps: [
      {
        title: "Mix Batter",
        desc: "Whisk egg, milk, sugar, and vanilla. Fold in flour until just combined.",
      },
      {
        title: "Fry",
        desc: "Pour small circles of batter into a buttered pan. Flip when bubbles appear.",
      },
      {
        title: "Brew Coffee",
        desc: "Mix coffee with hot water and milk to taste.",
      },
    ],
    tips: [
      {
        icon: <GrainIcon className="w-6 h-6 text-accent-orange" />,
        text: "Don't overmix the batter if you want fluffy pancakes.",
        color: "bg-accent-orange/10",
      },
    ],
    proTip: {
      title: "Fluffy Secret",
      text: "Use buttermilk or add a teaspoon of vinegar to regular milk for the fluffiest results.",
    },
  },
  "native-rice-and-ponmo": {
    time: "50 MINS",
    servings: "3 SERVINGS",
    ingredients: [
      "3 cups Local/Ofada Rice",
      "Palm Oil",
      "Locust Beans (Iru)",
      "Diced Ponmo (Cow Skin)",
      "Smoked Fish",
    ],
    steps: [
      {
        title: "Wash Rice",
        desc: "Wash local rice thoroughly to remove stones and excess starch.",
      },
      {
        title: "Sauté",
        desc: "Fry onions and iru in palm oil. Add diced ponmo and smoked fish.",
      },
      {
        title: "Cook",
        desc: "Add rice and water/stock. Cook on medium heat until the water is absorbed.",
      },
    ],
    tips: [
      {
        icon: <SpiceIcon className="w-6 h-6 text-[#8B4513]" />,
        text: "Ofada rice has a strong aroma; don't be alarmed, that's the authentic scent!",
        color: "bg-[#8B4513]/10",
      },
    ],
    proTip: {
      title: "The Iru Factor",
      text: "Use fresh, high-quality locust beans for the most authentic village-style flavor.",
    },
  },
  "fish-pepper-soup": {
    time: "30 MINS",
    servings: "2 SERVINGS",
    ingredients: [
      "1 Large Catfish (cut into steaks)",
      "Pepper Soup Spice mix",
      "Scent Leaves or Basil",
      "Fresh Peppers & Onions",
      "Crayfish",
    ],
    steps: [
      {
        title: "Prep Fish",
        desc: "Wash catfish with salt or lemon to remove slime. Rinse in hot water to toughen the skin.",
      },
      {
        title: "Boil",
        desc: "Add fish to a pot with water, spices, onions, and pepper. Boil for 15 mins.",
      },
      {
        title: "Finish",
        desc: "Add scent leaves and simmer for 2 minutes. Serve hot.",
      },
    ],
    tips: [
      {
        icon: <LeafIcon className="w-6 h-6 text-text-primary" />,
        text: "Be careful not to over-stir or the fish will break into pieces.",
        color: "bg-[#2D5A27]/10",
      },
    ],
    proTip: {
      title: "The Hot Kick",
      text: "Nigerian pepper soup is meant to be spicy! Adjust the scotch bonnet levels to your heat tolerance.",
    },
  },
};
