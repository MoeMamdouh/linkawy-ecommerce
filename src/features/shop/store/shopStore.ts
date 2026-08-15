// ──────────────────────────────────────────────
// Shop Feature — Zustand Store (Shopify Direct)
// ──────────────────────────────────────────────

import { Product } from '@features/home/types/home.types';
import { apolloClient } from '@shared/graphql/client';
import { create } from 'zustand';
import {
  SHOP_COLLECTIONS_QUERY,
  SHOP_COLLECTION_PRODUCTS_QUERY,
  SHOP_PRODUCTS_QUERY,
} from '../graphql/shopQueries';
import { ShopCategory, ShopStore } from '../types/shop.types';

const ALL_CATEGORY_ID = 'all';
const PRODUCTS_PAGE_SIZE = 50;

const getDefaultVariantId = (node: {
  variants?: { edges?: { node?: { id?: string; selectedOptions?: { name: string; value: string }[] } }[] };
  options?: { name: string; values?: string[] }[];
}) => {
  if (!node.variants?.edges?.length) return undefined;
  if (!node.options?.length) return node.variants.edges[0]?.node?.id;

  const defaultOptions = node.options.map((opt) => ({
    name: opt.name,
    value: opt.values?.[0] || '',
  }));

  const matchingEdge = node.variants.edges.find((edge) => {
    const vNode = edge.node || {};
    return defaultOptions.every((defOpt) => {
      const selected = vNode.selectedOptions?.find(
        (sel) => sel.name.toLowerCase() === defOpt.name.toLowerCase()
      );
      return selected && selected.value === defOpt.value;
    });
  });

  return matchingEdge?.node?.id || node.variants.edges[0]?.node?.id;
};

const mapShopifyProduct = (edge: { node?: Record<string, unknown> }, index: number): Product => {
  const node = edge?.node || {};
  const price = parseFloat((node.priceRange as any)?.minVariantPrice?.amount || '0');
  const compareAt = (node.compareAtPriceRange as any)?.maxVariantPrice?.amount
    ? parseFloat((node.compareAtPriceRange as any).maxVariantPrice.amount)
    : undefined;

  const discount =
    compareAt && compareAt > price
      ? Math.round(((compareAt - price) / compareAt) * 100)
      : undefined;

  return {
    id: (node.id as string) || `prod-${index}`,
    title: (node.title as string) || 'Product',
    price,
    compareAtPrice: compareAt,
    image: (node.featuredImage as any)?.url || '',
    category: (node.productType as string) || 'General',
    discount,
    firstVariantId: getDefaultVariantId(node as any),
  };
};



export const useShopStore = create<ShopStore>((set, get) => ({
  searchQuery: '',
  selectedCategoryId: ALL_CATEGORY_ID,
  categories: [],
  products: [],
  favoriteIds: [],
  isLoading: false,
  error: null,
  focusSearchOnOpen: false,
  sortOption: 'price-asc',

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSortOption: (option) => {
    set({ sortOption: option });
    get().fetchProducts();
  },

  setSelectedCategory: (categoryId) => set({ selectedCategoryId: categoryId }),

  openShop: (options) => {
    set({
      searchQuery: options?.searchQuery ?? '',
      selectedCategoryId: options?.categoryId ?? ALL_CATEGORY_ID,
      focusSearchOnOpen: options?.focusSearch ?? false,
    });
  },

  consumeFocusSearch: () => {
    const shouldFocus = get().focusSearchOnOpen;
    if (shouldFocus) {
      set({ focusSearchOnOpen: false });
    }
    return shouldFocus;
  },

  toggleFavorite: (productId) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(productId)
        ? state.favoriteIds.filter((id) => id !== productId)
        : [...state.favoriteIds, productId],
    })),

  loadCategories: async () => {
    try {
      const res = await apolloClient.query<{ collections?: { edges?: { node?: ShopCategory }[] } }>({
        query: SHOP_COLLECTIONS_QUERY,
        variables: { first: 20 },
        fetchPolicy: 'no-cache',
      });

      const rawCollections = res.data?.collections?.edges || [];
      const categories: ShopCategory[] = rawCollections.map((edge) => {
        const node = edge?.node as { id?: string; title?: string; handle?: string } | undefined;
        return {
          id: node?.id || '',
          name: node?.title || 'Category',
          handle: node?.handle || '',
        };
      });

      set({ categories });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load categories';
      set({ error: message });
    }
  },

  fetchProducts: async () => {
    const { searchQuery, selectedCategoryId, categories, sortOption } = get();
    set({ isLoading: true, error: null });

    try {
      let rawProducts: { node?: Record<string, unknown> }[] = [];

      let sortKey = 'BEST_SELLING';
      let collectionSortKey = 'BEST_SELLING';
      let reverse = false;

      switch (sortOption) {
        case 'price-asc':
          sortKey = 'PRICE';
          collectionSortKey = 'PRICE';
          reverse = false;
          break;
        case 'price-desc':
          sortKey = 'PRICE';
          collectionSortKey = 'PRICE';
          reverse = true;
          break;
        case 'title-asc':
          sortKey = 'TITLE';
          collectionSortKey = 'TITLE';
          reverse = false;
          break;
        case 'title-desc':
          sortKey = 'TITLE';
          collectionSortKey = 'TITLE';
          reverse = true;
          break;
      }

      if (selectedCategoryId !== ALL_CATEGORY_ID) {
        const category = categories.find((c) => c.id === selectedCategoryId);
        if (category?.handle) {
          const res = await apolloClient.query<{ collectionByHandle?: { products?: { edges?: typeof rawProducts } } }>({
            query: SHOP_COLLECTION_PRODUCTS_QUERY,
            variables: {
              handle: category.handle,
              first: PRODUCTS_PAGE_SIZE,
              sortKey: collectionSortKey,
              reverse
            },
            fetchPolicy: 'no-cache',
          });
          rawProducts = res.data?.collectionByHandle?.products?.edges || [];
        }
      } else {
        const res = await apolloClient.query<{ products?: { edges?: typeof rawProducts } }>({
          query: SHOP_PRODUCTS_QUERY,
          variables: {
            first: PRODUCTS_PAGE_SIZE,
            sortKey,
            reverse
          },
          fetchPolicy: 'no-cache',
        });
        rawProducts = res.data?.products?.edges || [];
      }

      const products = rawProducts.map(mapShopifyProduct);
      set({ products, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load products';
      set({ error: message, isLoading: false });
    }
  },
}));

export { ALL_CATEGORY_ID };

