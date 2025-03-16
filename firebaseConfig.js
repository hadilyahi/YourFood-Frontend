import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// إعداد Firebase باستخدام التكوين الخاص بك
const firebaseConfig = {
  apiKey: "AIzaSyBtrJRBa7_H1LUEgEBnG3zYgtqpWObYwPs",
  authDomain: "your-food-4c8cd.firebaseapp.com",
  projectId: "your-food-4c8cd",
  storageBucket: "your-food-4c8cd.appspot.com",
  messagingSenderId: "615548049626",
  appId: "1:615548049626:web:fd7638f9b76f060b0f6de3",
  measurementId: "G-367HHT58DX"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
