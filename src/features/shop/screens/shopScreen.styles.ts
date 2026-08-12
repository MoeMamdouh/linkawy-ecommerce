import { Colors, FontFamily, FontSize } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createShopScreenStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 0,
      backgroundColor: colors.background,
    },
    title: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.xxl,
      color: colors.foreground,
      marginBottom: 12,
    },
    resultsCount: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.sm,
      color: colors.mutedForeground,
      paddingHorizontal: 20,
      paddingBottom: 8,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    errorText: {
      color: colors.destructive,
      fontFamily: FontFamily.semiBold,
      fontSize: FontSize.md,
      textAlign: 'center',
      padding: 20,
    },
  });
