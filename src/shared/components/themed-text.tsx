import { StyleSheet, Text, type TextProps } from 'react-native';

import { FontFamily, FontSize } from '@shared/constants/theme';
import { useThemeColor } from '@shared/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const linkColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');

  const color = type === 'link' ? linkColor : textColor;

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  title: {
    fontFamily: FontFamily.black,
    fontSize: FontSize.title,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xl,
  },
  link: {
    fontFamily: FontFamily.medium,
    lineHeight: 30,
    fontSize: FontSize.md,
  },
});
