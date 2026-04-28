// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// SUA CONFIG (a que você mandou)
const firebaseConfig = {
  apiKey: "AIzaSyClUVg-jBh6ufj0j-7nKZscvUiqIVnc0UA",
  authDomain: "biblioteca-60ede.firebaseapp.com",
  projectId: "biblioteca-60ede",
};

// Inicializa
const app = initializeApp(firebaseConfig);

// Banco
export const db = getFirestore(app);