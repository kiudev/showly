import { auth, db } from "../config/db";
import { UserRequest } from "../types/user";
import { Response, NextFunction } from "express";

export const verifyToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    console.log("Decoded token:", decoded);

    req.user = decoded;

    const docSnap = await db.collection("users").doc(decoded.uid).get();
    req.userData = docSnap.exists
      ? (docSnap.data() as {
          username: string;
          dateOfBirth: string;
          createdAt: Date;
        })
      : undefined;
    console.log(docSnap.data());

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
