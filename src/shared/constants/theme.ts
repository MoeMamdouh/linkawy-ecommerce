import { Platform } from 'react-native';

export const Palette = {
  purple: '#6D28D9',
  purpleLight: '#F5F3FF',
  borderPurple: '#EDE5FA',
  darkNavy: '#130F2A',
  mutedText: '#6B6880',
  placeholderText: '#999999',
  screenBg: '#F8F8FA',
  surfaceLight: '#EDEDF5',
  surfaceAlt: '#FBFBFF',
  white: '#FFFFFF',
  danger: '#FB2C36',
  favoriteInactive: '#99A1AF',
  skeleton: '#E5E3E1',
};

export const Colors = {
  light: {
    text: Palette.darkNavy,
    textSecondary: Palette.mutedText,
    textMuted: Palette.placeholderText,
    background: Palette.screenBg,
    cardBackground: Palette.white,
    cardAlt: Palette.surfaceAlt,
    border: Palette.borderPurple,
    tint: Palette.purple,
    primary: Palette.purple,
    primaryLight: Palette.purpleLight,
    inputBackground: Palette.surfaceLight,
    buttonBackground: Palette.surfaceLight,
    icon: Palette.mutedText,
    tabIconDefault: Palette.mutedText,
    tabIconSelected: Palette.purple,
    danger: Palette.danger,
    favoriteActive: Palette.danger,
    favoriteInactive: Palette.favoriteInactive,
    skeleton: Palette.skeleton,
    white: Palette.white,
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    textMuted: '#687076',
    background: '#151718',
    cardBackground: '#1E2022',
    cardAlt: '#25282A',
    border: '#2E3235',
    tint: Palette.purple,
    primary: Palette.purple,
    primaryLight: '#2E1A47',
    inputBackground: '#2E3235',
    buttonBackground: '#2E3235',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: Palette.purple,
    danger: Palette.danger,
    favoriteActive: Palette.danger,
    favoriteInactive: '#687076',
    skeleton: '#2E3235',
    white: Palette.white,
  },
};

export const FontFamily = {
  regular: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  semiBold: 'Outfit_600SemiBold',
  bold: 'Outfit_700Bold',
  black: 'Outfit_900Black',
};

export const Fonts = Platform.select({
  ios: {
    sans: FontFamily.regular,
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: FontFamily.regular,
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: `${FontFamily.regular}, system-ui, -apple-system, Roboto, sans-serif`,
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
