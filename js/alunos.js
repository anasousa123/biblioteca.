
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

console.log("JS FUNCIONANDO");

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabela");

// PEGAR CAMPOS
const nome = document.getElementById("nome");
const turma = document.getElementById("turma");
const nivel = document.getElementById("nivel");
const email = document.getElementById("email");

// CADASTRAR
form.addEventListener("submit", async (e)=>{
e.preventDefault();

console.log("CLIQUE DETECTADO");

try {
await addDoc(collection(db,"alunos"),{
nome: nome.value,
turma: turma.value,
nivel: nivel.value,
email: email.value
});

form.reset();
carregar();

} catch (erro) {
  console.error("Erro ao cadastrar:", erro);
  alert("ERRO: " + erro.message);
}
});

// LISTAR
async function carregar(){
tabela.innerHTML = "";

const dados = await getDocs(collection(db,"alunos"));

dados.forEach((item)=>{
tabela.innerHTML += `
<tr>
<td>${item.data().nome}</td>
<td>${item.data().turma}</td>
<td>${item.data().nivel}</td>
<td>${item.data().email}</td>
<td>
<button onclick="remover('${item.id}')" class="btn btn-danger btn-sm">Excluir</button>
</td>
</tr>
`;
});
}

// EXCLUIR
window.remover = async(id)=>{
await deleteDoc(doc(db,"alunos",id));
carregar();
};

carregar();