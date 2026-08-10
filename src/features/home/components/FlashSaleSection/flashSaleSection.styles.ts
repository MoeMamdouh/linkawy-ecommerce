import { Colors, FontFamily, Palette } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createFlashSaleSectionStyles = (theme: keyof typeof Colors) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    // Timer badge
    timerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.accent,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 3,
      gap: 2,
    },
    timerText: {
      fontFamily: FontFamily.bold,
      fontSize: 11,
      color: Palette.white,
    },
    timerSeparator: {
      fontFamily: FontFamily.bold,
      fontSize: 11,
      color: Palette.white,
    },

    // Horizontal list
    listContainer: {
      paddingHorizontal: 20,
      gap: 12,
    },

    // Flash Sale Card (compact horizontal card)
    card: {
      width: 140,
      backgroundColor: colors.card,
      borderRadius: 14,
      overflow: 'hidden',
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    cardImageContainer: {
      width: '100%',
      height: 120,
      position: 'relative',
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },
    discountBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: colors.destructive,
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: 6,
    },
    discountText: {
      fontFamily: FontFamily.bold,
      fontSize: 10,
      color: Palette.white,
    },
    cardContent: {
      padding: 10,
      gap: 4,
    },
    cardTitle: {
      fontFamily: FontFamily.semiBold,
      fontSize: 12,
      color: colors.foreground,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    currentPrice: {
      fontFamily: FontFamily.bold,
      fontSize: 14,
      color: colors.primary,
    },
    comparePrice: {
      fontFamily: FontFamily.regular,
      fontSize: 11,
      color: colors.mutedForeground,
      textDecorationLine: 'line-through',
    },
  });
};
