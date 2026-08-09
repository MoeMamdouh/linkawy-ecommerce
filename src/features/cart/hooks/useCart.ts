import { useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export interface AppliedPromo {
  code: string;
  discountPercent: number;
}

const INITIAL_CART: CartItem[] = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High',
    size: 'M',
    color: 'Navy',
    price: 149,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&auto=format',
  },
  {
    id: '2',
    name: 'Premium Smart Watch',
    size: '44mm',
    color: 'Space Gray',
    price: 299,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&auto=format',
  },
];

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Total count of all items
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal, Discount & Total
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
