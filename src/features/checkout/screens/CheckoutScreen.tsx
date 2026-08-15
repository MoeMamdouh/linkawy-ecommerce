import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@shared/hooks/use-theme';
import { createCheckoutStyles } from '../styles/checkout.styles';
import { useCheckout } from '../hooks/useCheckout';
import { ErrorModal } from '@shared/components/ui/error-modal';
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
    addresses,
    selectedAddressId,
    addressesLoading,
    isVerifyingOrder,
    errorModalVisible,
    errorModalTitle,
    errorModalMessage,
    handleSelectAddress,
    handleAddAddress,
    handleGoBack,
    handleCheckoutSubmit,
    handleContinueShopping,
    closeErrorModal,
  } = useCheckout();

  if (step === 'checkout') {
    const customerName = customer
      ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
      : 'Customer';

    return (
      <View style={styles.container}>
        <CheckoutHeader title="Checkout" onBack={handleGoBack} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Delivery Address Section */}
          <AddressSection
            customerName={customerName}
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={handleSelectAddress}
            onAddAddress={handleAddAddress}
            loading={addressesLoading}
          />

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
              style={[styles.ctaButton, isVerifyingOrder && { opacity: 0.8 }]}
              activeOpacity={0.8}
              onPress={handleCheckoutSubmit}
              disabled={isVerifyingOrder}
            >
              {isVerifyingOrder ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.ctaButtonText}>Place Order</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        <ErrorModal
          visible={errorModalVisible}
          title={errorModalTitle}
          message={errorModalMessage}
          onClose={closeErrorModal}
        />
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
