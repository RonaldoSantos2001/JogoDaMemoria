import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import Button from '../../components/Button';
import Creditos from '../../components/Creditos';
import EmptyState from '../../components/EmptyState';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import { nomeTema } from '../../database/figurasPadrao';
import {
  LIMITE_RANKING,
  limparRecordes,
  listarMelhoresRecordes,
} from '../../database/recordesRepository';
import { coresMedalha, rankingStyles as styles } from '../../styles/ranking.styles';
import { colors } from '../../theme';
import { DIFICULDADES, nomeDificuldade } from '../../utils/dificuldades';
import { formatarData, formatarTempo } from '../../utils/formatar';
import { PENALIDADE_ERRO, PENALIDADE_SEGUNDO } from '../../utils/pontuacao';

const BASES_POR_NIVEL = DIFICULDADES.map((d) => `${d.pontuacaoBase} no ${d.nome}`).join(', ');

export default function Ranking() {
  const db = useSQLiteContext();
  const [recordes, setRecordes] = useState([]);

  const carregar = useCallback(async () => {
    setRecordes(await listarMelhoresRecordes(db));
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  function confirmarLimpeza() {
    Alert.alert('Limpar ranking', 'Todos os recordes serão apagados. Continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar',
        style: 'destructive',
        onPress: async () => {
          await limparRecordes(db);
          await carregar();
        },
      },
    ]);
  }

  return (
    <Screen>
      <Header titulo="Ranking" subtitulo={`Os ${LIMITE_RANKING} melhores resultados`} />

      {recordes.length === 0 ? (
        <EmptyState
          icone="trophy-outline"
          titulo="Nenhum recorde ainda"
          texto="Termine uma partida e salve seu nome para aparecer aqui."
        >
          <Button titulo="Jogar agora" icone="play" onPress={() => router.navigate('/jogo')} />
        </EmptyState>
      ) : (
        <View style={styles.lista}>
          {recordes.map((recorde, i) => {
            const medalha = coresMedalha[i];
            return (
              <View key={recorde.id} style={[styles.item, i === 0 && styles.itemPrimeiro]}>
                <View style={[styles.posicao, medalha && { backgroundColor: medalha }]}>
                  {i === 0 ? (
                    <Ionicons name="trophy" size={18} color={colors.onMedal} />
                  ) : (
                    <Text style={[styles.posicaoTexto, medalha && { color: colors.onMedal }]}>
                      {i + 1}
                    </Text>
                  )}
                </View>

                <View style={styles.info}>
                  <Text style={styles.jogador} numberOfLines={1}>
                    {recorde.jogador}
                  </Text>
                  <Text style={styles.detalhes}>
                    {recorde.tema ? `${nomeTema(recorde.tema)} · ` : ''}
                    {nomeDificuldade(recorde.dificuldade)} ·{' '}
                    {formatarData(recorde.data)} · {recorde.erros} erros ·{' '}
                    {formatarTempo(recorde.tempo)}
                  </Text>
                </View>

                <View style={styles.pontos}>
                  <Text style={styles.pontosValor}>{recorde.pontuacao}</Text>
                  <Text style={styles.pontosLabel}>pontos</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.regras}>
        <Text style={styles.regrasTitulo}>Como a pontuação é calculada</Text>
        <Text style={styles.regrasTexto}>
          Você começa com uma pontuação que depende da dificuldade ({BASES_POR_NIVEL}) e perde{' '}
          {PENALIDADE_ERRO} por erro e{' '}
          {PENALIDADE_SEGUNDO} por segundo de partida. Em caso de empate, vence quem terminou mais
          rápido.
        </Text>
      </View>

      {recordes.length > 0 && (
        <Button
          titulo="Limpar ranking"
          icone="trash-outline"
          variante="danger"
          style={styles.limpar}
          onPress={confirmarLimpeza}
        />
      )}

      <Creditos />
    </Screen>
  );
}
