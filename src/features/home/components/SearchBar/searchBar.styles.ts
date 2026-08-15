// ──────────────────────────────────────────────
// SearchBar — Styles
// ──────────────────────────────────────────────

import { Colors, FontFamily } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createSearchBarStyles = (
  colors: typeof Colors.light | typeof Colors.dark,
  containerBackground?: string,
  embedded = false
) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: embedded ? 0 : 20,
      paddingVertical: embedded ? 0 : 8,
      backgroundColor: containerBackground ?? colors.background,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.input,
      borderRadius: 24,
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
