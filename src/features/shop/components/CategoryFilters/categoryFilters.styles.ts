// ──────────────────────────────────────────────
// CategoryFilters — Styles
// ──────────────────────────────────────────────

import { Colors, FontFamily } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createCategoryFiltersStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    listContainer: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      gap: 8,
    },
    pill: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: colors.input,
      marginRight: 8,
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
    },
  });
