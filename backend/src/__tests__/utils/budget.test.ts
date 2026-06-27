import { describe, it, expect } from "vitest";
import { calculateBudgetTier } from "../../utils/budget";

describe("calculateBudgetTier", () => {
  it("returns Low for weekly amount under 25000", () => {
    expect(calculateBudgetTier(20000, "Weekly")).toBe("Low");
  });

  it("returns Standard for weekly amount between 25000 and 44999", () => {
    expect(calculateBudgetTier(25000, "Weekly")).toBe("Standard");
    expect(calculateBudgetTier(35000, "Weekly")).toBe("Standard");
  });

  it("returns Premium for weekly amount >= 45000", () => {
    expect(calculateBudgetTier(45000, "Weekly")).toBe("Premium");
    expect(calculateBudgetTier(80000, "Weekly")).toBe("Premium");
  });

  it("returns Low for monthly amount under 100000", () => {
    expect(calculateBudgetTier(60000, "Monthly")).toBe("Low");
  });

  it("returns Standard for monthly amount between 100000 and 179999", () => {
    expect(calculateBudgetTier(100000, "Monthly")).toBe("Standard");
    expect(calculateBudgetTier(140000, "Monthly")).toBe("Standard");
  });

  it("returns Premium for monthly amount >= 180000", () => {
    expect(calculateBudgetTier(180000, "Monthly")).toBe("Premium");
    expect(calculateBudgetTier(250000, "Monthly")).toBe("Premium");
  });

  it("handles unknown frequency as monthly (else branch)", () => {
    expect(calculateBudgetTier(60000, "Daily")).toBe("Low");
    expect(calculateBudgetTier(180000, "Daily")).toBe("Premium");
  });

  it("handles boundary values", () => {
    expect(calculateBudgetTier(24999, "Weekly")).toBe("Low");
    expect(calculateBudgetTier(25000, "Weekly")).toBe("Standard");
    expect(calculateBudgetTier(44999, "Weekly")).toBe("Standard");
    expect(calculateBudgetTier(45000, "Weekly")).toBe("Premium");
  });
});
