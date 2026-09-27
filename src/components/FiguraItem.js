import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, Text, View } from 'react-native';

import { fonteImagem } from '../database/figurasPadrao';
import { figurasStyles as styles } from '../styles/figuras.styles';
import { colors } from '../theme';

export default function FiguraItem({ figura, onExcluir }) {
  return (
    <View style={styles.item}>
      <Image source={fonteImagem(figura.imagem)} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemFooter}>
        <Text style={styles.itemDescricao} numberOfLines={2}>
          {figura.descricao}
        </Text>
        <Pressable
          onPress={() => onExcluir(figura)}
          style={styles.itemExcluir}
          hitSlop={8}
          accessibilityLabel={`Excluir ${figura.descricao}`}
        >
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
        </Pressable>
      </View>
    </View>
  );
}
