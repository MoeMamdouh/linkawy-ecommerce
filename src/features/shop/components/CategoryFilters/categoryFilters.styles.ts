// ──────────────────────────────────────────────
// CategoryFilters — Styles
// ──────────────────────────────────────────────

import { Colors, FontFamily } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createCategoryFiltersStyles = (
  colors: typeof Colors.light | typeof Colors.dark,
  sectionBackground?: string,
  embedded = false
) =>
  StyleSheet.create({
    listContainer: {
      paddingHorizontal: embedded ? 0 : 20,
      paddingTop: 12,
      paddingBottom: 12,
      gap: 12,
      backgroundColor: sectionBackground ?? colors.background,
    },
    pill: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 999,
      backgroundColor: colors.input,
    },
    pillActive: {
      backgroundColor: colors.primary,
    },
    pillText: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: colors.mutedForeground,
    },
    pillTextActive: {
      color: colors.primaryForeground,
      fontFamily: FontFamily.semiBold,
    },
  });
