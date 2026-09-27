import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import Button from '../../components/Button';
import Creditos from '../../components/Creditos';
import Screen from '../../components/Screen';
import { contarFiguras } from '../../database/figurasRepository';
import { listarMelhoresRecordes } from '../../database/recordesRepository';
import { homeStyles as styles } from '../../styles/home.styles';
import { colors } from '../../theme';
import { MINIMO_FIGURAS } from '../../utils/dificuldades';

const CORES_LOGO = [colors.primary, colors.accent, colors.danger, colors.warning];

export default function Inicio() {
  const db = useSQLiteContext();
  const [totalFiguras, setTotalFiguras] = useState(0);
  const [recorde, setRecorde] = useState(null);

  useFocusEffect(
    useCallback(() => {
      contarFiguras(db).then(setTotalFiguras);
      listarMelhoresRecordes(db, 1).then((lista) => setRecorde(lista[0] ?? null));
    }, [db])
  );

  const podeJogar = totalFiguras >= MINIMO_FIGURAS;

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.logoGrid}>
          {CORES_LOGO.map((cor, i) => (
            <View key={cor} style={[styles.logoCard, { backgroundColor: cor }]}>
              <Text style={styles.logoSymbol}>{i === 1 ? '★' : '?'}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.title}>
          Jogo da <Text style={styles.titleHighlight}>Memória</Text>
        </Text>
        <Text style={styles.subtitle}>
          Escolha um tema ou cadastre suas próprias figuras, encontre os pares e entre para o
          ranking.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          titulo={podeJogar ? 'Jogar agora' : 'Cadastrar figuras'}
          icone={podeJogar ? 'play' : 'add-circle-outline'}
          onPress={() => router.navigate(podeJogar ? '/jogo' : '/figuras')}
        />
        <Button
          titulo="Ver ranking"
          icone="trophy-outline"
          variante="secondary"
          onPress={() => router.navigate('/ranking')}
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Resumo</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="images" size={16} color={colors.primary} />
          </View>
          <Text style={styles.infoText}>
            {totalFiguras} figura{totalFiguras === 1 ? '' : 's'} cadastrada
            {totalFiguras === 1 ? '' : 's'}
            {!podeJogar && ` (mínimo de ${MINIMO_FIGURAS} para jogar)`}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="trophy" size={16} color={colors.primary} />
          </View>
          <Text style={styles.infoText}>
            {recorde
              ? `Recorde: ${recorde.pontuacao} pontos (${recorde.jogador})`
              : 'Nenhum recorde ainda. Seja o primeiro!'}
          </Text>
        </View>
      </View>

      <View style={styles.spacer} />
      <Creditos />
    </Screen>
  );
}
