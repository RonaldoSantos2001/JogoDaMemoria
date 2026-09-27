import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';

import EmptyState from '../../components/EmptyState';
import FiguraItem from '../../components/FiguraItem';
import Header from '../../components/Header';
import NovaFiguraModal from '../../components/NovaFiguraModal';
import Screen from '../../components/Screen';
import SeletorTema from '../../components/SeletorTema';
import { nomeTema, TEMA_INICIAL } from '../../database/figurasPadrao';
import {
  contarFigurasPorTema,
  excluirFigura,
  inserirFigura,
  listarFiguras,
} from '../../database/figurasRepository';
import { MINIMO_FIGURAS } from '../../utils/dificuldades';
import { figurasStyles as styles } from '../../styles/figuras.styles';
import { colors } from '../../theme';

export default function Figuras() {
  const db = useSQLiteContext();
  // A tela Jogar pode abrir esta aba já com um tema escolhido (?tema=...)
  const { tema: temaParam } = useLocalSearchParams();
  const [temaEscolhido, setTemaEscolhido] = useState(null);
  const [ultimoParam, setUltimoParam] = useState(temaParam);
  if (temaParam !== ultimoParam) {
    setUltimoParam(temaParam);
    setTemaEscolhido(null);
  }
  const tema = temaEscolhido ?? temaParam ?? TEMA_INICIAL;
  const [figuras, setFiguras] = useState([]);
  const [contagens, setContagens] = useState({});
  const [modalAberto, setModalAberto] = useState(false);

  const carregar = useCallback(async () => {
    const [lista, porTema] = await Promise.all([
      listarFiguras(db, tema),
      contarFigurasPorTema(db),
    ]);
    setFiguras(lista);
    setContagens(porTema);
  }, [db, tema]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  async function salvar(figura) {
    await inserirFigura(db, { ...figura, tema });
    setModalAberto(false);
    await carregar();
  }

  function confirmarExclusao(figura) {
    Alert.alert('Excluir figura', `Deseja excluir "${figura.descricao}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await excluirFigura(db, figura);
          await carregar();
        },
      },
    ]);
  }

  const faltam = MINIMO_FIGURAS - figuras.length;

  const cabecalho = (
    <>
      <Header
        titulo="Figuras"
        subtitulo="Imagens usadas nas cartas do jogo"
        direita={
          <View style={styles.counter}>
            <Text style={styles.counterText}>{figuras.length}</Text>
          </View>
        }
      />
      <SeletorTema valor={tema} onChange={setTemaEscolhido} contagens={contagens} />
      {figuras.length > 0 && faltam > 0 && (
        <View style={styles.aviso}>
          <Ionicons name="alert-circle" size={20} color={colors.warning} />
          <Text style={styles.avisoTexto}>
            Cadastre mais {faltam} figura{faltam > 1 ? 's' : ''} para poder jogar com este tema.
          </Text>
        </View>
      )}
    </>
  );

  return (
    <Screen rolavel={false}>
      <FlatList
        data={figuras}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        ListHeaderComponent={cabecalho}
        ListEmptyComponent={
          <EmptyState
            icone="images-outline"
            titulo={`Nenhuma figura em "${nomeTema(tema)}"`}
            texto={`Toque no botão + para adicionar. São necessárias pelo menos ${MINIMO_FIGURAS} figuras para jogar.`}
          />
        }
        renderItem={({ item }) => <FiguraItem figura={item} onExcluir={confirmarExclusao} />}
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && { transform: [{ scale: 0.94 }] }]}
        onPress={() => setModalAberto(true)}
        accessibilityLabel="Adicionar figura"
      >
        <Ionicons name="add" size={32} color={colors.text} />
      </Pressable>

      <NovaFiguraModal
        visivel={modalAberto}
        nomeTema={nomeTema(tema)}
        onFechar={() => setModalAberto(false)}
        onSalvar={salvar}
      />
    </Screen>
  );
}
