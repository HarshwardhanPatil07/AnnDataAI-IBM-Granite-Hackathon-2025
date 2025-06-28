// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtbo70hwWTg3yS1jzmJjgZDeCCTqjzRA8",
  authDomain: "anndataai-de316.firebaseapp.com",
  projectId: "anndataai-de316",
  storageBucket: "anndataai-de316.firebasestorage.app",
  messagingSenderId: "635187879300",
  appId: "1:635187879300:web:ff9c4a90c5d7221392d1d1",
  measurementId: "G-RVZMGB2KGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Export the app as default export
export default app;