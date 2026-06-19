import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("EMPRESTIMOS CARREGOU");

const selAluno = document.getElementById("aluno");
const selLivro = document.getElementById("livro");

const dataEmprestimo = document.getElementById("dataEmp");
const dataDevolucao = document.getElementById("dataDev");

// CARREGAR ALUNOS E LIVROS
async function carregarSelects() {

  try {

    selAluno.innerHTML =
      '<option value="">Selecione um aluno</option>';

    selLivro.innerHTML =
      '<option value="">Selecione um livro</option>';

    const alunosSnap = await getDocs(
      collection(db, "alunos")
    );

    alunosSnap.forEach((docItem) => {

      const aluno = docItem.data();

      selAluno.innerHTML += `
        <option value="${docItem.id}">
          ${aluno.nome}
        </option>
      `;
    });

    const livrosSnap = await getDocs(
      collection(db, "livros")
    );

    livrosSnap.forEach((docItem) => {

      const livro = docItem.data();

      selLivro.innerHTML += `
        <option value="${docItem.id}">
          ${livro.nome}
        </option>
      `;
    });

  } catch (erro) {

    console.error("ERRO AO CARREGAR SELECTS:", erro);

  }
}

// CADASTRAR EMPRÉSTIMO
document
  .getElementById("formEmprestimo")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

      console.log("CADASTRANDO EMPRÉSTIMO");

      await addDoc(
        collection(db, "emprestimos"),
        {
          aluno:
            selAluno.options[
              selAluno.selectedIndex
            ].text,

          livro:
            selLivro.options[
              selLivro.selectedIndex
            ].text,

          data_emprestimo:
            dataEmprestimo.value,

          data_prevista:
            dataDevolucao.value,

          data_devolucao:
            null
        }
      );

      alert("Empréstimo cadastrado com sucesso!");

      document
        .getElementById("formEmprestimo")
        .reset();

      carregar();

    } catch (erro) {

      console.error("ERRO FIREBASE:", erro);

      alert(
        "Erro ao cadastrar: " +
        erro.message
      );
    }
  });

// LISTAR
async function carregar() {

  const pend =
    document.getElementById("pendentes");

  const dev =
    document.getElementById("devolvidos");

  pend.innerHTML = "";
  dev.innerHTML = "";

  try {

    const snapshot = await getDocs(
      collection(db, "emprestimos")
    );

    snapshot.forEach((registro) => {

      const e = {
        id: registro.id,
        ...registro.data()
      };

      if (!e.data_devolucao) {

        pend.innerHTML += `
          <tr>
            <td>${e.aluno}</td>
            <td>${e.livro}</td>
            <td>${e.data_emprestimo}</td>
            <td>
              <button
                onclick="devolver('${e.id}')"
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

  } catch (erro) {

    console.error(
      "ERRO AO LISTAR:",
      erro
    );

  }
}

// DEVOLVER
window.devolver = async (id) => {

  try {

    await updateDoc(
      doc(db, "emprestimos", id),
      {
        data_devolucao:
          new Date()
            .toISOString()
            .split("T")[0]
      }
    );

    carregar();

  } catch (erro) {

    console.error(
      "ERRO AO DEVOLVER:",
      erro
    );

  }
};

carregarSelects();
carregar();