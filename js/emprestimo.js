import { supabase } from "./supabase.js";

const selAluno = document.getElementById("aluno");
const selLivro = document.getElementById("livro");

async function carregarSelects(){

// alunos
const { data: alunos } = await supabase
  .from("alunos")
  .select("*");
selAluno.innerHTML = "<option>Aluno</option>";
alunos.forEach(a=>{
selAluno.innerHTML += `<option value="${a.id}">${a.nome}</option>`;
});

// livros
const { data: livros } = await supabase
  .from("livros")
  .select("*");
selLivro.innerHTML = "<option>Livro</option>";
livros.forEach(l=>{
selLivro.innerHTML += `<option value="${l.id}">${l.data().nome}</option>`;
});
}

document.getElementById("formEmprestimo").addEventListener("submit", async(e)=>{
e.preventDefault();

await supabase
.from("emprestimos")
.insert([{
  aluno: selAluno.options[selAluno.selectedIndex].text,
  livro: selLivro.options[selLivro.selectedIndex].text,
  status: "pendente"
}]);

carregar();
});

async function carregar(){

let pend = document.getElementById("pendentes");
let dev = document.getElementById("devolvidos");

pend.innerHTML="";
dev.innerHTML="";

const { data: dados } = await supabase
.from("emprestimos")
.select("*");

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
await supabase
.from("emprestimos")
.update({ status: "devolvido" })
.eq("id", id);
carregar();
};

carregarSelects();
carregar();