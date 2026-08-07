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

  // Total count of all items, counting each unit even if same product
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal & Total
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

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

  return {
    cartItems,
    totalItemCount,
    subtotal,
    total,
    handleUpdateQuantity,
    handleRemoveItem,
  };
}
