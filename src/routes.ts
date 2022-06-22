import { Express, Request, Response } from "express";
import validateRequest from "./middleware/validateRequest";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";

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
  // DELETE /api/sessions

  // --- EXPERIMENTAL ---
  // Check if number is prime (with parallelism)
  // GET /api/experimental/isPrime
}
