import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  addShowsToUser,
  addWatchedEpisodesToUser,
  createComments,
  authUser,
} from "../models/user";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router();

userRouter.post("/users", createUser);

userRouter.get("/users/login", verifyToken, authUser);

userRouter.patch("/users/:uid", updateUser);

userRouter.delete("/users/:uid", deleteUser);

userRouter.post("/users/shows/:uid", addShowsToUser);

userRouter.post("/users/shows/episodes/:uid", addWatchedEpisodesToUser);

userRouter.post("/users/shows/comments/:uid", createComments);

export default userRouter;
