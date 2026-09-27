import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../styles/common.styles';

// Contêiner padrão das telas: fundo do tema, área segura e rolagem opcional.
export default function Screen({ children, rolavel = true }) {
  return (
    <SafeAreaView style={commonStyles.screen} edges={['top']}>
      <StatusBar style="light" />
      {rolavel ? (
        <ScrollView
          contentContainerStyle={commonStyles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={commonStyles.screen}>{children}</View>
      )}
    </SafeAreaView>
  );
}
