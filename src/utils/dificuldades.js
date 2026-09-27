// Níveis de dificuldade: quantos pares a partida sorteia, em quantas colunas
// as cartas são exibidas e com quantos pontos o jogador começa.
export const DIFICULDADES = [
  { id: 'facil', nome: 'Fácil', icone: 'leaf', pares: 4, colunas: 2, pontuacaoBase: 600 }, // 2 x 4
  { id: 'medio', nome: 'Médio', icone: 'flame', pares: 6, colunas: 3, pontuacaoBase: 1000 }, // 3 x 4
  { id: 'dificil', nome: 'Difícil', icone: 'skull', pares: 10, colunas: 4, pontuacaoBase: 1800 }, // 4 x 5
];

export const DIFICULDADE_INICIAL = 'medio';

// Menor quantidade de figuras que permite jogar em algum nível
export const MINIMO_FIGURAS = Math.min(...DIFICULDADES.map((d) => d.pares));

export function obterDificuldade(id) {
  return DIFICULDADES.find((d) => d.id === id) ?? DIFICULDADES.find((d) => d.id === DIFICULDADE_INICIAL);
}

export function nomeDificuldade(id) {
  return DIFICULDADES.find((d) => d.id === id)?.nome ?? id;
}
