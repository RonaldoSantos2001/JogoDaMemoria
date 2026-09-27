// Algoritmo de Fisher-Yates: embaralha uma cópia do array de forma uniforme.
export function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Sorteia `quantidade` itens distintos da lista.
export function sortear(lista, quantidade) {
  return embaralhar(lista).slice(0, quantidade);
}
