import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, Pressable, Text } from 'react-native';

import { buttonStyles, buttonVariants } from '../styles/button.styles';

export default function Button({
  titulo,
  icone,
  variante = 'primary',
  onPress,
  desabilitado = false,
  carregando = false,
  style,
}) {
  const cores = buttonVariants[variante];

  return (
    <Pressable
      onPress={onPress}
      disabled={desabilitado || carregando}
      style={({ pressed }) => [
        buttonStyles.base,
        cores.container,
        pressed && buttonStyles.pressed,
        (desabilitado || carregando) && buttonStyles.disabled,
        style,
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={cores.text} />
      ) : (
        icone && <Ionicons name={icone} size={20} color={cores.text} />
      )}
      <Text style={[buttonStyles.text, { color: cores.text }]}>{titulo}</Text>
    </Pressable>
  );
}
