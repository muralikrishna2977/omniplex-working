// src/firebase.config.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDQg0I8j2Fi9eMalmKO-FqoDkfPG5LrklA",
  authDomain: "omniplex-46917.firebaseapp.com",
  projectId: "omniplex-46917",
  storageBucket: "omniplex-46917.appspot.com",
  messagingSenderId: "1013283861724",
  appId: "1:1013283861724:web:f88c83837d8fb4d025f019",
  measurementId: "G-H0XWD6K6DP"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
