import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
  },
  meals: {
    findMany: vi.fn(),
    count: vi.fn(),
    findUnique: vi.fn(),
  },
}));

vi.mock("../../config/prisma", () => ({
  prisma: mockPrisma,
}));

import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";

const JWT_SECRET = "test-secret";
const token = jwt.sign({ userId: "user-1" }, JWT_SECRET);
const authHeader = { Authorization: `Bearer ${token}` };

beforeEach(() => {
  vi.clearAllMocks();

  mockPrisma.user.findUnique.mockResolvedValue({
    id: "user-1",
    email: "test@example.com",
    phone_number: "+2348000000000",
    role: "user",
  });
});

describe("GET /meals", () => {
  const sampleMeals = [
    { id: "1", name: "Jollof Rice", category: "Main", price_min: 1500, price_max: 2500, prep_time_mins: 45, dietary_tags: null, cuisine: "Nigerian", instructions: null, ingredients: null, image_url: null },
    { id: "2", name: "Akara", category: "Breakfast", price_min: 500, price_max: 1000, prep_time_mins: 20, dietary_tags: null, cuisine: "Nigerian", instructions: '["step 1", "step 2"]', ingredients: null, image_url: null },
  ];

  it("returns paginated meals", async () => {
    mockPrisma.meals.findMany.mockResolvedValue(sampleMeals);
    mockPrisma.meals.count.mockResolvedValue(2);

    const res = await request(app).get("/meals").set(authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data.meals).toHaveLength(2);
    expect(res.body.data.pagination.total).toBe(2);
  });

  it("filters by category", async () => {
    mockPrisma.meals.findMany.mockResolvedValue([sampleMeals[0]]);
    mockPrisma.meals.count.mockResolvedValue(1);

    const res = await request(app).get("/meals?category=Main").set(authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data.meals).toHaveLength(1);
    expect(mockPrisma.meals.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { category: "Main" } }),
    );
  });

  it("parses instructions JSON", async () => {
    mockPrisma.meals.findMany.mockResolvedValue([sampleMeals[1]]);
    mockPrisma.meals.count.mockResolvedValue(1);

    const res = await request(app).get("/meals").set(authHeader);

    expect(res.body.data.meals[0].instructions).toEqual(["step 1", "step 2"]);
  });

  it("respects pagination params", async () => {
    mockPrisma.meals.findMany.mockResolvedValue([sampleMeals[0]]);
    mockPrisma.meals.count.mockResolvedValue(10);

    const res = await request(app).get("/meals?page=2&limit=1").set(authHeader);

    expect(res.status).toBe(200);
    expect(mockPrisma.meals.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 1, take: 1 }),
    );
  });

  it("returns 401 without auth", async () => {
    const res = await request(app).get("/meals");
    expect(res.status).toBe(401);
  });
});

describe("GET /meals/:id", () => {
  it("returns a single meal by id", async () => {
    const meal = { id: "1", name: "Jollof Rice", category: "Main", instructions: null, price_min: 1500, price_max: 2500, prep_time_mins: 45, dietary_tags: null, cuisine: "Nigerian", ingredients: null, image_url: null };
    mockPrisma.meals.findUnique.mockResolvedValue(meal);

    const res = await request(app).get("/meals/1").set(authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Jollof Rice");
  });

  it("returns 404 for unknown meal", async () => {
    mockPrisma.meals.findUnique.mockResolvedValue(null);

    const res = await request(app).get("/meals/nonexistent").set(authHeader);

    expect(res.status).toBe(404);
  });
});
