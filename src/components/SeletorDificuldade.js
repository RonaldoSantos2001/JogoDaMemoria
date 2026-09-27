import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, ScrollView, Text } from 'react-native';

import { seletorTemaStyles as styles } from '../styles/seletorTema.styles';
import { colors } from '../theme';
import { DIFICULDADES } from '../utils/dificuldades';

// Lista horizontal de dificuldades, no mesmo visual do seletor de temas.
// Mostra a quantidade de cartas de cada nível.
export default function SeletorDificuldade({ valor, onChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.lista}
    >
      {DIFICULDADES.map((dificuldade) => {
        const ativo = dificuldade.id === valor;
        return (
          <Pressable
            key={dificuldade.id}
            onPress={() => onChange(dificuldade.id)}
            style={[styles.chip, ativo && styles.chipAtivo]}
            accessibilityRole="button"
            accessibilityState={{ selected: ativo }}
          >
            <Ionicons
              name={dificuldade.icone}
              size={16}
              color={ativo ? colors.primary : colors.textMuted}
            />
            <Text style={[styles.texto, ativo && styles.textoAtivo]}>{dificuldade.nome}</Text>
            <Text style={[styles.contador, ativo && styles.contadorAtivo]}>
              {dificuldade.pares * 2}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
