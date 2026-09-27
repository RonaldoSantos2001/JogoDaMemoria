import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, ScrollView, Text } from 'react-native';

import { TEMAS } from '../database/figurasPadrao';
import { seletorTemaStyles as styles } from '../styles/seletorTema.styles';
import { colors } from '../theme';

// Lista horizontal de temas. "contagens" (opcional) mostra quantas figuras cada tema tem.
export default function SeletorTema({ valor, onChange, contagens }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.lista}
    >
      {TEMAS.map((tema) => {
        const ativo = tema.id === valor;
        return (
          <Pressable
            key={tema.id}
            onPress={() => onChange(tema.id)}
            style={[styles.chip, ativo && styles.chipAtivo]}
            accessibilityRole="button"
            accessibilityState={{ selected: ativo }}
          >
            <Ionicons name={tema.icone} size={16} color={ativo ? colors.primary : colors.textMuted} />
            <Text style={[styles.texto, ativo && styles.textoAtivo]}>{tema.nome}</Text>
            {contagens && (
              <Text style={[styles.contador, ativo && styles.contadorAtivo]}>
                {contagens[tema.id] ?? 0}
              </Text>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
