import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

import { statBadgeStyles as styles } from '../styles/statBadge.styles';

export default function StatBadge({ icone, rotulo, valor, cor, corFundo }) {
  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: corFundo }]}>
        <Ionicons name={icone} size={18} color={cor} />
      </View>
      <View>
        <Text style={styles.label}>{rotulo}</Text>
        <Text style={styles.value}>{valor}</Text>
      </View>
    </View>
  );
}
