import { View, Text } from 'react-native';
import { Palette } from '@shared/constants/theme';
import { AppliedPromo } from '../hooks/useCart';
import { styles } from '../styles/cart-screen.styles';
import { useTheme } from '@shared/hooks/use-theme';

interface CartPriceCardProps {
  subtotal: number;
  discountAmount?: number;
  appliedPromo?: AppliedPromo | null;
  total: number;
}

export function CartPriceCard({
  subtotal,
  discountAmount = 0,
  appliedPromo,
  total,
}: CartPriceCardProps) {
  const { colors } = useTheme();

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
        <Text style={[styles.summaryValue, { color: colors.foreground }]}>
          ${subtotal.toFixed(2)}
        </Text>
      </View>

      {/* Discount Row */}
      {discountAmount > 0 ? (
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: Palette.green500 }]}>
            Discount ({appliedPromo?.code ?? 'PROMO'})
          </Text>
          <Text style={[styles.summaryValue, { color: Palette.green500 }]}>
            -${discountAmount.toFixed(2)}
          </Text>
        </View>
      ) : null}

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
        <Text style={[styles.totalValue, { color: colors.primary }]}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}
