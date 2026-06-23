import { describe, it, expect } from "vitest";
import { getIngredientInfo, IngredientLookup } from "../../data/ingredientLookup";

describe("getIngredientInfo", () => {
  it("returns known ingredient info", () => {
    const info = getIngredientInfo("Rice");
    expect(info).toEqual({ quantity: "1 kg", category: "Grains" });
  });

  it("returns category Miscellaneous for unknown ingredient", () => {
    const info = getIngredientInfo("Fake Ingredient");
    expect(info).toEqual({ quantity: null, category: "Miscellaneous" });
  });

  it("returns correct info for all entries in lookup", () => {
    for (const [name, expected] of Object.entries(IngredientLookup)) {
      expect(getIngredientInfo(name)).toEqual(expected);
    }
  });
});
