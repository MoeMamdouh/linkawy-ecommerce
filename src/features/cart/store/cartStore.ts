import { apolloClient } from '@shared/graphql/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  ADD_TO_CART_MUTATION,
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION,
  UPDATE_DISCOUNT_CODES_MUTATION,
  CART_BUYER_IDENTITY_UPDATE_MUTATION,
} from '../graphql';

const CART_ID_STORAGE_KEY = '@linkawy_cart_id';

export interface CartItem {
  id: string; // Line ID (Shopify CartLine ID)
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  variantId: string;
}

export interface FormattedCart {
  id: string;
  checkoutUrl: string;
  subtotal: number;
  total: number;
  lines: CartItem[];
  discountCodes?: { code: string; applicable: boolean }[];
}

export interface MailingAddressInput {
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface CartState {
  cartId: string | null;
  cart: FormattedCart | null;
  isLoading: boolean;
  error: string | null;
}

interface CartActions {
  initializeCart: () => Promise<void>;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  updateDiscountCodes: (codes: string[]) => Promise<FormattedCart | null>;
  updateBuyerIdentity: (customerAccessToken: string, email?: string, address?: MailingAddressInput) => Promise<void>;
}

export type CartStore = CartState & CartActions;

const mapShopifyCart = (shopifyCart: any): FormattedCart | null => {
  if (!shopifyCart) return null;

  const lines = (shopifyCart.lines?.edges || []).map((edge: any) => {
    const node = edge.node || {};
    const merch = node.merchandise || {};
    const prod = merch.product || {};

    const sizeOpt = merch.selectedOptions?.find(
      (opt: any) => opt.name.toLowerCase() === 'size'
    )?.value || '';

    const colorOpt = merch.selectedOptions?.find(
      (opt: any) => opt.name.toLowerCase() === 'color'
    )?.value || '';

    return {
      id: node.id,
      name: prod.title || merch.title || 'Product',
      size: sizeOpt,
      color: colorOpt,
      price: parseFloat(merch.price?.amount || '0'),
      quantity: node.quantity || 0,
      image: prod.featuredImage?.url || '',
      variantId: merch.id,
    };
  });

  const discountCodes = (shopifyCart.discountCodes || []).map((dc: any) => ({
    code: dc.code,
    applicable: dc.applicable,
  }));

  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl || '',
    subtotal: parseFloat(shopifyCart.cost?.subtotalAmount?.amount || '0'),
    total: parseFloat(shopifyCart.cost?.totalAmount?.amount || '0'),
    lines,
    discountCodes,
  };
};

