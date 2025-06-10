import { adminAuth, db } from "../config/db";
import { UserRequest } from "../types/user";
import { Response, NextFunction } from "express";

export const verifyToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn,
    });

    res.setHeader("Set-Cookie", [
      `session=${sessionCookie}; HttpOnly; Max-Age=${
        expiresIn / 1000
      }; Path=/; SameSite=None; Secure`,
    ]);

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
