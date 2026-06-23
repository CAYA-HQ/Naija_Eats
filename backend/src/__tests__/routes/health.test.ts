import { describe, it, expect, vi } from "vitest";

vi.mock("../../config/prisma", () => ({
  prisma: {},
}));

import request from "supertest";
import app from "../../app";

describe("GET /health", () => {
  it("returns 200 with ok status", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "OK", message: "Server is healthy" });
  });
});
