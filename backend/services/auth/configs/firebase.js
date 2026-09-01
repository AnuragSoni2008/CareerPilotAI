import { initializeApp, cert, getApps } from "firebase-admin/app";
import dotenv from "dotenv";

dotenv.config();

const required = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`${key} is required for Firebase Admin initialization.`);
  }
}

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

export const app =
  getApps()[0] ||
  initializeApp({
    credential: cert(serviceAccount),
  });
