import { Text, View } from 'react-native';

import { commonStyles } from '../styles/common.styles';

export default function Creditos() {
  return (
    <View style={commonStyles.creditos}>
      <Text style={commonStyles.creditosTexto}>
        Desenvolvido por <Text style={commonStyles.creditosNomes}>Eduardo e Ronaldo</Text>
      </Text>
    </View>
  );
}
