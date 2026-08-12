// ──────────────────────────────────────────────
// SearchBar — Styles
// ──────────────────────────────────────────────

import { StyleSheet } from 'react-native';
import { Colors, FontFamily } from '@shared/constants/theme';

export const createSearchBarStyles = (colors: typeof Colors.light | typeof Colors.dark) => {

  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      backgroundColor: colors.background,
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 10,
    },
    input: {
      flex: 1,
      fontFamily: FontFamily.regular,
      fontSize: 14,
      color: colors.foreground,
      padding: 0,
    },
  });
};
