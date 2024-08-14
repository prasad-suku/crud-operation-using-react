// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdzXIm29N9pc-sbiaJhYHPh0_cu5ntfNM",
  authDomain: "login-page-60901.firebaseapp.com",
  projectId: "login-page-60901",
  storageBucket: "login-page-60901.appspot.com",
  messagingSenderId: "498565161980",
  appId: "1:498565161980:web:150cbb9c8e8d8b83420879",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// creating varirable to store firestore funtion
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
