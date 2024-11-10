// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9BMI3w0Cd8BvDg0k5kN7mGLsXAbzv4kw",
  authDomain: "axelle-dealership.firebaseapp.com",
  projectId: "axelle-dealership",
  storageBucket: "axelle-dealership.appspot.com",
  messagingSenderId: "301472780567",
  appId: "1:301472780567:web:fdabfa11dd02115c5ba752",
  measurementId: "G-6PNLE1J8M6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)