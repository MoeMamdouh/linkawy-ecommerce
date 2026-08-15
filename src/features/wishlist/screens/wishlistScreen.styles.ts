import { Colors, FontFamily, FontSize } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createWishlistScreenStyles = (colors: typeof Colors.light | typeof Colors.dark) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    headerTitle: {
      fontFamily: FontFamily.black,
      fontSize: FontSize.xl,
      color: colors.foreground,
    },
    headerSubtitle: {
      fontFamily: FontFamily.medium,
      fontSize: FontSize.xs,
      color: colors.mutedForeground,
      marginTop: 2,
    },
    listContent: {
      padding: 16,
      paddingBottom: 32,
    },
    columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: colors.background,
    },
    errorText: {
      fontFamily: FontFamily.semiBold,
      fontSize: FontSize.md,
      color: colors.destructive,
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
      paddingBottom: 64,
    },
    emptyIconCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.muted,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    emptyTitle: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.xl,
      color: colors.foreground,
      textAlign: 'center',
      marginBottom: 8,
    },
    emptySubtitle: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.sm,
      color: colors.mutedForeground,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
    },
    emptyButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 16,
      elevation: 2,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    emptyButtonText: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.sm,
      color: colors.primaryForeground,
      textAlign: 'center',
    },
  });
};
