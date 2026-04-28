// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// SUA CONFIG (a que você mandou)
const firebaseConfig = {
  apiKey: "AIzaSyCFgXof_YQeQ1DTUejWNRpuOqx_Q_tm7BY",
  authDomain: "biblioteca-5ecba.firebaseapp.com",
  projectId: "biblioteca-5ecba",
  storageBucket: "biblioteca-5ecba.firebasestorage.app",
  messagingSenderId: "782971800302",
  appId: "1:782971800302:web:54b0666051d47d11b641ff",
  measurementId: "G-032SPYTXRE"
};

// Inicializa
const app = initializeApp(firebaseConfig);

// Banco
export const db = getFirestore(app);