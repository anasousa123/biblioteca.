form.addEventListener("submit", async (e) => {

console.log("TESTE LIVROS FIREBASE");

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("formLivro");
const tabela = document.getElementById("tabelaLivros");

// CAMPOS
const nomeLivro = document.getElementById("nomeLivro");
const autor = document.getElementById("autor");
const genero = document.getElementById("genero");
const exemplares = document.getElementById("exemplares");

// CADASTRAR
form.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    await addDoc(
      collection(db, "livros"),
      {
        nome: nomeLivro.value,
        autor: autor.value,
        genero: genero.value,
        exemplares: exemplares.value
      }
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
async function carregar() {

  tabela.innerHTML = "";

  const snapshot = await getDocs(
    collection(db, "livros")
  );

  snapshot.forEach((registro) => {

    const livro = {
      id: registro.id,
      ...registro.data()
    };

    tabela.innerHTML += `
      <tr>
        <td>${livro.id}</td>
        <td>${livro.nome}</td>
        <td>${livro.autor}</td>
        <td>${livro.genero}</td>
        <td>${livro.exemplares}</td>
        <td>
          <button
            onclick="remover('${livro.id}')"
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
    doc(db, "livros", id)
  );

  carregar();

};

// CARREGAR AO ABRIR
carregar();