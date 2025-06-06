// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjah1OOSMSM8Cd45Z3j6gnjmeKVuJCacI",
  authDomain: "react-ai-travel-planner.firebaseapp.com",
  projectId: "react-ai-travel-planner",
  storageBucket: "react-ai-travel-planner.firebasestorage.app",
  messagingSenderId: "791244260973",
  appId: "1:791244260973:web:9a40bc077f2b1ac0bee164",
  measurementId: "G-5TN2L4EZ4W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);