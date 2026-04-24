let alunos = JSON.parse(localStorage.getItem("alunos")) || ["Ana","João","Maria"];
let livros = JSON.parse(localStorage.getItem("livros")) || [
  {nome:"Dom Casmurro", disponivel:true},
  {nome:"Harry Potter", disponivel:true}
];
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
}

function filtrarAlunos(){
  let busca = document.getElementById("buscaAluno").value.toLowerCase();
  let lista = document.getElementById("listaAlunos");
  lista.innerHTML = "";

  alunos.filter(a=>a.toLowerCase().includes(busca))
  .forEach(a=>{
    let li = document.createElement("li");
    li.textContent = a;
    lista.appendChild(li);
  });
}

// ===== LIVROS =====
function addLivro(){
  let nome = document.getElementById("nomeLivro").value;
  if(!nome) return;

  livros.push({nome, disponivel:true});
  salvar();
  carregarLivros();
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
}

function filtrarLivros(){
  let busca = document.getElementById("buscaLivro").value.toLowerCase();
  let lista = document.getElementById("listaLivros");
  lista.innerHTML = "";

  livros.filter(l=>l.nome.toLowerCase().includes(busca))
  .forEach(l=>{
    let li = document.createElement("li");
    li.textContent = l.nome;
    lista.appendChild(li);
  });
}

// ===== SELECTS =====
function filtrarAlunosSelect(){
  let busca = document.getElementById("buscaAluno").value.toLowerCase();
  let sel = document.getElementById("selAluno");
  if(!sel) return;

  sel.innerHTML = "";
  alunos.filter(a=>a.toLowerCase().includes(busca))
  .forEach(a=>{
    let op=document.createElement("option");
    op.textContent=a;
    sel.appendChild(op);
  });
}

function filtrarLivrosSelect(){
  let busca = document.getElementById("buscaLivro").value.toLowerCase();
  let sel = document.getElementById("selLivro");
  if(!sel) return;

  sel.innerHTML = "";
  livros.filter(l=>l.nome.toLowerCase().includes(busca) && l.disponivel)
  .forEach(l=>{
    let op=document.createElement("option");
    op.textContent=l.nome;
    sel.appendChild(op);
  });
}

// ===== EMPRESTIMO =====
function emprestar(){
  let aluno = document.getElementById("selAluno").value;
  let livroNome = document.getElementById("selLivro").value;

  let livro = livros.find(l=>l.nome===livroNome);
  if(!livro || !livro.disponivel){
    alert("Indisponível");
    return;
  }

  livro.disponivel=false;

  let hoje = new Date();
  emp.push({
    aluno,
    livro:livroNome,
    data:hoje.toLocaleDateString()
  });

  salvar();
  atualizarEmp();
}

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

function devolver(i){
  let livro = livros.find(l=>l.nome===emp[i].livro);
  if(livro) livro.disponivel=true;

  emp.splice(i,1);
  salvar();
  atualizarEmp();
}

// ===== INICIAR =====
carregarAlunos();
carregarLivros();
filtrarAlunosSelect();
filtrarLivrosSelect();
atualizarEmp();