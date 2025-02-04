import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4lG_lQmF_v-s4Asjylk3XGauurP5WSM4",
  authDomain: "pets-d.firebaseapp.com",
  projectId: "pets-d",
  storageBucket: "pets-d.firebasestorage.app",
  messagingSenderId: "182285351042",
  appId: "1:182285351042:web:73d860720f8ae46b2a9c9b",
  measurementId: "G-XVS0BRP9EE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);