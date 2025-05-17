import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import dotenv from "dotenv"
dotenv.config();

const CREDENTIALS = process.env.FIREBASE_CREDENTIALS ?? null;

const serviceAccount = JSON.parse(CREDENTIALS);

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

export const adminAuth = admin.auth();
export const db = admin.firestore();
