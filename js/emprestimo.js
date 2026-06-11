const selAluno = document.getElementById("aluno");
const selLivro = document.getElementById("livro");

const dataEmprestimo = document.getElementById("dataEmp");
const dataDevolucao = document.getElementById("dataDev");

// CARREGAR ALUNOS E LIVROS
function carregarSelects() {

  let alunos =
    JSON.parse(localStorage.getItem("alunos")) || [];

  let livros =
    JSON.parse(localStorage.getItem("livros")) || [];

  selAluno.innerHTML = "<option>Aluno</option>";
  selLivro.innerHTML = "<option>Livro</option>";

  alunos.forEach(a => {
    selAluno.innerHTML += `
      <option value="${a.id}">
        ${a.nome}
      </option>
    `;
  });

  livros.forEach(l => {
    selLivro.innerHTML += `
      <option value="${l.id}">
        ${l.nome}
      </option>
    `;
  });
}

// CADASTRAR EMPRÉSTIMO
document.getElementById("formEmprestimo").addEventListener("submit", (e) => {

  e.preventDefault();

  let emprestimos =
    JSON.parse(localStorage.getItem("emprestimos")) || [];

  emprestimos.push({
    id: Date.now(),
    aluno: selAluno.options[selAluno.selectedIndex].text,
    livro: selLivro.options[selLivro.selectedIndex].text,
    data_emprestimo: dataEmprestimo.value,
    data_devolucao: null
  });

  localStorage.setItem(
    "emprestimos",
    JSON.stringify(emprestimos)
  );

  document.getElementById("formEmprestimo").reset();

  carregar();
});

// LISTAR
function carregar() {

  let pend = document.getElementById("pendentes");
  let dev = document.getElementById("devolvidos");

  pend.innerHTML = "";
  dev.innerHTML = "";

  let dados =
    JSON.parse(localStorage.getItem("emprestimos")) || [];

  dados.forEach(e => {

    if (!e.data_devolucao) {

      pend.innerHTML += `
      <tr>
        <td>${e.aluno}</td>
        <td>${e.livro}</td>
        <td>${e.data_emprestimo}</td>
        <td>
          <button onclick="devolver(${e.id})"
            class="btn btn-success btn-sm">
            Devolver
          </button>
        </td>
      </tr>
      `;

    } else {

      dev.innerHTML += `
      <tr>
        <td>${e.aluno}</td>
        <td>${e.livro}</td>
        <td>${e.data_emprestimo}</td>
        <td>${e.data_devolucao}</td>
      </tr>
      `;
    }

  });

}

// DEVOLVER
window.devolver = (id) => {

  let emprestimos =
    JSON.parse(localStorage.getItem("emprestimos")) || [];

  emprestimos = emprestimos.map(e => {

    if (e.id === id) {
      e.data_devolucao =
        new Date().toISOString().split("T")[0];
    }

    return e;
  });

  localStorage.setItem(
    "emprestimos",
    JSON.stringify(emprestimos)
  );

  carregar();
};

carregarSelects();
carregar();