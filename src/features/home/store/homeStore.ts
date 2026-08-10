// ──────────────────────────────────────────────
// Home Feature — Zustand Store (Shopify Direct)
// ──────────────────────────────────────────────

import { apolloClient } from '@shared/graphql/client';
import { create } from 'zustand';
import { mockBannerSlides } from '../data/mockData';
import { COLLECTIONS_QUERY, PRODUCTS_QUERY } from '../graphql/homeQueries';
import { Category, HomeActions, HomeState, Product } from '../types/home.types';

type HomeStore = HomeState & HomeActions;

const mapShopifyProduct = (edge: any, index: number): Product => {
  const node = edge?.node || {};
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
  const compareAt = node.compareAtPriceRange?.maxVariantPrice?.amount
    ? parseFloat(node.compareAtPriceRange.maxVariantPrice.amount)
    : undefined;

  const discount =
    compareAt && compareAt > price
      ? Math.round(((compareAt - price) / compareAt) * 100)
      : undefined;

  return {
    id: node.id || `prod-${index}`,
    title: node.title || 'Product',
    price,
    compareAtPrice: compareAt,
    image: node.featuredImage?.url || '',
    category: node.productType || 'General',
    discount,
  };
};

const categoryIconMap: Record<string, string> = {
  fashion: 'Shirt',
  clothing: 'Shirt',
  electronics: 'Smartphone',
  tech: 'Smartphone',
  beauty: 'Sparkles',
  cosmetics: 'Sparkles',
  home: 'Sofa',
  furniture: 'Sofa',
  sports: 'Dumbbell',
  fitness: 'Dumbbell',
  board: 'Sparkles',
  snowboard: 'Sparkles',
  automated: 'Shirt',
  hydrogen: 'Smartphone',
};

const mapCategoryIcon = (title: string): string => {
  if (!title) return 'Shirt';
  const lower = title.toLowerCase();
  for (const [key, icon] of Object.entries(categoryIconMap)) {
    if (lower.includes(key)) return icon;
  }
  return 'Shirt';
};

const mapShopifyCategory = (edge: any): Category => ({
  id: edge?.node?.id || '',
  name: edge?.node?.title || 'Category',
  icon: mapCategoryIcon(edge?.node?.title || ''),
});

export const useHomeStore = create<HomeStore>((set) => ({
  // ── Initial State ──
  categories: [],
  flashSaleProducts: [],
  featuredProducts: [],
  newArrivals: [],
  bannerSlides: mockBannerSlides, // Slider uses mock data only
  flashSaleEndTime: 0,
  isLoading: false,
  error: null,

  // ── Actions ──
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  loadHomeData: async () => {
    set({ isLoading: true, error: null });
    try {
      let rawProducts: any[] = [];
      let rawCollections: any[] = [];

      try {
        const [productsRes, collectionsRes] = await Promise.all([
          apolloClient.query<any>({
            query: PRODUCTS_QUERY,
            variables: { first: 20 },
            fetchPolicy: 'no-cache',
          }),
          apolloClient.query<any>({
            query: COLLECTIONS_QUERY,
            variables: { first: 10 },
            fetchPolicy: 'no-cache',
          }),
        ]);

        rawProducts = productsRes.data?.products?.edges || [];
        rawCollections = collectionsRes.data?.collections?.edges || [];
      } catch (apolloErr) {
        console.warn('Apollo Client failed, attempting direct fetch:', apolloErr);
      }

      // If Apollo returned no items or threw error, fallback to direct fetch API
      if (!rawProducts.length || !rawCollections.length) {
        const domain =
          process.env.EXPO_PUBLIC_SHOPIFY_DOMAIN ||
          process.env.SHOPIFY_STORE_DOMAIN ||
          'linkawy-3c3pluxk.myshopify.com';
        const token =
          process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ||
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
          '1ee90a470dc1bfa3b8c69f27cda48e5c';
        const shopDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
        const endpoint = `https://${shopDomain}/api/2024-07/graphql`;

        const [pRes, cRes] = await Promise.all([
          fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': token,
            },
            body: JSON.stringify({
              query: `
                query HomeProducts($first: Int!) {
                  products(first: $first, sortKey: CREATED_AT, reverse: true) {
                    edges {
                      node {
                        id
                        title
                        handle
                        productType
                        tags
                        featuredImage { url altText }
                        priceRange { minVariantPrice { amount currencyCode } }
                        compareAtPriceRange { maxVariantPrice { amount currencyCode } }
                      }
                    }
                  }
                }
              `,
              variables: { first: 20 },
            }),
          }).then((r) => r.json()),
          fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': token,
            },
            body: JSON.stringify({
              query: `
                query GetCollections($first: Int!) {
                  collections(first: $first) {
                    edges {
                      node {
                        id
                        title
                        handle
                        description
                        image { url altText }
                      }
                    }
                  }
                }
              `,
              variables: { first: 10 },
            }),
          }).then((r) => r.json()),
        ]);

        if (pRes.data?.products?.edges) {
          rawProducts = pRes.data.products.edges;
        }
        if (cRes.data?.collections?.edges) {
          rawCollections = cRes.data.collections.edges;
        }
      }

      // Map to Product and Category models
      const allProducts: Product[] = rawProducts.map(mapShopifyProduct);
      const mappedCategories: Category[] = rawCollections.map(mapShopifyCategory);

      // Section product assignment
      const flashSaleProducts = allProducts.length > 0 ? allProducts.slice(0, Math.min(5, allProducts.length)) : [];
      const featuredProducts = allProducts.length > 5 ? allProducts.slice(5, Math.min(10, allProducts.length)) : allProducts;
      const newArrivals = allProducts.length > 10 ? allProducts.slice(10, Math.min(20, allProducts.length)) : allProducts;

      const now = Date.now();
      const flashSaleEndTime = now + (8 * 60 * 60 + 45 * 60 + 30) * 1000;

      set({
        bannerSlides: mockBannerSlides, // Slider uses mock data only
        categories: mappedCategories,
        flashSaleProducts,
        featuredProducts,
        newArrivals,
        flashSaleEndTime,
        isLoading: false,
      });
    } catch (err: any) {
      console.error('Error fetching Shopify home data:', err);
      set({
        bannerSlides: mockBannerSlides,
        error: err.message || 'Failed to load home data',
        isLoading: false,
      });
    }
  },
}));