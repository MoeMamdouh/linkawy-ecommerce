import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '@shared/hooks/use-theme';
import { createCheckoutStyles } from '../styles/checkout.styles';

interface CheckoutHeaderProps {
  title: string;
  onBack: () => void;
}

export function CheckoutHeader({ title, onBack }: CheckoutHeaderProps) {
  const { colors } = useTheme();
  const styles = createCheckoutStyles(colors);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.7}
        onPress={onBack}
      >
        <ChevronLeft size={20} color={colors.foreground} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}
