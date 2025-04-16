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

const userRoutes = Router();

userRoutes.post("/users", createUser);

userRoutes.get("/users/login", verifyToken, authUser);

userRoutes.patch("/users/:uid", updateUser);

userRoutes.delete("/users/:uid", deleteUser);

userRoutes.post("/users/shows/:uid", addShowsToUser);

userRoutes.post("/users/shows/episodes/:uid", addWatchedEpisodesToUser);

userRoutes.post("/users/shows/comments/:uid", createComments);

export default userRoutes;
