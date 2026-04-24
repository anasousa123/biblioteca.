let livros = JSON.parse(localStorage.getItem("livros")) || [];
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];

function salvar() {
  localStorage.setItem("livros", JSON.stringify(livros));
  localStorage.setItem("alunos", JSON.stringify(alunos));
  localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
}

// LIVROS
function addLivro() {
  let nome = document.getElementById("nomeLivro").value;
  if (!nome) return alert("Digite o livro");

  livros.push(nome);
  salvar();
  carregarLivros();
}

function carregarLivros() {
  let lista = document.getElementById("listaLivros");
  if (!lista) return;

  lista.innerHTML = "";
  livros.forEach(l => {
    let li = document.createElement("li");
    li.textContent = l;
    lista.appendChild(li);
  });
}

// ALUNOS
function addAluno() {
  let nome = document.getElementById("nomeAluno").value;
  if (!nome) return alert("Digite o aluno");

  alunos.push(nome);
  salvar();
  carregarAlunos();
}

function carregarAlunos() {
  let lista = document.getElementById("listaAlunos");
  if (!lista) return;

  lista.innerHTML = "";
  alunos.forEach(a => {
    let li = document.createElement("li");
    li.textContent = a;
    lista.appendChild(li);
  });
}

// SELECTS
function carregarSelects() {
  let selAluno = document.getElementById("selectAluno");
  let selLivro = document.getElementById("selectLivro");

  if (!selAluno || !selLivro) return;

  selAluno.innerHTML = "";
  selLivro.innerHTML = "";

  alunos.forEach(a => {
    let opt = document.createElement("option");
    opt.textContent = a;
    selAluno.appendChild(opt);
  });

  livros.forEach(l => {
    let opt = document.createElement("option");
    opt.textContent = l;
    selLivro.appendChild(opt);
  });
}

// EMPRESTIMO
function registrarEmprestimo() {
  let aluno = document.getElementById("selectAluno").value;
  let livro = document.getElementById("selectLivro").value;

  if (!aluno || !livro) return alert("Selecione tudo");

  let data = new Date().toLocaleDateString();

  emprestimos.push({ aluno, livro, data });
  salvar();
  carregarEmprestimos();
}

function carregarEmprestimos() {
  let lista = document.getElementById("listaEmprestimos");
  if (!lista) return;

  lista.innerHTML = "";
  emprestimos.forEach(e => {
    let li = document.createElement("li");
    li.textContent = `${e.aluno} pegou "${e.livro}" em ${e.data}`;
    lista.appendChild(li);
  });
}

// INICIAR
carregarLivros();
carregarAlunos();
carregarSelects();
carregarEmprestimos();