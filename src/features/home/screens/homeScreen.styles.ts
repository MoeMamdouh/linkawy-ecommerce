import { Colors } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createHomeScreenStyles = (colors: typeof Colors.light | typeof Colors.dark) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },


  });
};
