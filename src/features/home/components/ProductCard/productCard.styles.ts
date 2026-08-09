// ──────────────────────────────────────────────
// ProductCard — Styles
// ──────────────────────────────────────────────

import { StyleSheet, Dimensions } from 'react-native';
import { Colors, FontFamily, Palette } from '@shared/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CARD_WIDTH = (SCREEN_WIDTH - 52) / 2; // 20px padding + 12px gap

export const createProductCardStyles = (theme: keyof typeof Colors) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      backgroundColor: colors.card,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 14,
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 3,
    },
    imageContainer: {
      width: '100%',
      height: CARD_WIDTH * 0.85,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    discountBadge: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: colors.destructive,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    discountText: {
      fontFamily: FontFamily.bold,
      fontSize: 10,
      color: Palette.white,
    },
    heartButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'rgba(255,255,255,0.85)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: 12,
      gap: 4,
    },
    category: {
      fontFamily: FontFamily.medium,
      fontSize: 10,
      color: colors.mutedForeground,
      textTransform: 'capitalize',
    },
    title: {
      fontFamily: FontFamily.semiBold,
      fontSize: 13,
      color: colors.foreground,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 2,
    },
    starsContainer: {
      flexDirection: 'row',
      gap: 1,
    },
    ratingText: {
      fontFamily: FontFamily.medium,
      fontSize: 11,
      color: colors.mutedForeground,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    priceGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    currentPrice: {
      fontFamily: FontFamily.bold,
      fontSize: 15,
      color: colors.foreground,
    },
    comparePrice: {
      fontFamily: FontFamily.regular,
      fontSize: 11,
      color: colors.mutedForeground,
      textDecorationLine: 'line-through',
    },
    addButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
