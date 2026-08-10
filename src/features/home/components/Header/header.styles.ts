// ──────────────────────────────────────────────
// Header — Styles
// ──────────────────────────────────────────────

import { Colors, FontFamily, Palette } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createHeaderStyles = (theme: keyof typeof Colors) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 12,
      backgroundColor: colors.background,
      zIndex: 10,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    greetingContainer: {
      gap: 1,
    },
    welcomeText: {
      fontFamily: FontFamily.regular,
      fontSize: 12,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    nameText: {
      fontFamily: FontFamily.black,
      fontSize: 18,
      color: colors.foreground,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.muted,
      justifyContent: 'center',
      alignItems: 'center',

      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    badge: {
      position: 'absolute',
      top: -2,
      right: -2,
      backgroundColor: colors.destructive,
      width: 16,
      height: 16,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      fontFamily: FontFamily.bold,
      fontSize: 9,
      color: Palette.white,
    },
  });
};
