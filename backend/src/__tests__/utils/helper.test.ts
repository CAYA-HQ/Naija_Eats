import { describe, it, expect } from "vitest";
import { safeParseInstructions } from "../../utils/helper";

describe("safeParseInstructions", () => {
  it("parses a valid JSON array", () => {
    const result = safeParseInstructions('["step 1", "step 2"]');
    expect(result).toEqual(["step 1", "step 2"]);
  });

  it("returns null for null input", () => {
    expect(safeParseInstructions(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(safeParseInstructions(undefined)).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(safeParseInstructions("")).toBeNull();
  });

  it("returns null for non-array JSON (object)", () => {
    expect(safeParseInstructions('{"key": "value"}')).toBeNull();
  });

  it("returns null for malformed JSON", () => {
    expect(safeParseInstructions("not json")).toBeNull();
  });

  it("returns null for JSON primitive", () => {
    expect(safeParseInstructions('"string"')).toBeNull();
  });

  it("returns null for JSON number", () => {
    expect(safeParseInstructions("42")).toBeNull();
  });
});
