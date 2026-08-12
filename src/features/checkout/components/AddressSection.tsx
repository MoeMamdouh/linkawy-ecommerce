import React from 'react';
import { View, Text } from 'react-native';
import { MapPin, Check } from 'lucide-react-native';
import { useTheme } from '@shared/hooks/use-theme';
import { createCheckoutStyles } from '../styles/checkout.styles';

interface AddressSectionProps {
  customerName: string;
}

export function AddressSection({ customerName }: AddressSectionProps) {
  const { colors } = useTheme();
  const styles = createCheckoutStyles(colors);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MapPin size={18} color={colors.primary} />
        <Text style={styles.sectionTitle}>Delivery Address</Text>
      </View>
      <View style={styles.addressCard}>
        <View style={styles.addressInfo}>
          <Text style={styles.addressName}>{customerName}</Text>
          <Text style={styles.addressText}>
            123 Main St, Apt 4B{"\n"}New York, NY 10001
          </Text>
        </View>
        <Check size={18} color={colors.primary} />
      </View>
    </View>
  );
}
