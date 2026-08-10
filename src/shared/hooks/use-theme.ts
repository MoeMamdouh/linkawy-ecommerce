import { useColorScheme } from 'react-native';
import { Colors } from '@shared/constants/theme';

export function useTheme() {
  const colorScheme = useColorScheme();

  const scheme = colorScheme === 'dark' ? 'dark' : 'light';

  return {
    colors: Colors[scheme],
    isDark: scheme === 'dark',
    scheme,
  };
}