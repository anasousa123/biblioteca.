import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("formAluno");
const lista = document.getElementById("lista");

form.addEventListener("submit", async (e)=>{
e.preventDefault();

await addDoc(collection(db,"alunos"),{
nome:nome.value,
turma:turma.value,
nivel:nivel.value,
email:email.value
});

carregar();
});

async function carregar(){
lista.innerHTML="";

const dados = await getDocs(collection(db,"alunos"));

dados.forEach((item)=>{
lista.innerHTML += `<li>${item.data().nome}
<button onclick="remover('${item.id}')">X</button></li>`;
});
}

window.remover = async(id)=>{
await deleteDoc(doc(db,"alunos",id));
carregar();
}

carregar();