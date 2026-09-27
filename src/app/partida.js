import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { usePreventRemove } from 'expo-router/react-navigation';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, Pressable, useWindowDimensions, View } from 'react-native';

import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import MemoryCard from '../components/MemoryCard';
import ResultadoPartida from '../components/ResultadoPartida';
import Screen from '../components/Screen';
import StatBadge from '../components/StatBadge';
import { nomeTema, TEMA_INICIAL } from '../database/figurasPadrao';
import { inserirRecorde } from '../database/recordesRepository';
import { useJogoDaMemoria } from '../hooks/useJogoDaMemoria';
import { GRID_ESPACO, jogoStyles as styles } from '../styles/jogo.styles';
import { colors, spacing } from '../theme';
import { DIFICULDADE_INICIAL, obterDificuldade } from '../utils/dificuldades';
import { formatarTempo } from '../utils/formatar';

// Altura aproximada ocupada por cabeçalho, contadores, barra de progresso e botão
const ALTURA_RESERVADA = 380;
// Abaixo disso a carta fica pequena demais; a tela passa a rolar
const TAMANHO_MINIMO_CARTA = 70;

// Tela da partida. Tema e dificuldade vêm da aba Jogar e não mudam durante o jogo.
export default function Partida() {
  const db = useSQLiteContext();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const params = useLocalSearchParams();
  const tema = params.tema ?? TEMA_INICIAL;
  const dificuldade = obterDificuldade(params.dificuldade ?? DIFICULDADE_INICIAL);
  const jogo = useJogoDaMemoria(db, tema, dificuldade.id);
  const { iniciarPartida } = jogo;

  useEffect(() => {
    iniciarPartida();
  }, [iniciarPartida]);

  // Sair no meio da partida (botão fechar, voltar do Android ou gesto) pede confirmação
  usePreventRemove(jogo.status === 'jogando', ({ data }) => {
    Alert.alert('Sair da partida?', 'Seu progresso nesta partida será perdido.', [
      { text: 'Continuar jogando', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => navigation.dispatch(data.action) },
    ]);
  });

  // Reiniciar no meio da partida também pede confirmação (se já virou alguma carta)
  function reiniciar() {
    const comecou = jogo.erros > 0 || jogo.cartas.some((c) => c.aberta || c.encontrada);
    if (jogo.status !== 'jogando' || !comecou) {
      iniciarPartida();
      return;
    }
    Alert.alert('Reiniciar partida?', 'Seu progresso nesta partida será perdido.', [
      { text: 'Continuar jogando', style: 'cancel' },
      { text: 'Reiniciar', style: 'destructive', onPress: iniciarPartida },
    ]);
  }

  function sair() {
    if (router.canGoBack()) router.back();
    else router.replace('/jogo');
  }

  async function salvarRecorde(jogador) {
    await inserirRecorde(db, {
      jogador,
      pontuacao: jogo.pontuacao,
      erros: jogo.erros,
      tempo: jogo.segundos,
      tema,
      dificuldade: dificuldade.id,
    });
  }

  const { colunas } = dificuldade;
  const linhas = Math.ceil((jogo.quantidadePares * 2) / colunas);

  // Tamanho das cartas: sempre cabe na largura (senão a grade quebra em menos colunas)
  // e tenta caber na altura da tela; se ficar pequena demais, a tela rola.
  const porLargura = (width - spacing.lg * 2 - GRID_ESPACO * (colunas - 1)) / colunas;
  const porAltura = (height - ALTURA_RESERVADA) / linhas - GRID_ESPACO;
  const tamanhoCarta = Math.floor(
    Math.min(porLargura, 140, Math.max(porAltura, TAMANHO_MINIMO_CARTA))
  );

  const cabecalho = (
    <Header
      titulo={nomeTema(tema)}
      subtitulo={`Nível ${dificuldade.nome} · encontre todos os pares`}
      direita={
        <Pressable
          onPress={sair}
          style={({ pressed }) => [styles.sair, pressed && { opacity: 0.6 }]}
          accessibilityRole="button"
          accessibilityLabel="Sair da partida"
          hitSlop={8}
        >
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
      }
    />
  );

  if (jogo.status === 'carregando') {
    return (
      <Screen rolavel={false}>
        <View style={styles.carregando}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (jogo.status === 'insuficiente') {
    return (
      <Screen>
        {cabecalho}
        <EmptyState
          icone="albums-outline"
          titulo="Figuras insuficientes"
          texto={`O nível ${dificuldade.nome} usa ${jogo.quantidadePares} figuras e o tema tem ${jogo.totalFiguras}.`}
        >
          <Button titulo="Voltar" icone="arrow-back" onPress={sair} />
        </EmptyState>
      </Screen>
    );
  }

  return (
    <Screen>
      {cabecalho}

      <View style={styles.stats}>
        <StatBadge
          icone="close-circle"
          rotulo="Erros"
          valor={jogo.erros}
          cor={colors.danger}
          corFundo={colors.dangerSoft}
        />
        <StatBadge
          icone="time"
          rotulo="Tempo"
          valor={formatarTempo(jogo.segundos)}
          cor={colors.primary}
          corFundo={colors.primarySoft}
        />
        <StatBadge
          icone="checkmark-done"
          rotulo="Pares"
          valor={`${jogo.paresEncontrados}/${jogo.quantidadePares}`}
          cor={colors.accent}
          corFundo={colors.accentSoft}
        />
      </View>

      <View style={styles.progresso}>
        <View
          style={[
            styles.progressoBarra,
            { width: `${(jogo.paresEncontrados / jogo.quantidadePares) * 100}%` },
          ]}
        />
      </View>

      <View
        style={[
          styles.grid,
          { width: tamanhoCarta * colunas + GRID_ESPACO * (colunas - 1), alignSelf: 'center' },
        ]}
      >
        {jogo.cartas.map((carta, indice) => (
          <MemoryCard
            key={`${jogo.partidaId}-${carta.chave}`}
            carta={carta}
            indice={indice}
            tamanho={tamanhoCarta}
            onPress={jogo.virarCarta}
          />
        ))}
      </View>

      <View style={styles.acoes}>
        <Button titulo="Reiniciar partida" icone="refresh" variante="secondary" onPress={reiniciar} />
      </View>

      {jogo.status === 'finalizado' && (
        <ResultadoPartida
          erros={jogo.erros}
          segundos={jogo.segundos}
          pontuacao={jogo.pontuacao}
          onSalvarRecorde={salvarRecorde}
          onJogarNovamente={iniciarPartida}
          onVerRanking={() => router.dismissTo('/ranking')}
        />
      )}
    </Screen>
  );
}
