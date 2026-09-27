// Regras de pontuação do ranking:
// começa com a pontuação base da dificuldade (1000 no médio), perde 25 por erro
// e 2 por segundo de partida. A pontuação mínima é 10.
export const PENALIDADE_ERRO = 25;
export const PENALIDADE_SEGUNDO = 2;
export const PONTUACAO_MINIMA = 10;

export function calcularPontuacao(erros, segundos, pontuacaoBase) {
  const pontos = pontuacaoBase - erros * PENALIDADE_ERRO - segundos * PENALIDADE_SEGUNDO;
  return Math.max(PONTUACAO_MINIMA, pontos);
}
