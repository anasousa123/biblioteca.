console.log("VERSAO NOVA ALUNOS");

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabela");

// CAMPOS
const nome = document.getElementById("nome");
const turma = document.getElementById("turma");
const nivel = document.getElementById("nivel");
const email = document.getElementById("email");

// CADASTRAR
form.addEventListener("submit", (e) => {
  e.preventDefault();

  try {

    let alunos =
      JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.push({
      id: Date.now(),
      nome: nome.value,
      turma: turma.value,
      nivel: nivel.value,
      email: email.value
    });

    localStorage.setItem(
      "alunos",
      JSON.stringify(alunos)
    );

    document.getElementById("msg").innerHTML = `
      <div class="alert alert-success">
        Aluno cadastrado com sucesso!
      </div>
    `;

    form.reset();
    carregar();

  } catch (erro) {

    document.getElementById("msg").innerHTML = `
      <div class="alert alert-danger">
        Erro: ${erro.message}
      </div>
    `;
  }
});

// LISTAR
function carregar() {

  tabela.innerHTML = "";

  let dados =
    JSON.parse(localStorage.getItem("alunos")) || [];

  dados.sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  dados.forEach((item) => {

    tabela.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.turma}</td>
        <td>${item.nivel}</td>
        <td>${item.email}</td>
        <td>
          <button
            onclick="remover(${item.id})"
            class="btn btn-danger btn-sm">
            Excluir
          </button>
        </td>
      </tr>
    `;
  });
}

// EXCLUIR
window.remover = (id) => {

  let alunos =
    JSON.parse(localStorage.getItem("alunos")) || [];

  alunos = alunos.filter(
    aluno => aluno.id !== id
  );

  localStorage.setItem(
    "alunos",
    JSON.stringify(alunos)
  );

  carregar();
};

// CARREGAR AO ABRIR
carregar();