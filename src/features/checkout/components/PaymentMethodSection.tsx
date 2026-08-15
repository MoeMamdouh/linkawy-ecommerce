import React from 'react';
import { View, Text } from 'react-native';
import { CreditCard, CheckCircle } from 'lucide-react-native';
import { useTheme } from '@shared/hooks/use-theme';
import { createCheckoutStyles } from '../styles/checkout.styles';

export function PaymentMethodSection() {
  const { colors } = useTheme();
  const styles = createCheckoutStyles(colors);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <CreditCard size={18} color={colors.primary} />
        <Text style={styles.sectionTitle}>Payment Method</Text>
      </View>
      <View style={styles.paymentMethodsList}>
        <View
          style={[
            styles.paymentMethodCard,
            styles.paymentMethodCardActive,
          ]}
        >
          <Text style={styles.paymentMethodEmoji}>💵</Text>
          <Text
            style={[
              styles.paymentMethodText,
              styles.paymentMethodTextActive,
            ]}
          >
            Cash on Delivery
          </Text>
          <CheckCircle size={18} color={colors.primary} />
        </View>
      </View>
    </View>
  );
}
