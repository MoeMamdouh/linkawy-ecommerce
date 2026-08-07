import { Platform } from 'react-native';

/**
 * Primitive Color Palette
 * Centralized raw color values extracted from Figma design system.
 * Use these primitives to build or extend theme tokens.
 */
export const Palette = {
  // Purples & Primaries
  purple700: '#6D28D9',
  purple600: '#7C3AED',
  purple500: '#8B5CF6',
  purple400: '#C4B5FD',
  purple300: '#DDD6FE',
  purple100: '#EDE9FE',
  purple50: '#F5F3FF',
  purpleDark: '#2D2650',
  purpleDarker: '#4C1D95',
  purpleBorderLight: 'rgba(109, 40, 217, 0.12)',
  purpleBorderDark: 'rgba(139, 92, 246, 0.18)',

  // Backgrounds & Surfaces
  bgLight: '#F4F2FF',
  bgDark: '#0F0D1C',
  surfaceLight: '#EDEDF5',
  surfaceDark: '#252238',
  surfaceAltLight: '#FBFBFF',
  cardLight: '#FFFFFF',
  cardDark: '#1C1930',

  // Text & Foregrounds
  textLight: '#130F2A',
  textDark: '#F0EEFF',
  mutedTextLight: '#6B6880',
  mutedTextDark: '#9B97B2',
  placeholderLight: '#999999',
  placeholderDark: '#687076',

  // Accents & Warnings
  amber500: '#F59E0B',
  amber900: '#1C1100',

  // Status & Charts
  red600: '#DC2626',
  red500: '#EF4444',
  green500: '#10B981',
  blue500: '#3B82F6',
  blue400: '#60A5FA',
  pink500: '#EC4899',
  pink400: '#F472B6',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  favoriteInactiveLight: '#99A1AF',
  skeletonLight: '#E5E3E1',
  skeletonDark: '#252238',
};

/**
 * Semantic Theme Colors Map (Light & Dark)
 * Generalized theme tokens mapped directly from Figma for easy global editing.
 */
export const Colors = {
  light: {
    // Figma Base Tokens
    background: Palette.bgLight,
    foreground: Palette.textLight,
    card: Palette.cardLight,
    cardForeground: Palette.textLight,
    popover: Palette.cardLight,
    popoverForeground: Palette.textLight,
    primary: Palette.purple700,
    primaryForeground: Palette.white,
    secondary: Palette.purple100,
    secondaryForeground: Palette.purpleDarker,
    muted: Palette.surfaceLight,
    mutedForeground: Palette.mutedTextLight,
    accent: Palette.amber500,
    accentForeground: Palette.amber900,
    destructive: Palette.red600,
    destructiveForeground: Palette.white,
    border: Palette.purpleBorderLight,
    input: 'transparent',
    inputBackground: Palette.surfaceLight,
    switchBackground: Palette.purple400,
    ring: Palette.purple600,

    // Charts
    chart1: Palette.purple600,
    chart2: Palette.amber500,
    chart3: Palette.green500,
    chart4: Palette.blue500,
    chart5: Palette.pink500,

    // Sidebar
    sidebar: Palette.purple100,
    sidebarForeground: Palette.textLight,
    sidebarPrimary: Palette.purple700,
    sidebarPrimaryForeground: Palette.white,
    sidebarAccent: Palette.purple300,
    sidebarAccentForeground: Palette.purpleDarker,
    sidebarBorder: Palette.purpleBorderLight,
    sidebarRing: Palette.purple600,

    // App Navigation & Backward Compatibility Shortcuts
    text: Palette.textLight,
    textSecondary: Palette.mutedTextLight,
    textMuted: Palette.placeholderLight,
    cardBackground: Palette.cardLight,
    cardAlt: Palette.surfaceAltLight,
    tint: Palette.purple700,
    primaryLight: Palette.purple100,
    buttonBackground: Palette.purple100,
    icon: Palette.mutedTextLight,
    tabIconDefault: Palette.mutedTextLight,
    tabIconSelected: Palette.purple700,
    danger: Palette.red600,
    favoriteActive: Palette.red600,
    favoriteInactive: Palette.favoriteInactiveLight,
    skeleton: Palette.skeletonLight,
    white: Palette.white,
  },
  dark: {
    // Figma Base Tokens
    background: Palette.bgDark,
    foreground: Palette.textDark,
    card: Palette.cardDark,
    cardForeground: Palette.textDark,
    popover: Palette.cardDark,
    popoverForeground: Palette.textDark,
    primary: Palette.purple500,
    primaryForeground: Palette.white,
    secondary: Palette.purpleDark,
    secondaryForeground: Palette.purple400,
    muted: Palette.surfaceDark,
    mutedForeground: Palette.mutedTextDark,
    accent: Palette.amber500,
    accentForeground: Palette.amber900,
    destructive: Palette.red500,
    destructiveForeground: Palette.white,
    border: Palette.purpleBorderDark,
    input: Palette.surfaceDark,
    inputBackground: Palette.surfaceDark,
    switchBackground: Palette.purpleDarker,
    ring: Palette.purple500,

    // Charts
    chart1: Palette.purple500,
    chart2: Palette.amber500,
    chart3: Palette.green500,
    chart4: Palette.blue400,
    chart5: Palette.pink400,

    // Sidebar
    sidebar: Palette.cardDark,
    sidebarForeground: Palette.textDark,
    sidebarPrimary: Palette.purple500,
    sidebarPrimaryForeground: Palette.white,
    sidebarAccent: Palette.purpleDark,
    sidebarAccentForeground: Palette.purple400,
    sidebarBorder: Palette.purpleBorderDark,
    sidebarRing: Palette.purple500,

    // App Navigation & Backward Compatibility Shortcuts
    text: Palette.textDark,
    textSecondary: Palette.mutedTextDark,
    textMuted: Palette.placeholderDark,
    cardBackground: Palette.cardDark,
    cardAlt: Palette.cardDark,
    tint: Palette.purple500,
    primaryLight: Palette.purpleDark,
    buttonBackground: Palette.purpleDark,
    icon: Palette.mutedTextDark,
    tabIconDefault: Palette.mutedTextDark,
    tabIconSelected: Palette.purple500,
    danger: Palette.red500,
    favoriteActive: Palette.red500,
    favoriteInactive: Palette.placeholderDark,
    skeleton: Palette.skeletonDark,
    white: Palette.white,
  },
};

export type ThemeMode = keyof typeof Colors;
export type ThemeColors = typeof Colors.light;
export type ColorToken = keyof ThemeColors;

export const FontFamily = {
  regular: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  semiBold: 'Outfit_600SemiBold',
  bold: 'Outfit_700Bold',
  black: 'Outfit_900Black',
};

export const FontSize = {
  xs: 12,    // Extra small (captions, tags, sub-labels)
  sm: 14,    // Small (subtitles, summary labels, card product names)
  md: 16,    // Medium / Default body text & prices
  lg: 18,    // Large subheaders
  xl: 20,    // Extra large (headers, total prices)
  xxl: 24,   // Screen titles
  title: 32, // Primary splash / hero titles
} as const;

export type FontSizeToken = keyof typeof FontSize;

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

