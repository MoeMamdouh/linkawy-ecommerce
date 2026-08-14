import { Colors, FontFamily, Palette } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createCategoriesSectionStyles = (colors: typeof Colors.light | typeof Colors.dark) => {
  
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
    imageContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: colors.card,
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 16,
    },
    categoryName: {
      fontFamily: FontFamily.medium,
      fontSize: 11,
      color: colors.foreground,
      textAlign: 'center',
    },
  });
};
