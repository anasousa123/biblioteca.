let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let livros = JSON.parse(localStorage.getItem("livros")) || [];
let emp = JSON.parse(localStorage.getItem("emp")) || [];

function salvar(){
localStorage.setItem("alunos", JSON.stringify(alunos));
localStorage.setItem("livros", JSON.stringify(livros));
localStorage.setItem("emp", JSON.stringify(emp));
}

// ===== ALUNOS =====
function addAluno(){
let nome = document.getElementById("nomeAluno").value;
if(!nome) return;

alunos.push(nome);
salvar();
carregarAlunos();
carregarSelects();
}

function carregarAlunos(){
let lista = document.getElementById("listaAlunos");
if(!lista) return;

lista.innerHTML = "";
alunos.forEach((a,i)=>{
lista.innerHTML += `<li>${a} <button onclick="delAluno(${i})">X</button></li>`;
});
}

function delAluno(i){
alunos.splice(i,1);
salvar();
carregarAlunos();
carregarSelects();
}

// ===== LIVROS =====
function addLivro(){
let nome = document.getElementById("nomeLivro").value;
if(!nome) return;

livros.push({nome, disponivel:true});
salvar();
carregarLivros();
carregarSelects();
}

function carregarLivros(){
let lista = document.getElementById("listaLivros");
if(!lista) return;

lista.innerHTML = "";
livros.forEach((l,i)=>{
lista.innerHTML += `<li>${l.nome} ${l.disponivel ? "" : "(emprestado)"} 
<button onclick="delLivro(${i})">X</button></li>`;
});
}

function delLivro(i){
livros.splice(i,1);
salvar();
carregarLivros();
carregarSelects();
}

// ===== SELECTS =====
function carregarSelects(){
let sa = document.getElementById("selAluno");
let sl = document.getElementById("selLivro");

if(sa){
sa.innerHTML = "<option>Aluno</option>";
alunos.forEach(a=>{
sa.innerHTML += `<option>${a}</option>`;
});
}

if(sl){
sl.innerHTML = "<option>Livro</option>";
livros.filter(l=>l.disponivel).forEach(l=>{
sl.innerHTML += `<option>${l.nome}</option>`;
});
}
}

// ===== EMPRESTIMO =====
function emprestar(){
let aluno = document.getElementById("selAluno").value;
let livroNome = document.getElementById("selLivro").value;

let livro = livros.find(l=>l.nome === livroNome);

if(!livro || !livro.disponivel){
alert("Livro indisponível");
return;
}

livro.disponivel = false;

emp.push({
aluno,
livro: livroNome,
data: new Date().toLocaleDateString()
});

salvar();
atualizarEmp();
carregarSelects();
}

// ===== LISTAR =====
function atualizarEmp(){
let lista = document.getElementById("listaEmprestimos");
if(!lista) return;

lista.innerHTML = "";

emp.forEach((e,i)=>{
lista.innerHTML += `<li>${e.aluno} → ${e.livro} 
<button onclick="devolver(${i})">Devolver</button></li>`;
});
}

// ===== DEVOLVER =====
function devolver(i){
let livro = livros.find(l=>l.nome === emp[i].livro);
if(livro) livro.disponivel = true;

emp.splice(i,1);

salvar();
atualizarEmp();
carregarSelects();
}

// ===== INIT =====
window.onload = function(){
carregarAlunos();
carregarLivros();
carregarSelects();
atualizarEmp();
};