// ===== BANCO LOCAL =====
let alunos = JSON.parse(localStorage.getItem("alunos")) || ["Ana","João","Maria"];

let livros = JSON.parse(localStorage.getItem("livros")) || [
  {nome:"Dom Casmurro", disponivel:true},
  {nome:"Harry Potter", disponivel:true}
];

let emp = JSON.parse(localStorage.getItem("emp")) || [];

// ===== SALVAR =====
function salvar(){
  localStorage.setItem("alunos", JSON.stringify(alunos));
  localStorage.setItem("livros", JSON.stringify(livros));
  localStorage.setItem("emp", JSON.stringify(emp));
}

// =========================
// ===== ALUNOS ============
function addAluno(){
  let nome = document.getElementById("nomeAluno").value.trim();
  if(!nome) return alert("Digite um nome");

  alunos.push(nome);
  salvar();
  carregarAlunos();
  filtrarAlunosSelect();
}

function carregarAlunos(){
  let lista = document.getElementById("listaAlunos");
  if(!lista) return;

  lista.innerHTML = "";

  alunos.forEach((a,i)=>{
    let li = document.createElement("li");
    li.innerHTML = `${a} <button onclick="delAluno(${i})">X</button>`;
    lista.appendChild(li);
  });
}

function delAluno(i){
  alunos.splice(i,1);
  salvar();
  carregarAlunos();
  filtrarAlunosSelect();
}

// =========================
// ===== LIVROS ============
function addLivro(){
  let nome = document.getElementById("nomeLivro").value.trim();
  if(!nome) return alert("Digite o nome do livro");

  livros.push({nome, disponivel:true});
  salvar();
  carregarLivros();
  filtrarLivrosSelect();
}

function carregarLivros(){
  let lista = document.getElementById("listaLivros");
  if(!lista) return;

  lista.innerHTML = "";

  livros.forEach((l,i)=>{
    let li = document.createElement("li");
    li.innerHTML = `${l.nome} ${l.disponivel ? "" : "(emprestado)"} 
    <button onclick="delLivro(${i})">X</button>`;
    lista.appendChild(li);
  });
}

function delLivro(i){
  livros.splice(i,1);
  salvar();
  carregarLivros();
  filtrarLivrosSelect();
}

// =========================
// ===== SELECT ALUNOS =====
function filtrarAlunosSelect(){
  let sel = document.getElementById("selAluno");
  if(!sel) return;

  sel.innerHTML = "<option value=''>Selecione um aluno</option>";

  alunos.forEach(a=>{
    let op = document.createElement("option");
    op.value = a;
    op.textContent = a;
    sel.appendChild(op);
  });
}

// =========================
// ===== SELECT LIVROS =====
function filtrarLivrosSelect(){
  let sel = document.getElementById("selLivro");
  if(!sel) return;

  sel.innerHTML = "<option value=''>Selecione um livro</option>";

  livros
    .filter(l => l.disponivel)
    .forEach(l=>{
      let op = document.createElement("option");
      op.value = l.nome;
      op.textContent = l.nome;
      sel.appendChild(op);
    });
}

// =========================
// ===== EMPRESTAR =========
function emprestar(){
  let aluno = document.getElementById("selAluno").value;
  let livroNome = document.getElementById("selLivro").value;

  if(!aluno || !livroNome){
    alert("Selecione aluno e livro");
    return;
  }

  let livro = livros.find(l => l.nome === livroNome);

  if(!livro || !livro.disponivel){
    alert("Livro indisponível");
    return;
  }

  livro.disponivel = false;

  let hoje = new Date();

  emp.push({
    aluno: aluno,
    livro: livroNome,
    data: hoje.toLocaleDateString()
  });

  salvar();
  atualizarEmp();
  carregarLivros();
  filtrarLivrosSelect();
}

// =========================
// ===== LISTAR EMP ========
function atualizarEmp(){
  let lista = document.getElementById("listaEmprestimos");
  if(!lista) return;

  lista.innerHTML = "";

  emp.forEach((e,i)=>{
    let li = document.createElement("li");
    li.innerHTML = `${e.aluno} → ${e.livro} (${e.data})
    <button onclick="devolver(${i})">Devolver</button>`;
    lista.appendChild(li);
  });
}

// =========================
// ===== DEVOLVER ==========
function devolver(i){
  let livro = livros.find(l => l.nome === emp[i].livro);

  if(livro){
    livro.disponivel = true;
  }

  emp.splice(i,1);

  salvar();
  atualizarEmp();
  carregarLivros();
  filtrarLivrosSelect();
}

// =========================
// ===== INICIAR ===========
window.onload = function(){
  carregarAlunos();
  carregarLivros();
  filtrarAlunosSelect();
  filtrarLivrosSelect();
  atualizarEmp();
};