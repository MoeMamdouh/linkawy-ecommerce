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
  
  const cartItems = cart?.lines || [];

  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Initialize cart when hook is used
  useEffect(() => {
    initializeCart();
  }, []);

  // Total count of all items
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal, Discount & Total from Shopify + local promo code
  const subtotal = cart?.subtotal || 0;
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const total = Math.max(0, subtotal - discountAmount);

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

  const handleApplyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setPromoError('Please enter a promo code');
      return false;
    }

    // Support standard codes like PROMO20, LINKAWY, SALE10, or custom entries
    let discount = 15;
    if (trimmed === 'PROMO20' || trimmed === 'LINKAWY') {
      discount = 20;
    } else if (trimmed.includes('10')) {
      discount = 10;
    } else if (trimmed.includes('50')) {
      discount = 50;
    }

    setAppliedPromo({ code: trimmed, discountPercent: discount });
    setPromoError(null);
    return true;
  };

  const handleRemovePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError(null);
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
