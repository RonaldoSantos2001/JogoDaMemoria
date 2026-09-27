import Ionicons from '@expo/vector-icons/Ionicons';
import { memo, useEffect, useState } from 'react';
import { Animated, Easing, Image, Pressable, Text, View } from 'react-native';

import { fonteImagem } from '../database/figurasPadrao';
import { memoryCardStyles as styles } from '../styles/memoryCard.styles';
import { animation, colors } from '../theme';

// Carta do jogo com três animações (React Native Animated):
//  - entrada: as cartas "surgem" uma a uma ao iniciar a partida;
//  - virar/esconder: giro 3D no eixo Y ao abrir ou fechar a carta;
//  - acerto: pulso quando o par é encontrado.
function MemoryCard({ carta, indice, tamanho, onPress }) {
  const visivel = carta.aberta || carta.encontrada;

  const [giro] = useState(() => new Animated.Value(visivel ? 1 : 0));
  const [entrada] = useState(() => new Animated.Value(0));
  const [pulso] = useState(() => new Animated.Value(1));

  // Exibir cartas: surgem em sequência
  useEffect(() => {
    Animated.spring(entrada, {
      toValue: 1,
      delay: indice * animation.appearStagger,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [entrada, indice]);

  // Virar / esconder carta
  useEffect(() => {
    Animated.timing(giro, {
      toValue: visivel ? 1 : 0,
      duration: animation.flip,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [giro, visivel]);

  // Pulso ao acertar o par
  useEffect(() => {
    if (!carta.encontrada) return;
    Animated.sequence([
      Animated.delay(animation.flip),
      Animated.spring(pulso, { toValue: 1.1, friction: 3, useNativeDriver: true }),
      Animated.spring(pulso, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  }, [carta.encontrada, pulso]);

  const rotacaoVerso = giro.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const rotacaoFrente = giro.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
  // Garante que só uma face aparece por vez (o Android nem sempre respeita backfaceVisibility)
  const opacidadeVerso = giro.interpolate({ inputRange: [0, 0.49, 0.5, 1], outputRange: [1, 1, 0, 0] });
  const opacidadeFrente = giro.interpolate({ inputRange: [0, 0.49, 0.5, 1], outputRange: [0, 0, 1, 1] });

  const escalaEntrada = entrada.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: tamanho,
          height: tamanho,
          opacity: entrada,
          transform: [{ scale: Animated.multiply(escalaEntrada, pulso) }],
        },
      ]}
    >
      <Pressable
        onPress={() => onPress(indice)}
        disabled={visivel}
        style={{ flex: 1 }}
        accessibilityRole="button"
        accessibilityLabel={visivel ? carta.figura.descricao : 'Carta fechada'}
      >
        <Animated.View
          style={[
            styles.face,
            styles.back,
            { opacity: opacidadeVerso, transform: [{ perspective: 800 }, { rotateY: rotacaoVerso }] },
          ]}
        >
          <View style={styles.backInner} />
          <Text style={styles.backSymbol}>?</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.face,
            styles.front,
            carta.encontrada && styles.frontFound,
            { opacity: opacidadeFrente, transform: [{ perspective: 800 }, { rotateY: rotacaoFrente }] },
          ]}
        >
          <Image source={fonteImagem(carta.figura.imagem)} style={styles.image} resizeMode="cover" />
          <View style={styles.caption}>
            <Text style={styles.captionText} numberOfLines={1}>
              {carta.figura.descricao}
            </Text>
          </View>
          {carta.encontrada && (
            <View style={styles.foundBadge}>
              <Ionicons name="checkmark" size={14} color={colors.background} />
            </View>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

export default memo(MemoryCard);
