import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("VERSAO FIREBASE ALUNOS");

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabela");

// CAMPOS
const nome = document.getElementById("nome");
const turma = document.getElementById("turma");
const nivel = document.getElementById("nivel");
const email = document.getElementById("email");

// CADASTRAR
form.addEventListener("submit", async (e) => {

  console.log("ENTREI NO SUBMIT");

  e.preventDefault();

  try {

    await addDoc(collection(db, "alunos"), {
      nome: nome.value,
      turma: turma.value,
      nivel: nivel.value,
      email: email.value
    });

    document.getElementById("msg").innerHTML = `
      <div class="alert alert-success">
        Aluno cadastrado com sucesso!
      </div>
    `;

    form.reset();

    carregar();

  } catch (erro) {

    console.error("ERRO FIREBASE:", erro);

    document.getElementById("msg").innerHTML = `
      <div class="alert alert-danger">
        Erro: ${erro.message}
      </div>
    `;
  }
});

// LISTAR
async function carregar() {

  tabela.innerHTML = "";

  const snapshot = await getDocs(
    collection(db, "alunos")
  );

  let dados = [];

  snapshot.forEach((registro) => {

    dados.push({
      id: registro.id,
      ...registro.data()
    });

  });

  dados.sort((a, b) => {

    const comparaTurma =
      Number(a.turma) - Number(b.turma);

    if (comparaTurma !== 0) {
      return comparaTurma;
    }

    return a.nome.localeCompare(
      b.nome,
      "pt-BR"
    );
  });

  dados.forEach((item) => {

    tabela.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.turma}</td>
        <td>${item.nivel}</td>
        <td>${item.email}</td>
        <td>
          <button
            onclick="remover('${item.id}')"
            class="btn btn-danger btn-sm">
            Excluir
          </button>
        </td>
      </tr>
    `;
  });
}

// EXCLUIR
window.remover = async (id) => {

  await deleteDoc(
    doc(db, "alunos", id)
  );

  carregar();
};

// CARREGAR AO ABRIR
carregar();