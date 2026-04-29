// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// SUA CONFIG (a que você mandou)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFgXof_YQeQ1DTUejWNRpuOqx_Q_tm7BY",
  authDomain: "biblioteca-5ecba.firebaseapp.com",
  projectId: "biblioteca-5ecba",
  storageBucket: "biblioteca-5ecba.firebasestorage.app",
  messagingSenderId: "782971800302",
  appId: "1:782971800302:web:54b0666051d47d11b641ff",
  measurementId: "G-032SPYTXRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

