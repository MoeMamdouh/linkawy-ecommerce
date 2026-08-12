// ──────────────────────────────────────────────
// ProductGrid — Styles
// ──────────────────────────────────────────────

import { Colors } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createProductGridStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    list: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gridContent: {
      paddingHorizontal: 20,
      paddingBottom: 24,
      backgroundColor: colors.background,
      flexGrow: 1,
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
      backgroundColor: colors.background,
    },
    emptyText: {
      color: colors.mutedForeground,
      fontSize: 14,
    },
  });
