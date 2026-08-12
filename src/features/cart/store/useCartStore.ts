import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartState {
  cartId: string | null;
  checkoutUrl: string | null;
  totalQuantity: number;
  
  setCart: (cartId: string, checkoutUrl: string, totalQuantity?: number) => void;
  updateTotalQuantity: (totalQuantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      checkoutUrl: null,
      totalQuantity: 0,

      // Sets or updates active cart details
      setCart: (cartId: string, checkoutUrl: string, totalQuantity: number = 0) =>
        set({ cartId, checkoutUrl, totalQuantity }),

      // Updates badge counter on the cart tab
      updateTotalQuantity: (totalQuantity: number) =>
        set({ totalQuantity }),

      // Resets store upon checkout completion or manual reset
      clearCart: () =>
        set({ cartId: null, checkoutUrl: null, totalQuantity: 0 }),
    }),
    {
      name: 'shopify_cart_storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);