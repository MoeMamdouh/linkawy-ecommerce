import { Colors, FontFamily, Palette } from '@shared/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const SLIDER_WIDTH = SCREEN_WIDTH - 40; // 20px padding each side
export const SLIDER_HEIGHT = 160;

export const createPromoSliderStyles = (theme: keyof typeof Colors) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    slide: {
      width: SLIDER_WIDTH,
      height: SLIDER_HEIGHT,
      borderRadius: 18,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    },
    slideContent: {
      flex: 1,
      paddingLeft: 22,
      paddingVertical: 16,
      justifyContent: 'center',
      gap: 4,
    },
    tagBadge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 6,
      marginBottom: 4,
    },
    tagText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 9,
      color: Palette.white,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    titleText: {
      fontFamily: FontFamily.bold,
      fontSize: 22,
      color: colors.foreground,
      fontStyle: 'italic',
    },
    subtitleText: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: colors.mutedForeground,
    },
    slideImage: {
      width: SLIDER_WIDTH * 0.42,
      height: SLIDER_HEIGHT,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      gap: 6,
    },
    dot: {
      height: 6,
      borderRadius: 3,
    },
    activeDot: {
      width: 20,
      backgroundColor: colors.primary,
    },
    inactiveDot: {
      width: 6,
      backgroundColor: colors.mutedForeground,
      opacity: 0.3,
    },
  });
};
