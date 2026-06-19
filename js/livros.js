import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("TESTE LIVROS FIREBASE");

const form = document.getElementById("formLivro");
const tabela = document.getElementById("tabelaLivros");

const nomeLivro = document.getElementById("nomeLivro");
const autor = document.getElementById("autor");
const genero = document.getElementById("genero");
const exemplares = document.getElementById("exemplares");

// CADASTRAR
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const docRef = await addDoc(
  collection(db, "livros"),
  {
    codigo: Number(document.getElementById("idLivro").value),
    nome: nomeLivro.value,
    autor: autor.value,
    genero: genero.value,
    exemplares: exemplares.value
  }
);

    console.log("SALVOU NO FIREBASE ID:", docRef.id);

    document.getElementById("msgLivro").innerHTML = `
      <div class="alert alert-success">
        Livro cadastrado com sucesso!
      </div>
    `;

    form.reset();
    carregar();

  } catch (erro) {
    console.error("ERRO FIREBASE:", erro);

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

  const snapshot = await getDocs(collection(db, "livros"));

  snapshot.forEach((registro) => {
    const livro = {
      id: registro.id,
      ...registro.data()
    };

    tabela.innerHTML += `
  <tr>
    <td>${livro.codigo}</td>
    <td>${livro.nome}</td>
    <td>${livro.autor}</td>
    <td>${livro.genero}</td>
    <td>${livro.exemplares}</td>
          <button onclick="remover('${livro.id}')" class="btn btn-danger btn-sm">
            Excluir
          </button>
        </td>
      </tr>
    `;
  });
}

// EXCLUIR
window.remover = async (id) => {
  try {
    await deleteDoc(doc(db, "livros", id));
    carregar();
  } catch (erro) {
    console.error("ERRO AO EXCLUIR:", erro);
  }
};

carregar();