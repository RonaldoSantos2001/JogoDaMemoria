import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  headerTexts: {
    flex: 1,
  },
  title: {
    ...typography.title,
  },
  subtitle: {
    ...typography.subtitle,
    marginTop: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    ...typography.heading,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.subtitle,
    textAlign: 'center',
    lineHeight: 21,
  },
  creditos: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  creditosTexto: {
    ...typography.caption,
    color: colors.textFaint,
  },
  creditosNomes: {
    color: colors.primary,
    fontWeight: '700',
  },
});
