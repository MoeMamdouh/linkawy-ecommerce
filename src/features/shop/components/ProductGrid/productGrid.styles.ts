// ──────────────────────────────────────────────
// ProductGrid — Styles
// ──────────────────────────────────────────────

import { Colors } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createProductGridStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    gridContent: {
      paddingHorizontal: 20,
      paddingBottom: 24,
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      color: colors.mutedForeground,
      fontSize: 14,
    },
  });
