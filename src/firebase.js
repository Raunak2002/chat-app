// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWa6qST_zlnCKUStZ5GEMqqdaupY_tW3I",
  authDomain: "chat-app-1d375.firebaseapp.com",
  projectId: "chat-app-1d375",
  storageBucket: "chat-app-1d375.appspot.com",
  messagingSenderId: "17031719520",
  appId: "1:17031719520:web:0317ce81f54d891d1c3105",
  measurementId: "G-WZRJ39MCHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
export const auth = getAuth();
export const db = getFirestore();
export default app;