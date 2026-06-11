console.log("TESTE LIVROS NOVO");

const form = document.getElementById("formLivro");
const tabela = document.getElementById("tabelaLivros");

// CAMPOS
const nomeLivro = document.getElementById("nomeLivro");
const autor = document.getElementById("autor");
const genero = document.getElementById("genero");
const exemplares = document.getElementById("exemplares");

// CADASTRAR
form.addEventListener("submit", (e) => {
  e.preventDefault();

  try {

    let livros =
      JSON.parse(localStorage.getItem("livros")) || [];

    livros.push({
      id: Date.now(),
      nome: nomeLivro.value,
      autor: autor.value,
      genero: genero.value,
      exemplares: exemplares.value
    });

    localStorage.setItem(
      "livros",
      JSON.stringify(livros)
    );

    document.getElementById("msgLivro").innerHTML = `
      <div class="alert alert-success">
        Livro cadastrado com sucesso!
      </div>
    `;

    form.reset();
    carregar();

  } catch (erro) {

    document.getElementById("msgLivro").innerHTML = `
      <div class="alert alert-danger">
        Erro: ${erro.message}
      </div>
    `;
  }
});

// LISTAR
function carregar() {

  tabela.innerHTML = "";

  let livros =
    JSON.parse(localStorage.getItem("livros")) || [];

  livros.forEach((l) => {

    tabela.innerHTML += `
      <tr>
        <td>${l.id}</td>
        <td>${l.nome}</td>
        <td>${l.autor}</td>
        <td>${l.genero}</td>
        <td>${l.exemplares}</td>
        <td>
          <button
            onclick="remover(${l.id})"
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

  let livros =
    JSON.parse(localStorage.getItem("livros")) || [];

  livros = livros.filter(
    livro => livro.id !== id
  );

  localStorage.setItem(
    "livros",
    JSON.stringify(livros)
  );

  carregar();
};

// CARREGAR AO ABRIR
carregar();