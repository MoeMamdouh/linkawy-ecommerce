import { Button } from '@shared/components/ui/button';
import { FontFamily, FontSize } from '@shared/constants/theme';
import { useTheme } from '@shared/hooks/use-theme';
import { ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from 'react-native';
import { CartHeader } from '../components/CartHeader';
import { CartItemCard } from '../components/CartItemCard';
import { CartPriceCard } from '../components/CartPriceCard';
import { CartPromoInput } from '../components/CartPromoInput';
import { useCart } from '../hooks/useCart';
import { styles } from '../styles/cart-screen.styles';
export default function CartScreen() {
  const { colors } = useTheme();
const { t } = useTranslation();

  const {
    cartItems,
    totalItemCount,
    subtotal,
    discountAmount,
    total,
    promoCode,
    setPromoCode,
    appliedPromo,
    promoError,
    handleUpdateQuantity,
    handleRemoveItem,
    handleApplyPromoCode,
    handleRemovePromoCode,
  } = useCart();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <CartHeader totalItemCount={totalItemCount} />

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconCircle, { backgroundColor: colors.muted }]}>
            <ShoppingCart size={40} color={colors.mutedForeground} />
          </View>
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
            Your cart is empty
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Cart Item Cards */}
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}

            {/* Separated Promo Code Input & Shared Apply Button */}
            <CartPromoInput
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              appliedPromo={appliedPromo}
              promoError={promoError}
              onApply={handleApplyPromoCode}
              onRemove={handleRemovePromoCode}
            />

            {/* Price Summary Box */}
            <CartPriceCard
              subtotal={subtotal}
              discountAmount={discountAmount}
              appliedPromo={appliedPromo}
              total={total}
            />

            {/* Checkout Action Button placed right below Price Summary Card */}
            <View style={styles.checkoutContainer}>
              <Button
                variant="default"
                size="lg"
                textStyle={{
                  fontFamily: FontFamily.black,
                  fontSize: FontSize.md,
                }}
              >
                {t("cart.Checkout")}
              </Button>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}