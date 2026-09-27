import { StyleSheet } from 'react-native';

import { colors, radius, shadows, spacing, typography } from '../theme';

export const figurasStyles = StyleSheet.create({
  counter: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  counterText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
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
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 120,
  },
  row: {
    justifyContent: 'space-between',
  },
  separator: {
    height: spacing.md,
  },

  // Item da lista
  item: {
    width: '48%',
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceAlt,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  itemDescricao: {
    ...typography.body,
    flex: 1,
    fontWeight: '600',
  },
  itemExcluir: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Botão flutuante
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 60,
    height: 60,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glow,
  },

  // Modal de cadastro
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  modalHandle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  modalTitle: {
    ...typography.heading,
    fontSize: 22,
  },
  modalSubtitle: {
    ...typography.caption,
    marginTop: -spacing.md,
  },
  picker: {
    height: 200,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: spacing.sm,
  },
  pickerImage: {
    width: '100%',
    height: '100%',
  },
  pickerText: {
    ...typography.subtitle,
  },
  pickerActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  pickerAction: {
    flex: 1,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
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
  erro: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  modalAction: {
    flex: 1,
  },
});
