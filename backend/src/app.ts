import express, { Application, Request, Response, Router } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mealsRoutes from "./routes/meals";
import authRoutes from "./routes/auth";
import { authMiddleware } from "./middleware/auth";

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use("/auth", authRoutes);
app.use("/", authMiddleware, mealsRoutes);

export default app;
