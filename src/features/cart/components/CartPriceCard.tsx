import React from 'react';
import { View, Text } from 'react-native';
import { Colors, Palette } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { styles } from '../styles/cart-screen.styles';

interface CartPriceCardProps {
  subtotal: number;
  total: number;
}

export function CartPriceCard({ subtotal, total }: CartPriceCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      style={[
        styles.summaryCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Subtotal Row */}
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Subtotal</Text>
        <Text style={[styles.summaryValue, { color: colors.foreground }]}>${subtotal}</Text>
      </View>

      {/* Shipping Row */}
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Shipping</Text>
        <Text style={[styles.shippingFreeText, { color: Palette.green500 }]}>Free</Text>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Total Row */}
      <View style={styles.summaryRow}>
        <Text style={[styles.totalLabel, { color: colors.foreground }]}>Total</Text>
        <Text style={[styles.totalValue, { color: colors.primary }]}>${total}</Text>
      </View>
    </View>
  );
}
