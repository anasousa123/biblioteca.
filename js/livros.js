import { supabase } from "./supabase.js";

console.log("TESTE LIVROS NOVO");

const form = document.getElementById("formLivro");
const tabela = document.getElementById("tabelaLivros");

// CAMPOS
const idLivro = document.getElementById("idLivro");
const nomeLivro = document.getElementById("nomeLivro");
const autor = document.getElementById("autor");
const genero = document.getElementById("genero");
const exemplares = document.getElementById("exemplares");

// CADASTRAR
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const { error } = await supabase
      .from("livros")
      .insert([
        {
          codigo: idLivro.value,
          nome: nomeLivro.value,
          autor: autor.value,
          genero: genero.value,
          exemplares: exemplares.value
        }
      ]);

    if (error) throw error;

    document.getElementById("msgLivro").innerHTML = `
      <div class="alert alert-success">
        Livro cadastrado com sucesso!
      </div>
    `;

    form.reset();
    carregar();

  } catch (erro) {
    console.error("ERRO AO SALVAR LIVRO:", erro);

    document.getElementById("msgLivro").innerHTML = `
      <div class="alert alert-danger">
        Erro: ${erro.message}
      </div>
    `;
  }
});

// LISTAR
async function carregar() {
  tabela.innerHTML = "";

  const { data: dados, error } = await supabase
    .from("livros")
    .select("*")
    .order("nome");

  if (error) {
    console.error(error);
    return;
  }

  dados.forEach((l) => {
    tabela.innerHTML += `
    <tr>
      <td>${l.codigo}</td>
      <td>${l.nome}</td>
      <td>${l.autor}</td>
      <td>${l.genero}</td>
      <td>${l.exemplares}</td>
      <td>
        <button onclick="remover('${l.id}')" class="btn btn-danger btn-sm">
          Excluir
        </button>
      </td>
    </tr>
    `;
  });
}

// EXCLUIR
window.remover = async (id) => {
  await supabase
    .from("livros")
    .delete()
    .eq("id", id);

  carregar();
};

// CARREGAR AO ABRIR
carregar();