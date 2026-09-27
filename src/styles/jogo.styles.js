import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

export const GRID_ESPACO = 10;

export const jogoStyles = StyleSheet.create({
  // Tela de escolha (aba Jogar)
  secaoTitulo: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  resumo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  resumoTexto: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.warningSoft,
  },
  avisoTexto: {
    flex: 1,
    color: colors.warning,
    fontSize: 13,
    fontWeight: '600',
  },

  // Tela da partida
  sair: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: GRID_ESPACO,
  },
  progresso: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  progressoBarra: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },
  acoes: {
    marginTop: spacing.xl,
  },
  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Área do resultado final
  resultadoOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.overlay,
  },
  resultado: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.lg,
  },
  resultadoIcone: {
    width: 84,
    height: 84,
    borderRadius: radius.pill,
    backgroundColor: colors.warningSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultadoTitulo: {
    ...typography.title,
    textAlign: 'center',
  },
  resultadoMensagem: {
    ...typography.subtitle,
    textAlign: 'center',
    marginTop: -spacing.sm,
  },
  resultadoStats: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: spacing.sm,
  },
  resultadoStat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
  },
  resultadoStatValor: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  resultadoStatLabel: {
    ...typography.label,
    fontSize: 10,
    marginTop: 2,
  },
  resultadoForm: {
    alignSelf: 'stretch',
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 16,
  },
  salvo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
  },
  salvoTexto: {
    color: colors.accent,
    fontWeight: '700',
  },
  erro: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultadoAcoes: {
    alignSelf: 'stretch',
    gap: spacing.sm,
  },
});
