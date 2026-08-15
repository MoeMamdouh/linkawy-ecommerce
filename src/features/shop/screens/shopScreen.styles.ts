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
      backgroundColor: colors.card,
      paddingBottom: isDark ? 0 : 4,
    },
    headerContent: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 10,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10,
    },
    title: {
      fontFamily: FontFamily.black,
      fontSize: FontSize.xl,
      color: colors.foreground,
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    searchBarContainer: {
      flex: 1,
      backgroundColor: colors.card,
    },
    filterButton: {
      height: 48,
      width: 48,
      borderRadius: 24,
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 40,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.xl,
      color: colors.foreground,
    },
    sortOptionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    sortOptionText: {
      fontFamily: FontFamily.medium,
      fontSize: FontSize.md,
      color: colors.foreground,
    },
    sortOptionSelectedText: {
      color: colors.primary,
      fontFamily: FontFamily.bold,
    },
    resultsCount: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.sm,
      color: colors.mutedForeground,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 10,
    },
    resultsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 20,
    },
    loadingBar: {
      height: 2,
      marginHorizontal: 20,
      marginBottom: 6,
      borderRadius: 1,
      backgroundColor: colors.primary,
      opacity: 0.6,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
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
