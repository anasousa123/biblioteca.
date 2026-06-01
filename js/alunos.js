import { supabase } from "./supabase.js";

console.log("VERSAO NOVA ALUNOS");

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabela");

// CAMPOS
const nome = document.getElementById("nome");
const turma = document.getElementById("turma");
const nivel = document.getElementById("nivel");
const email = document.getElementById("email");

// CADASTRAR
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const { error } = await supabase
      .from("alunos")
      .insert([
        {
          nome: nome.value,
          turma: turma.value,
          nivel: nivel.value,
          email: email.value
        }
      ]);

    if (error) throw error;

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
async function carregar(){
  tabela.innerHTML = "";

 const { data: dados } = await supabase
  .from("alunos")
  .select("*")
  .order("nome");

  dados.forEach((item)=>{
    tabela.innerHTML += `
    <tr>
      <td>${item.nome}</td>
      <td>${item.turma}</td>
      <td>${item.nivel}</td>
      <td>${item.email}</td>
      <td>
        <button onclick="remover('${item.id}')" class="btn btn-danger btn-sm">
          Excluir
        </button>
      </td>
    </tr>
    `;
  });
}

// EXCLUIR
window.remover = async(id)=>{
 await supabase
  .from("alunos")
  .delete()
  .eq("id", id);
  carregar();
};
carregar();