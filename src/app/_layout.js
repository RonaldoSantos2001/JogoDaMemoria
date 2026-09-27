import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

import { DATABASE_NAME, initDatabase } from '../database/database';
import { colors } from '../theme';

// Pilha principal: as abas e, por cima delas, a tela da partida (sem barra de abas).
export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={initDatabase}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(abas)" />
        <Stack.Screen name="partida" />
      </Stack>
    </SQLiteProvider>
  );
}
