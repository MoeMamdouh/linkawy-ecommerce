import { Colors, FontFamily, FontSize } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createShopScreenStyles = (
  colors: typeof Colors.light | typeof Colors.dark,
  isDark: boolean
) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerSection: {
      width: '100%',
      backgroundColor: isDark ? colors.background : colors.card,
      paddingBottom: isDark ? 0 : 4,
    },
    headerContent: {
      paddingHorizontal: 20,
      paddingTop: 4,
      paddingBottom: 10,
    },
    title: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.xxl,
      color: colors.foreground,
      marginBottom: 10,
    },
    resultsCount: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.sm,
      color: colors.mutedForeground,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 10,
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