export const useCartStore = create<CartStore>((set, get) => ({
  cartId: null,
  cart: null,
  isLoading: false,
  error: null,

  initializeCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const savedId = await AsyncStorage.getItem(CART_ID_STORAGE_KEY);
      if (savedId) {
        // Fetch cart details from Shopify
        const res = await apolloClient.query<any>({
          query: GET_CART_QUERY,
          variables: { id: savedId },
          fetchPolicy: 'no-cache',
        });

        const shopifyCart = res.data?.cart;
        if (shopifyCart) {
          set({
            cartId: savedId,
            cart: mapShopifyCart(shopifyCart),
            isLoading: false,
          });
        } else {
          // If cart no longer exists in Shopify, clear local state
          await AsyncStorage.removeItem(CART_ID_STORAGE_KEY);
          set({ cartId: null, cart: null, isLoading: false });
        }
      } else {
        set({ isLoading: false });
      }
    } catch (err: any) {
      console.error('Failed to initialize cart:', err);
      set({ error: err.message || 'Failed to initialize cart', isLoading: false });
    }
  },

  addToCart: async (variantId: string, quantity: number) => {
    set({ isLoading: true, error: null });
    const { cartId } = get();

    try {
      if (!cartId) {
        // Create new cart
        const res = await apolloClient.mutate<any>({
          mutation: CREATE_CART_MUTATION,
          variables: {
            input: {
              lines: [{ merchandiseId: variantId, quantity }],
            },
          },
        });

        const newCart = res.data?.cartCreate?.cart;
        if (newCart) {
          await AsyncStorage.setItem(CART_ID_STORAGE_KEY, newCart.id);
          set({
            cartId: newCart.id,
            cart: mapShopifyCart(newCart),
            isLoading: false,
          });
        }
      } else {
        // Add to existing cart
        try {
          const res = await apolloClient.mutate<any>({
            mutation: ADD_TO_CART_MUTATION,
            variables: {
              cartId,
              lines: [{ merchandiseId: variantId, quantity }],
            },
          });

          const updatedCart = res.data?.cartLinesAdd?.cart;
          if (updatedCart) {
            set({
              cart: mapShopifyCart(updatedCart),
              isLoading: false,
            });
          }
        } catch (addError: any) {
          // Fallback if existing cart expired/not found in Shopify
          if (addError.message?.toLowerCase().includes('not found') || addError.message?.toLowerCase().includes('invalid')) {
            console.log('Cart expired or invalid, creating a new one...');
            await AsyncStorage.removeItem(CART_ID_STORAGE_KEY);
            set({ cartId: null, cart: null });
            // Recursively call addToCart to create the new cart
            return get().addToCart(variantId, quantity);
          }
          throw addError;
        }
      }
    } catch (err: any) {
      console.error('Failed to add to cart:', err);
      set({ error: err.message || 'Failed to add to cart', isLoading: false });
    }
  },

  updateQuantity: async (lineId: string, quantity: number) => {
    const { cartId } = get();
    if (!cartId) return;

    set({ isLoading: true, error: null });
    try {
      const res = await apolloClient.mutate<any>({
        mutation: UPDATE_CART_MUTATION,
        variables: {
          cartId,
          lines: [{ id: lineId, quantity }],
        },
      });

      const updatedCart = res.data?.cartLinesUpdate?.cart;
      if (updatedCart) {
        set({
          cart: mapShopifyCart(updatedCart),
          isLoading: false,
        });
      }
    } catch (err: any) {
      console.error('Failed to update quantity:', err);
      set({ error: err.message || 'Failed to update quantity', isLoading: false });
    }
  },

  removeFromCart: async (lineId: string) => {
    const { cartId } = get();
    if (!cartId) return;

    set({ isLoading: true, error: null });
    try {
      const res = await apolloClient.mutate<any>({
        mutation: REMOVE_FROM_CART_MUTATION,
        variables: {
          cartId,
          lineIds: [lineId],
        },
      });

      const updatedCart = res.data?.cartLinesRemove?.cart;
      if (updatedCart) {
        set({
          cart: mapShopifyCart(updatedCart),
          isLoading: false,
        });
      }
    } catch (err: any) {
      console.error('Failed to remove item:', err);
      set({ error: err.message || 'Failed to remove item', isLoading: false });
    }
  },

  updateDiscountCodes: async (codes: string[]) => {
    const { cartId } = get();
    if (!cartId) return null;

    set({ isLoading: true, error: null });
    try {
      const res = await apolloClient.mutate<any>({
        mutation: UPDATE_DISCOUNT_CODES_MUTATION,
        variables: {
          cartId,
          discountCodes: codes,
        },
      });

      const updatedCart = res.data?.cartDiscountCodesUpdate?.cart;
      const userErrors = res.data?.cartDiscountCodesUpdate?.userErrors || [];

      if (userErrors.length > 0) {
        throw new Error(userErrors[0].message);
      }

      if (updatedCart) {
        const formatted = mapShopifyCart(updatedCart);
        set({
          cart: formatted,
          isLoading: false,
        });
        return formatted;
      }
      set({ isLoading: false });
      return null;
    } catch (err: any) {
      console.error('Failed to update discount codes:', err);
      set({ error: err.message || 'Failed to update discount codes', isLoading: false });
      throw err;
    }
  },

  clearCart: async () => {
    await AsyncStorage.removeItem(CART_ID_STORAGE_KEY);
    set({ cartId: null, cart: null, error: null });
  },

  updateBuyerIdentity: async (customerAccessToken: string, email?: string, address?: MailingAddressInput) => {
    const { cartId } = get();
    if (!cartId) return;

    set({ isLoading: true, error: null });
    try {
      const buyerIdentityInput: any = {
        customerAccessToken,
        email,
      };

      if (address) {
        buyerIdentityInput.deliveryAddressPreferences = [
          {
            deliveryAddress: address,
          },
        ];
      }

      const res = await apolloClient.mutate<any>({
        mutation: CART_BUYER_IDENTITY_UPDATE_MUTATION,
        variables: {
          cartId,
          buyerIdentity: buyerIdentityInput,
        },
      });

      const userErrors = res.data?.cartBuyerIdentityUpdate?.userErrors || [];
      if (userErrors.length > 0) {
        throw new Error(userErrors[0].message);
      }

      const updatedCart = res.data?.cartBuyerIdentityUpdate?.cart;
      if (updatedCart) {
        set({
          cart: {
            ...get().cart!,
            checkoutUrl: updatedCart.checkoutUrl,
          },
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err: any) {
      console.error('Failed to update buyer identity:', err);
      set({ error: err.message || 'Failed to update buyer identity', isLoading: false });
      throw err;
    }
  },
}));
