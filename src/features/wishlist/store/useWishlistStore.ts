import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistState {
  items: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (productId: string) => {
        const { items } = get();
        const exists = items.includes(productId);

        if (exists) {
          set({ items: items.filter((id) => id !== productId) });
        } else {
          set({ items: [...items, productId] });
        }
      },

      isInWishlist: (productId: string) => {
        return get().items.includes(productId);
      },
    }),
    {
      name: 'user_wishlist_storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);