// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// CONFIG DO SEU FIREBASE (A SUA MESMA)
const firebaseConfig = {
  apiKey: "AIzaSyClUVg-jBh6ufj0j-7nKZscvUiqIVnc0UA",
  authDomain: "biblioteca-60ede.firebaseapp.com",
  projectId: "biblioteca-60ede",
  storageBucket: "biblioteca-60ede.firebasestorage.app",
  messagingSenderId: "769030432325",
  appId: "1:769030432325:web:2643471f8d722fe41d652c"
};

// INICIAR
const app = initializeApp(firebaseConfig);

// BANCO DE DADOS (ESSENCIAL)
const db = getFirestore(app);

// EXPORTAR
export { db };