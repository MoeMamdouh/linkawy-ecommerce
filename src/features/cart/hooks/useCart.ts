import { useState, useEffect } from 'react';
import { useCartStore, CartItem } from '../store/cartStore';

export interface AppliedPromo {
  code: string;
  discountPercent: number;
}

export function useCart() {
  const cart = useCartStore((state) => state.cart);
  const initializeCart = useCartStore((state) => state.initializeCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateDiscountCodes = useCartStore((state) => state.updateDiscountCodes);

  const cartItems = cart?.lines || [];

  const [promoCode, setPromoCode] = useState<string>('');
  const [promoError, setPromoError] = useState<string | null>(null);

  // Initialize cart when hook is used
  useEffect(() => {
    initializeCart();
  }, []);

  // Total count of all items
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal, Discount & Total from Shopify
  const subtotal = cart?.subtotal || 0;
  const total = cart?.total || 0;
  const discountAmount = Math.max(0, subtotal - total);

  // Derived state: first applicable discount code from Shopify cart
  const activeDiscountCode = cart?.discountCodes?.find((dc) => dc.applicable);
  const appliedPromo = activeDiscountCode
    ? {
      code: activeDiscountCode.code,
      discountPercent: subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0,
    }
    : null;

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQty);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleApplyPromoCode = async (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setPromoError('Please enter a promo code');
      return false;
    }

    try {
      setPromoError(null);
      const updatedCart = await updateDiscountCodes([trimmed]);

      // Check if the code exists and is applicable in the updated cart
      const discountObj = updatedCart?.discountCodes?.find(
        (dc) => dc.code.toUpperCase() === trimmed
      );

      if (!discountObj || !discountObj.applicable) {
        setPromoError('The promo code is invalid or not applicable');
        // Clean up the invalid promo code from Shopify so it's not saved on the cart
        await updateDiscountCodes([]);
        return false;
      }

      setPromoError(null);
      return true;
    } catch (err: any) {
      setPromoError(err.message || 'Failed to apply promo code');
      return false;
    }
  };

  const handleRemovePromoCode = async () => {
    try {
      setPromoError(null);
      await updateDiscountCodes([]);
      setPromoCode('');
    } catch (err: any) {
      setPromoError('Failed to remove promo code');
    }
  };

  return {
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
  };
}
export type { CartItem };
