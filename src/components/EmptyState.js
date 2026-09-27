import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

import { commonStyles } from '../styles/common.styles';
import { colors } from '../theme';

export default function EmptyState({ icone, titulo, texto, children }) {
  return (
    <View style={commonStyles.emptyState}>
      <View style={commonStyles.emptyIcon}>
        <Ionicons name={icone} size={34} color={colors.primary} />
      </View>
      <Text style={commonStyles.emptyTitle}>{titulo}</Text>
      {texto ? <Text style={commonStyles.emptyText}>{texto}</Text> : null}
      {children}
    </View>
  );
}
