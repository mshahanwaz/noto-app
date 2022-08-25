import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBe0J7GdmfrFaYKhM5wLVPmp0oppM4Q8Vo",
  authDomain: "next-noto-app.firebaseapp.com",
  projectId: "next-noto-app",
  storageBucket: "next-noto-app.appspot.com",
  messagingSenderId: "314665845322",
  appId: "1:314665845322:web:f57b649446a11bb3371cb3",
  measurementId: "G-1SXVQGEWFX",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { app, db };
