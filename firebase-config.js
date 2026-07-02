// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase, ref, set, get, onValue, push, update } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-WiwJPRWT1YTYEa6KhQBxlcEip0Z_qgc",
  authDomain: "bee-group-dashboard.firebaseapp.com",
  projectId: "bee-group-dashboard",
  storageBucket: "bee-group-dashboard.firebasestorage.app",
  messagingSenderId: "382131124575",
  appId: "1:382131124575:web:bde87081439d5d83085eea",
  measurementId: "G-YPPV90Y6LR",
  databaseURL: "https://bee-group-dashboard-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Export functions
export {
  auth,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  ref,
  set,
  get,
  onValue,
  push,
  update
};