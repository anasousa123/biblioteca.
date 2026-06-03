import { supabase } from "./supabase.js";

const selAluno = document.getElementById("aluno");
const selLivro = document.getElementById("livro");

const dataEmprestimo = document.getElementById("dataEmp");
const dataDevolucao = document.getElementById("dataDev");

async function carregarSelects() {

  // alunos
  const { data: alunos } = await supabase
    .from("alunos")
    .select("*");

  selAluno.innerHTML = "<option>Aluno</option>";

  alunos.forEach(a => {
    selAluno.innerHTML += `
      <option value="${a.id}">
        ${a.nome}
      </option>
    `;
  });

  // livros
  const { data: livros } = await supabase
    .from("livros")
    .select("*");

  selLivro.innerHTML = "<option>Livro</option>";

  livros.forEach(l => {
    selLivro.innerHTML += `
      <option value="${l.id}">
        ${l.nome}
      </option>
    `;
  });
}

document.getElementById("formEmprestimo").addEventListener("submit", async (e) => {
  e.preventDefault();

  const { error } = await supabase
    .from("emprestimos")
    .insert([
      {
        aluno: selAluno.options[selAluno.selectedIndex].text,
        livro: selLivro.options[selLivro.selectedIndex].text,
        data_emprestimo: dataEmprestimo.value,
        data_devolucao: null
      }
    ]);

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById("formEmprestimo").reset();

  carregar();
});

async function carregar() {

  let pend = document.getElementById("pendentes");
  let dev = document.getElementById("devolvidos");

  pend.innerHTML = "";
  dev.innerHTML = "";

  const { data: dados, error } = await supabase
    .from("emprestimos")
    .select("*");

  console.log("DADOS:", dados);

  if (error) {
    console.error(error);
    return;
  }

  dados.forEach(e => {

    if (!e.data_devolucao) {

      pend.innerHTML += `
      <tr>
        <td>${e.aluno}</td>
        <td>${e.livro}</td>
        <td>
          <button onclick="devolver('${e.id}')" class="btn btn-success btn-sm">
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
      </tr>
      `;
    }

  });

}

window.devolver = async (id) => {

  await supabase
    .from("emprestimos")
    .update({
      data_devolucao: new Date().toISOString().split("T")[0]
    })
    .eq("id", id);

  carregar();
};

carregarSelects();
carregar();