// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoHkGDYam56m5AogIxbmzpHCtNr57TzaI",
  authDomain: "website-3feaf.firebaseapp.com",
  projectId: "website-3feaf",
  storageBucket: "website-3feaf.appspot.com",
  messagingSenderId: "761731705723",
  appId: "1:761731705723:web:d2694f14a69af018a4ebde",
  measurementId: "G-HDRL0HLG6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);