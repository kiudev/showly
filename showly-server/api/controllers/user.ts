import { Router } from "express";
import {
  updateUser,
  deleteUser,
  addShowsToUser,
  addWatchedEpisodesToUser,
  createComments,
  authUser,
  createUserWithEmailAndPassword,
  signInWithGoogleAccount,
} from "../models/user";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router();

userRouter.post("/users/sign-up/email-password", createUserWithEmailAndPassword);

userRouter.post("/users/sign-in/google", signInWithGoogleAccount);

userRouter.post("/users/sign-in/email-password", verifyToken, authUser);

userRouter.patch("/users/:uid", updateUser);

userRouter.delete("/users/:uid", deleteUser);

userRouter.post("/users/shows/:uid", addShowsToUser);

userRouter.post("/users/shows/episodes/:uid", addWatchedEpisodesToUser);

userRouter.post("/users/shows/comments/:uid", createComments);

export default userRouter;
