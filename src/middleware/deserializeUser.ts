import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }

  if (expired && refreshToken) {
    // Add the new access token to the response header
    const newAccessToken = (await reIssueAccessToken({
      refreshToken,
    })) as string;

    const { decoded, expired } = decode(newAccessToken);

    // @ts-ignore
    req.user = decoded;
  }

  return next();
};
