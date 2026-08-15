import { Colors, FontFamily, Palette } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createCategoriesScreenStyles = (colors: typeof Colors.light | typeof Colors.dark) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    headerTitle: {
      fontFamily: FontFamily.black,
      fontSize: 24,
      color: colors.foreground,
      marginLeft: 12,
    },
    headerSubtitle: {
      fontFamily: FontFamily.medium,
      fontSize: 12,
      color: colors.mutedForeground,
      marginLeft: 12,
      marginTop: 2,
    },
    listContainer: {
      padding: 16,
      paddingBottom: 40,
      gap: 16,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      gap: 16,
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    imageContainer: {
      width: 100,
      height: 120,
      borderRadius: 12,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    categoryName: {
      fontFamily: FontFamily.semiBold,
      fontSize: 16,
      color: colors.foreground,
      marginBottom: 4,
    },
    categoryDescription: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: colors.mutedForeground,
      lineHeight: 18,
      marginBottom: 12,
    },
    shopButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      alignSelf: 'flex-start',
      marginTop: 'auto',
    },
    shopButtonText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 12,
      color: colors.primaryForeground,
    },
    seeMoreButton: {
      marginTop: 4,
      alignSelf: 'flex-start',
    },
    seeMoreText: {
      fontFamily: FontFamily.medium,
      fontSize: 12,
      color: colors.primary,
    },
  });
};
