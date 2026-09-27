import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { tabBarOptions } from '../../styles/tabs.styles';

const ABAS = [
  { nome: 'index', titulo: 'Início', icone: 'home' },
  { nome: 'figuras', titulo: 'Figuras', icone: 'images' },
  { nome: 'jogo', titulo: 'Jogar', icone: 'game-controller' },
  { nome: 'ranking', titulo: 'Ranking', icone: 'trophy' },
];

export default function AbasLayout() {
  return (
    <Tabs screenOptions={tabBarOptions}>
      {ABAS.map((aba) => (
        <Tabs.Screen
          key={aba.nome}
          name={aba.nome}
          options={{
            title: aba.titulo,
            tabBarIcon: ({ color, size }) => <Ionicons name={aba.icone} size={size} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
