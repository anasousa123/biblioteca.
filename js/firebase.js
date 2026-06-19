import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyClUVg-jBh6ufj0j-7nKZscvUiqIVnc0UA",
  authDomain: "biblioteca-60ede.firebaseapp.com",
  projectId: "biblioteca-60ede",
  storageBucket: "biblioteca-60ede.firebasestorage.app",
  messagingSenderId: "769030432325",
  appId: "1:769030432325:web:2643471f8d722fe41d652c",
  measurementId: "G-HQGQQM4GRN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);