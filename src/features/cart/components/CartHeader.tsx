import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { styles } from '../styles/cart-screen.styles';

interface CartHeaderProps {
  totalItemCount: number;
}

export function CartHeader({ totalItemCount }: CartHeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { backgroundColor: colors.card, paddingTop: insets.top + 16 }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>My Cart</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        {totalItemCount} items
      </Text>
    </View>
  );
}
