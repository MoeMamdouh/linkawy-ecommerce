import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { Colors, FontFamily, FontSize } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { Button } from '@shared/components/ui/button';
import { useCart } from '../hooks/useCart';
import { styles } from '../styles/cart-screen.styles';
import { CartHeader } from '../components/CartHeader';
import { CartItemCard } from '../components/CartItemCard';
import { CartPriceCard } from '../components/CartPriceCard';
import { CartPromoInput } from '../components/CartPromoInput';

export default function CartScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];


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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <CartHeader totalItemCount={totalItemCount} />

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconCircle, { backgroundColor: theme.muted }]}>
            <ShoppingCart size={40} color={theme.mutedForeground} />
          </View>
          <Text style={[styles.emptyText, { color: theme.mutedForeground }]}>
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
                Checkout
              </Button>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}