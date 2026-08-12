import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCartStore, MailingAddressInput } from '@features/cart/store/cartStore';
import { useCustomerProfile } from '@features/customer/hooks/useCustomer';
import { useAuthStore } from '@features/auth/store/useAuthStore';

export type CheckoutStep = 'checkout' | 'success';
export type PaymentMethod = 'cod';

export function useCheckout() {
  const router = useRouter();

  // Auth State
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Cart Store State
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateBuyerIdentity = useCartStore((state) => state.updateBuyerIdentity);

  // Customer Profile Hook
  const { data: customerData } = useCustomerProfile();
  const customer = customerData?.customer;

  // Protect route: redirect to login if guest
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // Link Cart to Customer Buyer Identity on Shopify
  useEffect(() => {
    if (isAuthenticated && token && customer?.email) {
      const addressInput: MailingAddressInput = {
        address1: '123 Main St',
        address2: 'Apt 4B',
        city: 'New York',
        province: 'NY',
        country: 'US',
        zip: '10001',
        firstName: customer.firstName || 'Sarah',
        lastName: customer.lastName || 'Connor',
        phone: customer.phone || undefined,
      };

      updateBuyerIdentity(token, customer.email, addressInput).catch((e) => {
        console.warn("Could not associate buyer identity to Shopify cart:", e);
      });
    }
  }, [isAuthenticated, token, customer, updateBuyerIdentity]);

  // Checkout Step & Selection States
  const [step, setStep] = useState<CheckoutStep>('checkout');
  const [payMethod] = useState<PaymentMethod>('cod');

  // Generated Order Details (upon placement)
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Order Summary Calculation
  const subtotal = cart?.subtotal || 0;
  const total = cart?.total || 0;
  const items = cart?.lines || [];

  // Step Navigations / Actions
  const handleGoBack = () => {
    router.back();
  };

  const generateOrderDetails = () => {
    const randomNum = Math.floor(Math.random() * 90000 + 10000);
    setOrderNumber(`ORD-${randomNum}`);

    // Estimated delivery (current date + 3 days)
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    setDeliveryDate(date.toLocaleDateString('en-US', options));
  };

  const handleCheckoutSubmit = async () => {
    if (cart?.checkoutUrl) {
      try {
        // Open the Shopify secure checkout in WebBrowser
        await WebBrowser.openBrowserAsync(cart.checkoutUrl);

        // Return to app after completing/closing checkout
        generateOrderDetails();
        await clearCart();
        setStep('success');
      } catch (e) {
        Alert.alert('Checkout Error', 'Could not open the checkout page. Please try again.');
      }
    } else {
      Alert.alert('Checkout Error', 'Cart checkout URL is not available.');
    }
  };

  const handleContinueShopping = () => {
    router.dismissAll();
    router.replace('/(tabs)');
  };

  return {
    step,
    setStep,
    payMethod,
    customer,
    orderNumber,
    deliveryDate,
    subtotal,
    total,
    items,
    handleGoBack,
    handleCheckoutSubmit,
    handleContinueShopping,
  };
}
