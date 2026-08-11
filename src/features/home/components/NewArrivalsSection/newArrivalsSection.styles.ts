// ──────────────────────────────────────────────
// NewArrivalsSection — Styles
// ──────────────────────────────────────────────

import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@shared/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 52) / 2;

export const createNewArrivalsSectionStyles = (colors: typeof Colors.light | typeof Colors.dark) => {
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
