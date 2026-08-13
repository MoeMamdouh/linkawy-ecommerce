import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistState {
  items: string[];
  userId: string | null;
  isLoading: boolean;
  initializeWishlist: (userId: string | null) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  mergeGuestWishlist: (userId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
}

const getStorageKey = (userId: string | null) => {
  return userId ? `@linkawy_wishlist_${userId}` : `@linkawy_wishlist_guest`;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  userId: null,
  isLoading: false,

  initializeWishlist: async (userId: string | null) => {
    set({ userId, isLoading: true });
    try {
      const key = getStorageKey(userId);
      const stored = await AsyncStorage.getItem(key);
      const items = stored ? JSON.parse(stored) : [];
      set({ items, isLoading: false });
    } catch (error) {
      console.warn('Failed to load wishlist:', error);
      set({ items: [], isLoading: false });
    }
  },

  toggleWishlist: async (productId: string) => {
    const { items, userId } = get();
    const exists = items.includes(productId);
    const updatedItems = exists
      ? items.filter((id) => id !== productId)
      : [...items, productId];

    set({ items: updatedItems });

    try {
      const key = getStorageKey(userId);
      await AsyncStorage.setItem(key, JSON.stringify(updatedItems));
    } catch (error) {
      console.warn('Failed to save wishlist:', error);
    }
  },

  isInWishlist: (productId: string) => {
    return get().items.includes(productId);
  },

  mergeGuestWishlist: async (userId: string) => {
    try {
      const guestKey = getStorageKey(null);
      const guestStored = await AsyncStorage.getItem(guestKey);
      const guestItems: string[] = guestStored ? JSON.parse(guestStored) : [];

      if (guestItems.length > 0) {
        const userKey = getStorageKey(userId);
        const userStored = await AsyncStorage.getItem(userKey);
        const userItems: string[] = userStored ? JSON.parse(userStored) : [];

        // Combine items ensuring uniqueness
        const combined = Array.from(new Set([...userItems, ...guestItems]));

        await AsyncStorage.setItem(userKey, JSON.stringify(combined));
        await AsyncStorage.removeItem(guestKey);

        // If currently initialized with this user, update active state
        if (get().userId === userId) {
          set({ items: combined });
        }
      }
    } catch (error) {
      console.warn('Failed to merge guest wishlist:', error);
    }
  },

  clearWishlist: async () => {
    const { userId } = get();
    const key = getStorageKey(userId);
    set({ items: [] });
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear wishlist:', error);
    }
  },
}));