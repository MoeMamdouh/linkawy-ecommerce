// ──────────────────────────────────────────────
// SectionHeader — Styles
// ──────────────────────────────────────────────

import { StyleSheet } from 'react-native';
import { Colors, FontFamily } from '@shared/constants/theme';

export const createSectionHeaderStyles = (theme: keyof typeof Colors) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 12,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    title: {
      fontFamily: FontFamily.bold,
      fontSize: 18,
      color: colors.foreground,
    },
    seeAllText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 13,
      color: colors.primary,
    },
  });
};
