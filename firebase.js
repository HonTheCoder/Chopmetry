import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAA46TVuz0W0piVjlu9Q-EtZJE6_UbyqYs",
  authDomain: "chopmetryleaderboard.firebaseapp.com",
  projectId: "chopmetryleaderboard",
  storageBucket: "chopmetryleaderboard.appspot.com",
  messagingSenderId: "531390323940",
  appId: "1:531390323940:web:33a34d96d6411e049f60f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Expose db and helpers globally
window.firebaseDB = db;
window.firestore = {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit
};