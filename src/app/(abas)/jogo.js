import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import SeletorDificuldade from '../../components/SeletorDificuldade';
import SeletorTema from '../../components/SeletorTema';
import { nomeTema, TEMA_INICIAL } from '../../database/figurasPadrao';
import { contarFigurasPorTema } from '../../database/figurasRepository';
import { jogoStyles as styles } from '../../styles/jogo.styles';
import { colors } from '../../theme';
import { DIFICULDADE_INICIAL, obterDificuldade } from '../../utils/dificuldades';

// Escolha do tema e da dificuldade. A partida em si abre em outra tela (/partida),
// assim não dá para trocar o tema sem querer no meio do jogo.
export default function Jogo() {
  const db = useSQLiteContext();
  const [tema, setTema] = useState(TEMA_INICIAL);
  const [dificuldade, setDificuldade] = useState(DIFICULDADE_INICIAL);
  const [contagens, setContagens] = useState({});

  useFocusEffect(
    useCallback(() => {
      contarFigurasPorTema(db).then(setContagens);
    }, [db])
  );

  const { nome: nomeNivel, pares, colunas } = obterDificuldade(dificuldade);
  const totalFiguras = contagens[tema] ?? 0;
  const faltam = pares - totalFiguras;

  return (
    <Screen>
      <Header titulo="Jogar" subtitulo="Escolha o tema e a dificuldade" />

      <Text style={styles.secaoTitulo}>Tema</Text>
      <SeletorTema valor={tema} onChange={setTema} contagens={contagens} />

      <Text style={styles.secaoTitulo}>Dificuldade</Text>
      <SeletorDificuldade valor={dificuldade} onChange={setDificuldade} />

      <View style={styles.resumo}>
        <Ionicons name="grid-outline" size={20} color={colors.primary} />
        <Text style={styles.resumoTexto}>
          {nomeTema(tema)} · {pares * 2} cartas em uma grade de {colunas} ×{' '}
          {Math.ceil((pares * 2) / colunas)}
        </Text>
      </View>

      {faltam > 0 ? (
        <>
          <View style={styles.aviso}>
            <Ionicons name="alert-circle" size={20} color={colors.warning} />
            <Text style={styles.avisoTexto}>
              O nível {nomeNivel} precisa de {pares} figuras e este tema tem {totalFiguras}.
              Cadastre mais {faltam} ou escolha um nível mais fácil.
            </Text>
          </View>
          <Button
            titulo="Cadastrar figuras"
            icone="add"
            onPress={() => router.navigate({ pathname: '/figuras', params: { tema } })}
          />
        </>
      ) : (
        <Button
          titulo="Começar partida"
          icone="play"
          onPress={() => router.push({ pathname: '/partida', params: { tema, dificuldade } })}
        />
      )}
    </Screen>
  );
}
