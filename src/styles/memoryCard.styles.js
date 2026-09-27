import { StyleSheet } from 'react-native';

import { colors, radius, shadows, spacing } from '../theme';

export const memoryCardStyles = StyleSheet.create({
  container: {
    ...shadows.card,
  },
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },

  // Verso (carta fechada)
  back: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  backInner: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    bottom: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    borderStyle: 'dashed',
  },
  backSymbol: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.text,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  // Frente (imagem da figura)
  front: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 2,
    borderColor: colors.border,
  },
  frontFound: {
    borderColor: colors.accent,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 3,
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.overlay,
  },
  captionText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  foundBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
