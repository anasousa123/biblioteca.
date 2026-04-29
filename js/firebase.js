
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOsIklRS-PtT1kxHQ5My-CUgd1n7mzUnI",
  authDomain: "teste-6f017.firebaseapp.com",
  projectId: "teste-6f017",
  storageBucket: "teste-6f017.firebasestorage.app",
  messagingSenderId: "331373288049",
  appId: "1:331373288049:web:0ca4d325d55a8e2df2d9d0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);