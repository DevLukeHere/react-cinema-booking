// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAXLozyFXZ4S0U5RpyM_PDtEJlCiHfCnk",
  authDomain: "react-movie-app-ffcf0.firebaseapp.com",
  projectId: "react-movie-app-ffcf0",
  storageBucket: "react-movie-app-ffcf0.appspot.com",
  messagingSenderId: "534856998141",
  appId: "1:534856998141:web:9a3fa80d16ef82f4ed7294",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export default app;
