import { StyleSheet } from 'react-native';

import { colors, radius, shadows, spacing } from '../theme';

export const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.45,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});

// Cores de cada variação de botão
export const buttonVariants = {
  primary: {
    container: { backgroundColor: colors.primary, ...shadows.glow },
    text: colors.text,
  },
  secondary: {
    container: { backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border },
    text: colors.text,
  },
  success: {
    container: { backgroundColor: colors.accent },
    text: colors.background,
  },
  danger: {
    container: { backgroundColor: colors.dangerSoft },
    text: colors.danger,
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: colors.textMuted,
  },
};
