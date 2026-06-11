export function salvar(chave, dados) {
  localStorage.setItem(
    chave,
    JSON.stringify(dados)
  );
}

export function ler(chave) {
  return JSON.parse(
    localStorage.getItem(chave)
  ) || [];
}