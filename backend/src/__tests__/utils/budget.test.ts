import { describe, it, expect } from "vitest";
import { calculateBudgetTier } from "../../utils/budget";

describe("calculateBudgetTier", () => {
  it("returns Low for weekly amount under 7000", () => {
    expect(calculateBudgetTier(5000, "Weekly")).toBe("Low");
  });

  it("returns Standard for weekly amount between 7000 and 9999", () => {
    expect(calculateBudgetTier(7000, "Weekly")).toBe("Standard");
    expect(calculateBudgetTier(8500, "Weekly")).toBe("Standard");
  });

  it("returns Premium for weekly amount >= 10000", () => {
    expect(calculateBudgetTier(10000, "Weekly")).toBe("Premium");
    expect(calculateBudgetTier(20000, "Weekly")).toBe("Premium");
  });

  it("returns Low for monthly amount under 30000", () => {
    expect(calculateBudgetTier(20000, "Monthly")).toBe("Low");
  });

  it("returns Standard for monthly amount between 30000 and 69999", () => {
    expect(calculateBudgetTier(30000, "Monthly")).toBe("Standard");
    expect(calculateBudgetTier(50000, "Monthly")).toBe("Standard");
  });

  it("returns Premium for monthly amount >= 70000", () => {
    expect(calculateBudgetTier(70000, "Monthly")).toBe("Premium");
    expect(calculateBudgetTier(100000, "Monthly")).toBe("Premium");
  });

  it("handles unknown frequency as monthly (else branch)", () => {
    expect(calculateBudgetTier(20000, "Daily")).toBe("Low");
    expect(calculateBudgetTier(70000, "Daily")).toBe("Premium");
  });

  it("handles boundary values", () => {
    expect(calculateBudgetTier(6999, "Weekly")).toBe("Low");
    expect(calculateBudgetTier(7000, "Weekly")).toBe("Standard");
    expect(calculateBudgetTier(9999, "Weekly")).toBe("Standard");
    expect(calculateBudgetTier(10000, "Weekly")).toBe("Premium");
  });
});
