import { useCallback, useEffect, useRef, useState } from 'react';

// Cronômetro em segundos, atualizado em tempo real.
// Usa o relógio do sistema como referência para não acumular atraso.
export function useCronometro() {
  const [segundos, setSegundos] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const inicioRef = useRef(0);

  useEffect(() => {
    if (!ativo) return undefined;
    const intervalo = setInterval(() => {
      setSegundos(Math.floor((Date.now() - inicioRef.current) / 1000));
    }, 250);
    return () => clearInterval(intervalo);
  }, [ativo]);

  const iniciar = useCallback(() => {
    inicioRef.current = Date.now();
    setSegundos(0);
    setAtivo(true);
  }, []);

  // Para o cronômetro e devolve o tempo final exato.
  const parar = useCallback(() => {
    const final = Math.floor((Date.now() - inicioRef.current) / 1000);
    setSegundos(final);
    setAtivo(false);
    return final;
  }, []);

  const zerar = useCallback(() => {
    setAtivo(false);
    setSegundos(0);
  }, []);

  return { segundos, ativo, iniciar, parar, zerar };
}
