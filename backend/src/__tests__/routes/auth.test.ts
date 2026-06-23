import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  profile: {
    update: vi.fn(),
  },
}));

vi.mock("../../config/prisma", () => ({
  prisma: mockPrisma,
}));

vi.mock("@prisma/client", () => {
  class PrismaClientKnownRequestError extends Error {
    code: string;
    constructor(message: string, { code }: { code: string }) {
      super(message);
      this.code = code;
      this.name = "PrismaClientKnownRequestError";
    }
  }
  return {
    PrismaClientKnownRequestError,
    Prisma: { PrismaClientKnownRequestError },
  };
});

import { Prisma } from "@prisma/client";
import request from "supertest";
import app from "../../app";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "test-secret";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("POST /auth/register", () => {
  const validBody = {
    full_name: "Test User",
    email: "test@example.com",
    phone_number: "+2348000000000",
    password: "Password123!",
  };

  it("registers a new user and returns 201", async () => {
    const hashedPassword = await bcrypt.hash(validBody.password, 10);
    mockPrisma.user.create.mockResolvedValue({
      id: "user-1",
      email: validBody.email,
      profile: { full_name: validBody.full_name },
    });

    const res = await request(app).post("/auth/register").send(validBody);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(mockPrisma.user.create).toHaveBeenCalledOnce();
    const createCall = mockPrisma.user.create.mock.calls[0][0];
    expect(createCall.data.email).toBe(validBody.email);
    expect(createCall.data.profile.create.full_name).toBe(validBody.full_name);
  });

  it("returns 400 when fields are missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "only-email@test.com" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("returns 400 on duplicate email (Prisma P2002)", async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed",
      { code: "P2002" },
    );

    mockPrisma.user.create.mockRejectedValue(prismaError);

    const res = await request(app).post("/auth/register").send(validBody);

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });
});

describe("POST /auth/login", () => {
  const credentials = { email: "test@example.com", password: "Password123!" };

  it("logs in with valid credentials and returns token", async () => {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      email: credentials.email,
      password: hashedPassword,
      phone_number: "+2348000000000",
      isVerified: true,
      onboarded: false,
      role: "user",
      created_at: new Date(),
      profile: { full_name: "Test User" },
    });

    const res = await request(app).post("/auth/login").send(credentials);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });

  it("returns 401 for wrong password", async () => {
    const hashedPassword = await bcrypt.hash("different", 10);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      email: credentials.email,
      password: hashedPassword,
      isVerified: true,
    });

    const res = await request(app).post("/auth/login").send(credentials);

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("returns 403 when email is not verified", async () => {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      email: credentials.email,
      password: hashedPassword,
      isVerified: false,
    });

    const res = await request(app).post("/auth/login").send(credentials);

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/verify/i);
  });
});

describe("GET /auth/me", () => {
  it("returns user profile with valid token", async () => {
    const token = jwt.sign({ userId: "user-1" }, JWT_SECRET);

    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      email: "test@example.com",
      phone_number: "+2348000000000",
      role: "user",
      password: "hashed",
      verifyToken: null,
      verifyTokenExp: null,
      resetToken: null,
      resetTokenExp: null,
      isVerified: true,
      onboarded: false,
      created_at: new Date(),
      profile: { full_name: "Test User" },
    });

    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe("test@example.com");
  });

  it("returns 401 without token", async () => {
    const res = await request(app).get("/auth/me");
    expect(res.status).toBe(401);
  });

  it("returns 401 with invalid token", async () => {
    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", "Bearer invalid-token");

    expect(res.status).toBe(401);
  });
});

describe("PUT /auth/profile", () => {
  it("updates user profile", async () => {
    const token = jwt.sign({ userId: "user-1" }, JWT_SECRET);

    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      email: "test@example.com",
      phone_number: "+2348000000000",
      role: "user",
    });

    mockPrisma.profile.update.mockResolvedValue({
      id: "profile-1",
      user_id: "user-1",
      full_name: "Updated Name",
    });

    const res = await request(app)
      .put("/auth/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({ full_name: "Updated Name" });

    expect(res.status).toBe(200);
    expect(res.body.data.full_name).toBe("Updated Name");
  });

  it("returns 401 without token", async () => {
    const res = await request(app)
      .put("/auth/profile")
      .send({ full_name: "Updated" });
    expect(res.status).toBe(401);
  });
});

describe("POST /auth/change-password", () => {
  it("changes password successfully", async () => {
    const token = jwt.sign({ userId: "user-1" }, JWT_SECRET);
    const hashedPassword = await bcrypt.hash("oldPass123!", 10);

    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      password: hashedPassword,
    });
    mockPrisma.user.update.mockResolvedValue({ id: "user-1" });

    const res = await request(app)
      .post("/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({ oldPassword: "oldPass123!", newPassword: "newPass456!" });

    expect(res.status).toBe(200);
  });

  it("returns 400 if old/new password missing", async () => {
    const token = jwt.sign({ userId: "user-1" }, JWT_SECRET);

    const res = await request(app)
      .post("/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({ oldPassword: "oldPass123!" });

    expect(res.status).toBe(400);
  });

  it("returns 401 for wrong old password", async () => {
    const token = jwt.sign({ userId: "user-1" }, JWT_SECRET);
    const hashedPassword = await bcrypt.hash("realOldPass", 10);

    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      password: hashedPassword,
    });

    const res = await request(app)
      .post("/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({ oldPassword: "wrongOldPass", newPassword: "newPass456!" });

    expect(res.status).toBe(401);
  });
});

describe("POST /auth/forgot-password", () => {
  it("returns 200 even if user not found (no enumeration)", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .post("/auth/forgot-password")
      .send({ email: "nonexistent@test.com" });

    expect(res.status).toBe(200);
  });

  it("returns 400 when email is missing", async () => {
    const res = await request(app)
      .post("/auth/forgot-password")
      .send({});
    expect(res.status).toBe(400);
  });

  it("updates reset token for existing user", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      email: "test@example.com",
    });
    mockPrisma.user.update.mockResolvedValue({ id: "user-1" });

    const res = await request(app)
      .post("/auth/forgot-password")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(200);
    expect(mockPrisma.user.update).toHaveBeenCalledOnce();
  });
});

describe("POST /auth/reset-password", () => {
  it("resets password with valid token", async () => {
    const future = new Date(Date.now() + 3600000);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      resetToken: "valid-token",
      resetTokenExp: future,
    });
    mockPrisma.user.update.mockResolvedValue({ id: "user-1" });

    const res = await request(app)
      .post("/auth/reset-password")
      .send({ token: "valid-token", newPassword: "newPass123!" });

    expect(res.status).toBe(200);
  });

  it("returns 400 with expired token", async () => {
    const past = new Date(Date.now() - 3600000);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      resetToken: "expired-token",
      resetTokenExp: past,
    });

    const res = await request(app)
      .post("/auth/reset-password")
      .send({ token: "expired-token", newPassword: "newPass123!" });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/invalid|expired/i);
  });
});
