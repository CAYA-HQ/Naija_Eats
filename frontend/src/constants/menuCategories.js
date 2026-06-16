// ── Menu category detection data ──────────────────────────────────────────
// DB categories: Main | Swallow | Breakfast | Snack | Side | Dessert
// Display categories: Soups | Rice Dishes | Swallows | Proteins

export const SOUP_NAMES = new Set([
  // Nigerian soups — exact name matches
  "egusi soup",
  "ogbono soup",
  "efo riro",
  "banga soup",
  "okra soup",
  "afang soup",
  "oha soup",
  "nsala soup",
  "edikang ikong",
  "ewedu",
  "bitterleaf soup",
  "white soup",
  "groundnut soup",
  "karkashi soup",
  "editan soup",
  "gbegiri",
  "vegetable soup",
  "fisherman soup",
  "miyan kuka",
  "miyan gyada",
  "miyan taushe",
  "alale soup",
  // pepper soups
  "pepper soup",
  "cowleg pepper soup",
  "goat meat pepper soup",
  "chicken pepper soup",
  "fresh fish pepper soup",
  "dry fish pepper soup",
  "bushmeat pepper soup",
  "turkey pepper soup",
  "snail pepper soup",
  "fish pepper soup",
  "fisherman pepper soup",
]);

export const SOUP_KEYWORDS = [
  "soup",
  "pepper soup",
  "egusi",
  "ogbono",
  "efo riro",
  "banga",
  "afang",
  "oha soup",
  "nsala",
  "edikang",
  "miyan",
  "ewedu",
  "bitterleaf",
  "karkashi",
  "editan",
  "gbegiri",
  "groundnut soup",
  "white soup",
];

// ✅ Nigerian only — international rice/pasta dishes removed
export const RICE_KEYWORDS = [
  "jollof rice",
  "fried rice",
  "coconut rice",
  "ofada rice",
  "native jollof",
  "pepper rice",
  "coconut jollof",
  "rice pudding",
  "spaghetti jollof",
  "indomie",
];
