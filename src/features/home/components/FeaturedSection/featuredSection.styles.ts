import { Colors } from '@shared/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 52) / 2;

export const createFeaturedSectionStyles = (_theme: keyof typeof Colors) => {
  return StyleSheet.create({
    gridContainer: {
      paddingHorizontal: 20,
    },
    columnWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    emptyCard: {
      width: CARD_WIDTH,
    },
  });
};
