import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import { validateRequest, requiresUser } from "./middleware";

export default function initializeRoutes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.send(200));

  // --- USER ---
  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // --- USER SESSIONS ---
  // Login
  app.post(
    "/api/sessions",
    validateRequest(createSessionSchema),
    createUserSessionHandler
  );

  // Get user's sessions
  // GET /api/sessions

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // --- EXPERIMENTAL ---
  // Check if number is prime (with parallelism)
  // GET /api/experimental/isPrime
}
