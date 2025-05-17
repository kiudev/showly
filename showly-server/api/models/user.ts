import { adminAuth, db } from "../config/db";
import { Request, Response } from "express";
import { UserRequest } from "../types/user";

db.settings({ ignoreUndefinedProperties: true });

const usersCollection = db.collection("users");

export const createUserWithEmailAndPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, username, password, passwordConfirmation } = req.body;

  try {
    if (password !== passwordConfirmation) {
      return res.status(400).json({ message: "Passwords are not equal!", ok: false })
    } else if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long!", ok: false })
    }

    const newUser = await adminAuth.createUser({
      email,
      password,
    });

    await usersCollection.doc(newUser.uid).set({
      email,
      username,
      createdAt: new Date(),
    });

    res
      .status(201)
      .json({ message: "User has been created", ok: true, uid: newUser.uid });
  } catch (error) {
    console.error("Error creating a new user", error);

    res.status(400).json({ ok: false, error });
  }
};

export const signInWithGoogleAccount = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const { uid, name, email, picture } = decodedToken;

    await usersCollection.doc(uid).set({
      username: name,
      email,
      createdAt: new Date(),
      picture
    });

    res.status(200).json({ token, ok: true })
  } catch (error) {
    console.error("Error signing in with Google", error);

    res.status(400).json({ ok: false, error });
  }
};

export const authUser = async (req: UserRequest, res: Response) => {
  res.json({
    uid: req.user?.uid,
    email: req.user?.email,
    username: req.userData?.username,
    createdAt: req.userData?.createdAt,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const { username, dateOfBirth } = req.body;

    await usersCollection.doc(uid).update({
      username,
    });

    res.status(200).json({
      message: "User has been updated successfully!",
      ok: true,
      uid: uid,
    });
  } catch (error) {
    console.error("Error updating user", error);

    res.status(400).json({ ok: false, error, uid: uid });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    await adminAuth.deleteUser(uid);

    await usersCollection.doc(uid).delete();

    res.status(200).json({
      message: "User has been deleted successfully!",
      ok: true,
      uid: uid,
    });
  } catch (error) {
    console.error("Error deleting user", error);

    res.status(400).json({ ok: false, error, uid: uid });
  }
};

export const addShowsToUser = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const { series } = req.body;

    await usersCollection.doc(uid).update({
      series,
    });

    res.status(200).json({
      message: "Shows have been added successfully!",
      ok: true,
      uid: uid,
    });
  } catch (error) {
    console.error("Error adding shows to user", error);

    res.status(400).json({ ok: false, error, uid: uid });
  }
};

export const addWatchedEpisodesToUser = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const { watchedEpisodes } = req.body;

    await usersCollection.doc(uid).update({
      watchedEpisodes,
    });

    res.status(200).json({
      message: "Episodes have been added successfully!",
      ok: true,
      uid: uid,
    });
  } catch (error) {
    console.error("Error adding episodes to user", error);

    res.status(400).json({ ok: false, error, uid: uid });
  }
};

export const createComments = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const { comments } = req.body;

    await usersCollection.doc(uid).update({
      comments,
    });

    res.status(200).json({
      message: "Comments have been added successfully!",
      ok: true,
      uid: uid,
    });
  } catch (error) {
    console.error("Error adding comments to user", error);

    res.status(400).json({ ok: false, error, uid: uid });
  }
};
