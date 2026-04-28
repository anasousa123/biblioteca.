import { db } from "java.script";
import {
collection, addDoc, getDocs, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const selAluno = document.getElementById("aluno");
const selLivro = document.getElementById("livro");

async function carregarSelects(){

// alunos
let alunos = await getDocs(collection(db,"alunos"));
selAluno.innerHTML = "<option>Aluno</option>";
alunos.forEach(a=>{
selAluno.innerHTML += `<option value="${a.id}">${a.data().nome}</option>`;
});

// livros
let livros = await getDocs(collection(db,"livros"));
selLivro.innerHTML = "<option>Livro</option>";
livros.forEach(l=>{
selLivro.innerHTML += `<option value="${l.id}">${l.data().nome}</option>`;
});
}

document.getElementById("formEmprestimo").addEventListener("submit", async(e)=>{
e.preventDefault();

await addDoc(collection(db,"emprestimos"),{
aluno: selAluno.options[selAluno.selectedIndex].text,
livro: selLivro.options[selLivro.selectedIndex].text,
status:"pendente"
});

carregar();
});

async function carregar(){

let pend = document.getElementById("pendentes");
let dev = document.getElementById("devolvidos");

pend.innerHTML="";
dev.innerHTML="";

let dados = await getDocs(collection(db,"emprestimos"));

dados.forEach(e=>{

if(e.data().status === "pendente"){
pend.innerHTML += `
<tr>
<td>${e.data().aluno}</td>
<td>${e.data().livro}</td>
<td>
<button onclick="devolver('${e.id}')" class="btn btn-success btn-sm">
Devolver
</button>
</td>
</tr>
`;
}else{
dev.innerHTML += `
<tr>
<td>${e.data().aluno}</td>
<td>${e.data().livro}</td>
</tr>
`;
}

});

}

window.devolver = async(id)=>{
await updateDoc(doc(db,"emprestimos",id),{
status:"devolvido"
});
carregar();
};

carregarSelects();
carregar();