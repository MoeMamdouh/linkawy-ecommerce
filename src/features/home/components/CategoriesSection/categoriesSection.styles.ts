import { Colors, FontFamily, Palette } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createCategoriesSectionStyles = (theme: keyof typeof Colors) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    listContainer: {
      paddingHorizontal: 20,
      gap: 16,
      backgroundColor: colors.background,
    },

    categoryItem: {
      alignItems: 'center',
      gap: 8,
      width: 68,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    categoryName: {
      fontFamily: FontFamily.medium,
      fontSize: 11,
      color: colors.foreground,
      textAlign: 'center',
    },
  });
};
