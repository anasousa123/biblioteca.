import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("formLivro");
const lista = document.getElementById("lista");

form.addEventListener("submit", async (e)=>{
e.preventDefault();

await addDoc(collection(db,"livros"),{
nome:nome.value,
autor:autor.value
});

carregar();
});

async function carregar(){
lista.innerHTML="";

const dados = await getDocs(collection(db,"livros"));

dados.forEach((item)=>{
lista.innerHTML += `<li>${item.data().nome}
<button onclick="remover('${item.id}')">X</button></li>`;
});
}

window.remover = async(id)=>{
await deleteDoc(doc(db,"livros",id));
carregar();
}

carregar();