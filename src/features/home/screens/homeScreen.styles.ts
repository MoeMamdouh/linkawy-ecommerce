import { Colors, Palette } from '@shared/constants/theme';
import { StyleSheet } from 'react-native';

export const createHomeScreenStyles = (theme: keyof typeof Colors) => {
  const colors = Colors[theme];

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
