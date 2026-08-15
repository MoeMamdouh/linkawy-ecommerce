import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useTheme } from '@shared/hooks/use-theme';
import { createCheckoutStyles } from '../styles/checkout.styles';

interface OrderSuccessViewProps {
  orderNumber: string;
  deliveryDate: string;
  total: number;
  onTrackOrder: () => void;
  onContinueShopping: () => void;
}

export function OrderSuccessView({
  orderNumber,
  deliveryDate,
  total,
  onTrackOrder,
  onContinueShopping,
}: OrderSuccessViewProps) {
  const { colors } = useTheme();
  const styles = createCheckoutStyles(colors);

  const handleTrackOrder = () => {
    onTrackOrder();
  };

  return (
    <View style={styles.successContainer}>
      <View style={styles.successIconCircle}>
        <CheckCircle size={52} color="#10B981" />
      </View>

      <Text style={styles.successTitle}>Order Placed!</Text>
      <Text style={styles.successMessage}>
        Your order has been confirmed and is being prepared. Thank you for shopping with us!
      </Text>

      <View style={styles.successDetailsCard}>
        <View style={styles.successDetailsRow}>
          <Text style={styles.successDetailsLabel}>Order Number</Text>
          <Text style={styles.successDetailsValue}>{orderNumber}</Text>
        </View>

        <View style={styles.successDetailsRow}>
          <Text style={styles.successDetailsLabel}>Estimated Delivery</Text>
          <Text style={styles.successDetailsValue}>{deliveryDate}</Text>
        </View>

        <View style={styles.successDetailsRow}>
          <Text style={styles.successDetailsLabel}>Total Amount</Text>
          <Text style={[styles.successDetailsValue, { color: colors.primary }]}>
            ${total}
          </Text>
        </View>
      </View>

      <View style={styles.successActions}>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.8}
          onPress={handleTrackOrder}
        >
          <Text style={styles.ctaButtonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          activeOpacity={0.8}
          onPress={onContinueShopping}
        >
          <Text style={styles.outlineButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
