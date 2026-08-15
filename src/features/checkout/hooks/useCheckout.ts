import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { apolloClient } from '@shared/graphql/client';
import { useCartStore, MailingAddressInput } from '@features/cart/store/cartStore';
import { GET_CART_QUERY } from '@features/cart/graphql';
import { useCustomerProfile } from '@features/customer/hooks/useCustomer';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { useCustomerAddresses } from '@features/profile/hooks/useCustomerAddresses';
import { useCustomerOrders } from '@features/profile/hooks/useCustomerOrders';
import { UserAddress } from '@features/profile/types/profile.types';

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

  // Customer Addresses & Orders Hooks
  const {
    addresses,
    loading: addressesLoading,
    refetch: refetchAddresses,
  } = useCustomerAddresses();
  const { refetch: refetchOrders } = useCustomerOrders();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isVerifyingOrder, setIsVerifyingOrder] = useState(false);

  // Protect route: redirect to login if guest
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // Set default selected address when addresses are loaded or updated
  useEffect(() => {
    if (addresses.length > 0) {
      if (!selectedAddressId || !addresses.some((a) => a.id === selectedAddressId)) {
        const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
        setSelectedAddressId(defaultAddr.id);
      }
    }
  }, [addresses, selectedAddressId]);

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0] || null;

  const syncAddressToCart = async (addr: UserAddress) => {
    if (isAuthenticated && token && cart?.id && addr) {
      const addressInput: MailingAddressInput = {
        address1: addr.address1,
        address2: addr.address2 || undefined,
        city: addr.city,
        province: addr.province || undefined,
        country: addr.country || 'US',
        zip: addr.zip || '',
        firstName: customer?.firstName || undefined,
        lastName: customer?.lastName || undefined,
        phone: addr.phone || customer?.phone || undefined,
      };

      try {
        await updateBuyerIdentity(
          token,
          customer?.email || undefined,
          addressInput,
          addr.id
        );
      } catch (e) {
        console.warn('Could not sync selected address to Shopify cart:', e);
      }
    }
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    const targetAddr = addresses.find((a) => a.id === id);
    if (targetAddr) {
      syncAddressToCart(targetAddr);
    }
  };

  const handleAddAddress = () => {
    router.push('/add-address');
  };

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

  const generateOrderDetails = (existingOrderNum?: string) => {
    if (existingOrderNum) {
      setOrderNumber(existingOrderNum);
    } else {
      const randomNum = Math.floor(Math.random() * 90000 + 10000);
      setOrderNumber(`ORD-${randomNum}`);
    }

    // Estimated delivery (current date + 3 days)
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    setDeliveryDate(date.toLocaleDateString('en-US', options));
  };

  const handleCheckoutSubmit = async () => {
    if (addresses.length === 0 || !selectedAddress) {
      Alert.alert(
        'Delivery Address Required',
        'Please add or select a delivery address before placing your order.',
        [
          { text: 'Add Address', onPress: handleAddAddress },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
      return;
    }

    if (cart?.checkoutUrl) {
      try {
        await syncAddressToCart(selectedAddress);

        const latestCart = useCartStore.getState().cart;
        const checkoutUrlToOpen = latestCart?.checkoutUrl || cart.checkoutUrl;

        // Open the Shopify secure checkout in WebBrowser
        await WebBrowser.openBrowserAsync(checkoutUrlToOpen);

        // Verify if the order was completed on Shopify
        setIsVerifyingOrder(true);

        const res = await apolloClient.query<any>({
          query: GET_CART_QUERY,
          variables: { id: cart.id },
          fetchPolicy: 'network-only',
        });

        const shopifyCart = res.data?.cart;
        const isCartCompleted =
          !shopifyCart ||
          !shopifyCart.lines?.edges ||
          shopifyCart.lines.edges.length === 0;

        if (isCartCompleted) {
          let actualOrderNum = '';
          try {
            const ordersRes = await refetchOrders();
            const newestOrder = ordersRes.data?.customer?.orders?.edges?.[0]?.node;
            if (newestOrder?.name || newestOrder?.orderNumber) {
              actualOrderNum = newestOrder.name || `#${newestOrder.orderNumber}`;
            }
          } catch (e) {
            console.log('Could not fetch latest order number:', e);
          }

          generateOrderDetails(actualOrderNum);
          await clearCart();
          setStep('success');
        } else {
          Alert.alert(
            'Checkout Incomplete',
            'Your order was not completed. Your items are still saved in your cart.'
          );
        }
      } catch (e: any) {
        console.error('Checkout submit error:', e);
        Alert.alert('Checkout Error', e?.message || 'Could not open the checkout page. Please try again.');
      } finally {
        setIsVerifyingOrder(false);
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
    addresses,
    selectedAddressId,
    addressesLoading,
    isVerifyingOrder,
    handleSelectAddress,
    handleAddAddress,
    handleGoBack,
    handleCheckoutSubmit,
    handleContinueShopping,
    refetchAddresses,
  };
}
