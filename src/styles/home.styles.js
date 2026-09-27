import { StyleSheet } from 'react-native';

import { colors, radius, shadows, spacing, typography } from '../theme';

export const homeStyles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  logoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 132,
    gap: 8,
    marginBottom: spacing.xl,
    transform: [{ rotate: '-8deg' }],
  },
  logoCard: {
    width: 62,
    height: 62,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  logoSymbol: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
  },
  title: {
    ...typography.title,
    fontSize: 34,
    textAlign: 'center',
  },
  titleHighlight: {
    color: colors.primary,
  },
  subtitle: {
    ...typography.subtitle,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
    maxWidth: 300,
  },
  actions: {
    gap: spacing.md,
  },
  infoCard: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  infoTitle: {
    ...typography.label,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    ...typography.body,
    flex: 1,
    color: colors.textMuted,
    fontSize: 14,
  },
  spacer: {
    flex: 1,
  },
});
