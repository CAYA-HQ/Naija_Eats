import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { _res } from "../utils/helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { full_name, email, phone_number, password } = req.body;

    if (!full_name || !email || !phone_number || !password) {
      return _res.error(400, res, "All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone_number,
        profile: {
          create: { full_name }
        }
      },
      include: { profile: true }
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });

    return _res.success(201, res, "User registered successfully", {
      user: { id: user.id, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    _res.error(500, res, "Server error during registration");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return _res.error(401, res, "Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });

    return _res.success(200, res, "User logged in successfully", { token });
  } catch (err) {
    console.error(err);
    return _res.error(500, res, "Server error");
  }
});

export default router;
