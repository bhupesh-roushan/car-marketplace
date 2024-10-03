// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-c1abe.firebaseapp.com",
  projectId: "car-marketplace-c1abe",
  storageBucket: "car-marketplace-c1abe.appspot.com",
  messagingSenderId: "498629370402",
  appId: "1:498629370402:web:a72825a8e2eb314049e07b",
  measurementId: "G-C3FVC93BQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)