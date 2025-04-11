import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../models/user";
// import { verifyToken } from "../middleware/verifyToken";

const userRoutes = Router();

userRoutes.post("/", createUser);

// userRoutes.get("/user/home", verifyToken, getUser);

userRoutes.patch("/", updateUser);

userRoutes.delete("/", deleteUser);

export default userRoutes;
