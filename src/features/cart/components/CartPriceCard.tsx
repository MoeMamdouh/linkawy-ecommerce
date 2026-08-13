import { Palette } from '@shared/constants/theme';
import { useTheme } from '@shared/hooks/use-theme';
import { useTranslation } from "react-i18next";
import { Text, View } from 'react-native';
import { AppliedPromo } from '../hooks/useCart';
import { styles } from '../styles/cart-screen.styles';
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
const { t } = useTranslation();
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
        <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>{t('cart.subtotal')}</Text>
        <Text style={[styles.summaryValue, { color: colors.foreground }]}>
          ${subtotal.toFixed(2)}
        </Text>
      </View>

      {/* Discount Row */}
      {discountAmount > 0 ? (
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: Palette.green500 }]}>
            {t('cart.discount')} ({appliedPromo?.code ?? 'PROMO'})
          </Text>
          <Text style={[styles.summaryValue, { color: Palette.green500 }]}>
            -${discountAmount.toFixed(2)}
          </Text>
        </View>
      ) : null}

      {/* Shipping Row */}
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>{t('cart.shipping')}</Text>
        <Text style={[styles.shippingFreeText, { color: Palette.green500 }]}>{t('cart.shippingFree')}</Text>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Total Row */}
      <View style={styles.summaryRow}>
        <Text style={[styles.totalLabel, { color: colors.foreground }]}>{t('cart.total')}</Text>
        <Text style={[styles.totalValue, { color: colors.primary }]}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}
