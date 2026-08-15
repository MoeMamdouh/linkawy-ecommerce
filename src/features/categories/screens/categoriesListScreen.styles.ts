import { Colors, FontFamily, FontSize } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createCategoriesListScreenStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      gap: 12,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      fontFamily: FontFamily.bold,
      fontSize: FontSize.xxl,
      color: colors.foreground,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 24,
      gap: 12,
    },
    categoryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      gap: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    categoryImage: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: colors.input,
    },
    categoryInfo: {
      flex: 1,
      gap: 4,
    },
    categoryName: {
      fontFamily: FontFamily.semiBold,
      fontSize: FontSize.md,
      color: colors.foreground,
    },
    categoryDescription: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.sm,
      color: colors.mutedForeground,
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
