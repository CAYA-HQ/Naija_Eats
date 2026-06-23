import { describe, it, expect, vi, beforeEach } from "vitest";

// Import prisma and patch it before importing anything that uses it
import { prisma } from "../../config/prisma";

// Replace user.findUnique with a mock BEFORE authMiddleware is imported
(prisma.user as any).findUnique = vi.fn();

import type { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../../middleware/auth";
import jwt from "jsonwebtoken";

const JWT_SECRET = "test-secret";

function mockReqRes(headers?: Record<string, string>) {
  const req = { headers: headers || {} } as unknown as Request;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn() as NextFunction;
  return { req, res, next };
}

beforeEach(() => {
  vi.clearAllMocks();
  (prisma.user.findUnique as ReturnType<typeof vi.fn>).mockReset();
});

describe("authMiddleware", () => {
  it("calls next() for valid token", async () => {
    const token = jwt.sign({ userId: "user-1" }, JWT_SECRET);
    const { req, res, next } = mockReqRes({
      authorization: `Bearer ${token}`,
    });

    (prisma.user.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: "user-1",
      email: "test@example.com",
      phone_number: "+2348000000000",
      role: "user",
    });

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect((req as any).user).toBeDefined();
  });

  it("returns 401 when no auth header", async () => {
    const { req, res, next } = mockReqRes({});
    await authMiddleware(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when header is not Bearer", async () => {
    const { req, res, next } = mockReqRes({
      authorization: "Basic token123",
    });
    await authMiddleware(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 for invalid token", async () => {
    const { req, res, next } = mockReqRes({
      authorization: "Bearer invalid-token",
    });
    await authMiddleware(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when user not found in DB", async () => {
    const token = jwt.sign({ userId: "nonexistent" }, JWT_SECRET);
    const { req, res, next } = mockReqRes({
      authorization: `Bearer ${token}`,
    });

    (prisma.user.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    await authMiddleware(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });
});
