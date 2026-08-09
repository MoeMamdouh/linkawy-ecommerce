import { Colors, FontFamily, FontSize, Palette } from '@shared/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_WIDTH * 0.95;

export const createProductDetailsStyles = (theme: keyof typeof Colors) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 110,
    },
    // Image Header Section
    imageContainer: {
      width: SCREEN_WIDTH,
      height: IMAGE_HEIGHT,
      position: 'relative',
      backgroundColor: Palette.purple100,
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    headerOverlay: {
      position: 'absolute',
      top: 50,
      left: 20,
      right: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 10,
    },
    circleIconButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: Palette.white,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
    },
    discountBadge: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: colors.destructive,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 14,
    },
    discountText: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.xs,
      color: Palette.white,
      letterSpacing: 0.5,
    },

    // Content Section
    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    categoryText: {
      fontFamily: FontFamily.medium,
      fontSize: FontSize.sm,
      color: colors.mutedForeground,
      marginBottom: 4,
    },
    titleText: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.xxl,
      color: colors.foreground,
      marginBottom: 8,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 12,
    },
    starsGroup: {
      flexDirection: 'row',
      gap: 2,
    },
    ratingNumber: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.sm,
      color: colors.foreground,
      marginLeft: 4,
    },
    reviewCountText: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.sm,
      color: colors.mutedForeground,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 10,
      marginBottom: 16,
    },
    currentPriceText: {
      fontFamily: FontFamily.black,
      fontSize: 32,
      color: colors.primary,
    },
    comparePriceText: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.lg,
      color: colors.mutedForeground,
      textDecorationLine: 'line-through',
    },

    // Section Titles
    sectionTitle: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.md,
      color: colors.foreground,
      marginTop: 16,
      marginBottom: 10,
    },

    // Selector Pills
    selectorRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 6,
    },
    sizePill: {
      minWidth: 44,
      height: 44,
      borderRadius: 16,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.muted,
    },
    activeSizePill: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 3,
    },
    sizePillText: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.sm,
      color: colors.foreground,
    },
    activeSizePillText: {
      color: Palette.white,
    },

    colorPill: {
      height: 44,
      borderRadius: 16,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.muted,
    },
    activeColorPill: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 3,
    },
    colorPillText: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.sm,
      color: colors.foreground,
    },
    activeColorPillText: {
      color: Palette.white,
    },

    // Description
    descriptionText: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.sm,
      color: colors.mutedForeground,
      lineHeight: 22,
    },

    // Review Button
    reviewButton: {
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: 18,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 20,
    },
    reviewButtonText: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.md,
      color: colors.primary,
    },

    // Bottom Bar
    bottomBarContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 24,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 10,
    },
    wishlistButton: {
      width: 52,
      height: 52,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: colors.destructive,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
    },
    addToCartButton: {
      flex: 1,
      height: 52,
      borderRadius: 16,
      backgroundColor: colors.primary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    addToCartText: {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.md,
      color: Palette.white,
    },

    // Loading & Error States
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
};
