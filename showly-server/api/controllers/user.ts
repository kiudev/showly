import { Router } from "express";
import {
  updateUser,
  deleteUser,
  addShowsToUser,
  addWatchedEpisodesToUser,
  createComments,
  createUserWithEmailAndPassword,
  signInWithGoogleAccount,
  getUserData,
} from "../models/user";
import { verifyToken } from "../middleware/verifyToken";
import { Request, Response } from "express";

const userRouter = Router();

userRouter.post("/users/sign-up/email-password", createUserWithEmailAndPassword);

userRouter.post("/users/sign-in/google", signInWithGoogleAccount);

userRouter.post("/users/auth/user-cookie", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "User authenticated successfully" });
});

userRouter.get('/users/auth/user', getUserData)

userRouter.post("/users/auth/sign-out", (req: Request, res: Response) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  res.status(200).json({ message: "User signed out successfully!" })
})

userRouter.patch("/users/:uid", updateUser);

userRouter.delete("/users/:uid", deleteUser);

userRouter.post("/users/shows/:uid", addShowsToUser);

userRouter.post("/users/shows/episodes/:uid", addWatchedEpisodesToUser);

userRouter.post("/users/shows/comments/:uid", createComments);

export default userRouter;
