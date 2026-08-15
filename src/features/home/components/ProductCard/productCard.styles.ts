// ──────────────────────────────────────────────
// ProductCard — Styles
// ──────────────────────────────────────────────

import { Colors, FontFamily, Palette } from '@shared/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CARD_WIDTH = (SCREEN_WIDTH - 52) / 2;

export const createProductCardStyles = (
  colors: typeof Colors.light | typeof Colors.dark,
  isDark: boolean
) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      backgroundColor: colors.card,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 14,
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: isDark ? 0 : 3 },
      shadowOpacity: isDark ? 0 : 0.08,
      shadowRadius: isDark ? 0 : 10,
      elevation: isDark ? 0 : 3,
      borderWidth: isDark ? 1 : 0,
      borderColor: isDark ? colors.border : 'transparent',
    },
    imageContainer: {
      width: '100%',
      height: CARD_WIDTH * 0.85,
      position: 'relative',
      backgroundColor: colors.muted,
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
      paddingVertical: 4,
      borderRadius: 999,
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
      backgroundColor: isDark ? 'rgba(15, 13, 28, 0.72)' : 'rgba(255, 255, 255, 0.92)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: 12,
      gap: 3,
    },
    category: {
      fontFamily: FontFamily.medium,
      fontSize: 10,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
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
    ratingText: {
      fontFamily: FontFamily.medium,
      fontSize: 11,
      color: colors.mutedForeground,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 6,
    },
    priceGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flex: 1,
    },
    currentPrice: {
      fontFamily: FontFamily.bold,
      fontSize: 15,
      color: colors.primary,
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
