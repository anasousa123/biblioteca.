import { db } from "./firebase.js";
import { collection, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const lista = document.getElementById("lista");

async function carregar(){
lista.innerHTML="";

const dados = await getDocs(collection(db,"emprestimos"));

dados.forEach((item)=>{
lista.innerHTML += `<li>${item.data().aluno} → ${item.data().livro}</li>`;
});
}

carregar();