import config from "config";
import { Request, Response } from "express";
import { createAccessToken, createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { sign } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  // saving the user agent helps to identify where the user is coming from
  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = createAccessToken({ user, session });

  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTimeToLive"), // 1 year
  });

  return res.send({ accessToken, refreshToken });
}