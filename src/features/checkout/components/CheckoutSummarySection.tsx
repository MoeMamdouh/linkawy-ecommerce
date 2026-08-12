import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@shared/hooks/use-theme';
import { createCheckoutStyles } from '../styles/checkout.styles';

interface CheckoutSummarySectionProps {
  items: any[];
  subtotal: number;
  total: number;
}

export function CheckoutSummarySection({ items, subtotal, total }: CheckoutSummarySectionProps) {
  const { colors } = useTheme();
  const styles = createCheckoutStyles(colors);

  return (
    <View style={styles.section}>
      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        
        {items.map((item) => (
          <View key={item.id} style={styles.summaryItemRow}>
            <Text style={styles.summaryItemName} numberOfLines={1}>
              {item.name} ×{item.quantity}
            </Text>
            <Text style={styles.summaryItemPrice}>
              ${item.price * item.quantity}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.summaryItemRow}>
          <Text style={styles.summaryItemName}>Subtotal</Text>
          <Text style={styles.summaryItemPrice}>${subtotal}</Text>
        </View>

        <View style={styles.summaryItemRow}>
          <Text style={styles.summaryItemName}>Shipping</Text>
          <Text style={[styles.summaryItemPrice, { color: colors.primary }]}>Free</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total}</Text>
        </View>
      </View>
    </View>
  );
}
