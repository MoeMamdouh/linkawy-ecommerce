import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@shared/hooks/use-theme';
import { createCheckoutStyles } from '../styles/checkout.styles';
import { useCheckout } from '../hooks/useCheckout';
import {
  CheckoutHeader,
  AddressSection,
  PaymentMethodSection,
  CheckoutSummarySection,
  OrderSuccessView,
} from '../components';

export default function CheckoutScreen() {
  const { colors } = useTheme();
  const styles = createCheckoutStyles(colors);

  const {
    step,
    customer,
    orderNumber,
    deliveryDate,
    subtotal,
    total,
    items,
    handleGoBack,
    handleCheckoutSubmit,
    handleContinueShopping,
  } = useCheckout();

  if (step === 'checkout') {
    const customerName = customer
      ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
      : 'Sarah Connor';

    return (
      <View style={styles.container}>
        <CheckoutHeader title="Checkout" onBack={handleGoBack} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Delivery Address Section */}
          <AddressSection customerName={customerName} />

          {/* Payment Method Section */}
          <PaymentMethodSection />

          {/* Order Summary Section */}
          <CheckoutSummarySection
            items={items}
            subtotal={subtotal}
            total={total}
          />

          {/* Submit Button */}
          <View style={styles.ctaButtonContainer}>
            <TouchableOpacity
              style={styles.ctaButton}
              activeOpacity={0.8}
              onPress={handleCheckoutSubmit}
            >
              <Text style={styles.ctaButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Success Step
  return (
    <OrderSuccessView
      orderNumber={orderNumber}
      deliveryDate={deliveryDate}
      total={total}
      onContinueShopping={handleContinueShopping}
    />
  );
}
