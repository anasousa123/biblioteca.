import { db } from "./firebase.js";
import {
  collection, addDoc, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

console.log("VERSAO NOVA LIVROS");

const form = document.getElementById("formLivro");
const tabela = document.getElementById("tabelaLivros");

// PEGAR CAMPOS
const idLivro = document.getElementById("idLivro");
const nomeLivro = document.getElementById("nomeLivro");
const autor = document.getElementById("autor");
const genero = document.getElementById("genero");
const exemplares = document.getElementById("exemplares");

console.log("FORM LIVROS:", form);

// CADASTRAR
form.addEventListener("submit", async (e)=>{
  e.preventDefault();

  console.log("CLIQUE LIVRO DETECTADO");

  try {
    const docRef = await addDoc(collection(db,"livros"),{
      id: idLivro.value,
      nome: nomeLivro.value,
      autor: autor.value,
      genero: genero.value,
      exemplares: exemplares.value
    });

    console.log("LIVRO SALVO:", docRef.id);
    
    document.getElementById("msgLivro").innerHTML = `
  <div class="alert alert-success">
    Livro cadastrado com sucesso!
  </div>
`;

    form.reset();
    carregar();

  } catch (erro) {
    console.error("ERRO AO SALVAR LIVRO:", erro);
    alert("Erro: " + erro.message);
  }
});

// LISTAR
async function carregar(){
  tabela.innerHTML = "";

  const dados = await getDocs(collection(db,"livros"));

  dados.forEach((l)=>{
    tabela.innerHTML += `
    <tr>
      <td>${l.data().id}</td>
      <td>${l.data().nome}</td>
      <td>${l.data().autor}</td>
      <td>${l.data().genero}</td>
      <td>${l.data().exemplares}</td>
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
window.remover = async(id)=>{
  await deleteDoc(doc(db,"livros",id));
  carregar();
};

// CARREGAR AO ABRIR
carregar();