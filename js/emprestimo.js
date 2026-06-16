import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const selAluno = document.getElementById("aluno");
const selLivro = document.getElementById("livro");

const dataEmprestimo = document.getElementById("dataEmp");
const dataDevolucao = document.getElementById("dataDev");

// CARREGAR ALUNOS E LIVROS
async function carregarSelects() {

  selAluno.innerHTML = "<option>Aluno</option>";
  selLivro.innerHTML = "<option>Livro</option>";

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
}

// CADASTRAR EMPRÉSTIMO
document
  .getElementById("formEmprestimo")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

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

        data_devolucao: null
      }
    );

    document
      .getElementById("formEmprestimo")
      .reset();

    carregar();
  });

// LISTAR
async function carregar() {

  let pend =
    document.getElementById("pendentes");

  let dev =
    document.getElementById("devolvidos");

  pend.innerHTML = "";
  dev.innerHTML = "";

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
}

// DEVOLVER
window.devolver = async (id) => {

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
};

carregarSelects();
carregar();