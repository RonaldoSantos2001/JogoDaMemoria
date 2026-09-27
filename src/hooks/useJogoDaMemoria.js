import { useCallback, useEffect, useRef, useState } from 'react';

import { listarFiguras } from '../database/figurasRepository';
import { animation } from '../theme';
import { embaralhar, sortear } from '../utils/embaralhar';
import { obterDificuldade } from '../utils/dificuldades';
import { calcularPontuacao } from '../utils/pontuacao';
import { useCronometro } from './useCronometro';

// status: 'carregando' | 'insuficiente' | 'jogando' | 'finalizado'
export function useJogoDaMemoria(db, tema, dificuldadeId) {
  const { pares: quantidadePares, pontuacaoBase } = obterDificuldade(dificuldadeId);
  const [cartas, setCartas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [erros, setErros] = useState(0);
  const [status, setStatus] = useState('carregando');
  const [totalFiguras, setTotalFiguras] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [tempoFinal, setTempoFinal] = useState(0);
  const [partidaId, setPartidaId] = useState(0);

  const cronometro = useCronometro();
  const { zerar: zerarCronometro } = cronometro;
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const iniciarPartida = useCallback(async () => {
    clearTimeout(timeoutRef.current);
    setStatus('carregando');
    zerarCronometro();

    const figuras = await listarFiguras(db, tema);
    setTotalFiguras(figuras.length);

    if (figuras.length < quantidadePares) {
      setCartas([]);
      setStatus('insuficiente');
      return;
    }

    // 1. Sorteia as figuras da dificuldade  2. Duplica formando pares  3. Embaralha as posições
    const sorteadas = sortear(figuras, quantidadePares);
    const pares = sorteadas.flatMap((figura) => [
      { chave: `${figura.id}-a`, figura },
      { chave: `${figura.id}-b`, figura },
    ]);
    const novasCartas = embaralhar(pares).map((carta) => ({
      ...carta,
      aberta: false,
      encontrada: false,
    }));

    setCartas(novasCartas);
    setSelecionadas([]);
    setErros(0);
    setTempoFinal(0);
    setBloqueado(false);
    setPartidaId((id) => id + 1);
    setStatus('jogando');
  }, [db, tema, quantidadePares, zerarCronometro]);

  const virarCarta = useCallback(
    (indice) => {
      const carta = cartas[indice];
      if (status !== 'jogando' || bloqueado || !carta || carta.aberta || carta.encontrada) return;

      // O cronômetro começa na primeira jogada
      if (!cronometro.ativo) cronometro.iniciar();

      const cartasAbertas = cartas.map((c, i) => (i === indice ? { ...c, aberta: true } : c));
      const novaSelecao = [...selecionadas, indice];

      if (novaSelecao.length < 2) {
        setCartas(cartasAbertas);
        setSelecionadas(novaSelecao);
        return;
      }

      const [primeira, segunda] = novaSelecao;
      const acertou = cartasAbertas[primeira].figura.id === cartasAbertas[segunda].figura.id;

      if (acertou) {
        // Par encontrado: as cartas ficam visíveis e não podem mais ser selecionadas
        const atualizadas = cartasAbertas.map((c, i) =>
          i === primeira || i === segunda ? { ...c, encontrada: true } : c
        );
        setCartas(atualizadas);
        setSelecionadas([]);

        if (atualizadas.every((c) => c.encontrada)) {
          setTempoFinal(cronometro.parar());
          setStatus('finalizado');
        }
        return;
      }

      // Erro: conta o erro e fecha as duas cartas depois de um instante
      setCartas(cartasAbertas);
      setSelecionadas([]);
      setErros((e) => e + 1);
      setBloqueado(true);
      timeoutRef.current = setTimeout(() => {
        setCartas((atual) =>
          atual.map((c, i) => (i === primeira || i === segunda ? { ...c, aberta: false } : c))
        );
        setBloqueado(false);
      }, animation.hideDelay);
    },
    [cartas, selecionadas, status, bloqueado, cronometro]
  );

  const paresEncontrados = cartas.filter((c) => c.encontrada).length / 2;
  const pontuacao =
    status === 'finalizado' ? calcularPontuacao(erros, tempoFinal, pontuacaoBase) : 0;

  return {
    cartas,
    quantidadePares,
    erros,
    status,
    totalFiguras,
    partidaId,
    paresEncontrados,
    segundos: status === 'finalizado' ? tempoFinal : cronometro.segundos,
    pontuacao,
    iniciarPartida,
    virarCarta,
  };
}
