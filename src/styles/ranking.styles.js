import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

export const rankingStyles = StyleSheet.create({
  lista: {
    gap: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemPrimeiro: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(255, 209, 102, 0.08)',
  },
  posicao: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  posicaoTexto: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textMuted,
  },
  info: {
    flex: 1,
  },
  jogador: {
    ...typography.body,
    fontWeight: '700',
  },
  detalhes: {
    ...typography.caption,
    marginTop: 2,
  },
  pontos: {
    alignItems: 'flex-end',
  },
  pontosValor: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
  pontosLabel: {
    ...typography.label,
    fontSize: 9,
  },
  regras: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  regrasTitulo: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  regrasTexto: {
    ...typography.caption,
    lineHeight: 18,
  },
  limpar: {
    marginTop: spacing.lg,
  },
});

// Cor da medalha para as 3 primeiras posições
export const coresMedalha = [colors.gold, colors.silver, colors.bronze];
