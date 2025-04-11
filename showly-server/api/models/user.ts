import { auth, db } from "../config/db";
import { Request, Response } from "express";
import { UserRequest } from "../types/user";

const usersCollection = db.collection("users");

export const createUser = async (req: Request, res: Response) => {
  const { email, username, password, dateOfBirth } = req.body;

  try {
    const newUser = await auth.createUser({
      email,
      password,
    });

    await usersCollection.doc(newUser.uid).set({
      email,
      username,
      dateOfBirth,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "User has been created", ok: true, uid: newUser.uid });
  } catch (error) {
    console.error("Error creating a new user", error);

    res.status(400).json({ ok: false, error })
  }
};

export const getUser = async (req: UserRequest, res: Response) => {
  res.json({
    uid: req.user?.uid,
    email: req.user?.email,
    username: req.userData?.username,
    dateOfBirth: req.userData?.dateOfBirth,
    createdAt: req.userData?.createdAt,
  })
};

export const updateUser = async () => {};

export const deleteUser = async () => {};
