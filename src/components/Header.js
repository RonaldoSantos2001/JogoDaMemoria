import { Text, View } from 'react-native';

import { commonStyles } from '../styles/common.styles';

export default function Header({ titulo, subtitulo, direita, style }) {
  return (
    <View style={[commonStyles.header, style]}>
      <View style={commonStyles.headerTexts}>
        <Text style={commonStyles.title}>{titulo}</Text>
        {subtitulo ? <Text style={commonStyles.subtitle}>{subtitulo}</Text> : null}
      </View>
      {direita}
    </View>
  );
}
