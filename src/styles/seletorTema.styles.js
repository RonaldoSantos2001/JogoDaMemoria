import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../theme';

export const seletorTemaStyles = StyleSheet.create({
  lista: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipAtivo: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  texto: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  textoAtivo: {
    color: colors.text,
  },
  contador: {
    color: colors.textFaint,
    fontSize: 12,
    fontWeight: '700',
  },
  contadorAtivo: {
    color: colors.primary,
  },
});
