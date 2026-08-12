import { apolloClient } from '@shared/graphql/client';
import { create } from 'zustand';
import { mockBannerSlides } from '../data/mockData';
import { COLLECTIONS_QUERY, PRODUCTS_QUERY } from '../graphql/homeQueries';
import { Category, HomeActions, HomeState, Product } from '../types/home.types';

type HomeStore = HomeState & HomeActions;

const getDefaultVariantId = (node: any) => {
  if (!node.variants?.edges?.length) return undefined;
  if (!node.options?.length) return node.variants.edges[0]?.node?.id;

  const defaultOptions = node.options.map((opt: any) => ({
    name: opt.name,
    value: opt.values?.[0] || '',
  }));

  const matchingEdge = node.variants.edges.find((edge: any) => {
    const vNode = edge.node || {};
    return defaultOptions.every((defOpt: any) => {
      const selected = vNode.selectedOptions?.find(
        (sel: any) => sel.name.toLowerCase() === defOpt.name.toLowerCase()
      );
      return selected && selected.value === defOpt.value;
    });
  });

  return matchingEdge?.node?.id || node.variants.edges[0]?.node?.id;
};

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

  const firstVariantId = getDefaultVariantId(node);

  return {
    id: node.id || `prod-${index}`,
    title: node.title || 'Product',
    price,
    compareAtPrice: compareAt,
    image: node.featuredImage?.url || '',
    category: node.productType || 'General',
    discount,
    firstVariantId,
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

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  loadHomeData: async () => {
    set({ isLoading: true, error: null });
    try {
      let rawProducts: any[] = [];
      let rawCollections: any[] = [];

      const [productsResult, collectionsResult] = await Promise.allSettled([
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

      if (productsResult.status === 'fulfilled') {
        rawProducts = productsResult.value.data?.products?.edges || [];
        console.log('Products fetched:', rawProducts.length);
      } else {
        console.warn('Apollo products query failed:', productsResult.reason?.message);
        console.warn('Full products error:', JSON.stringify(productsResult.reason, null, 2));
      }

      if (collectionsResult.status === 'fulfilled') {
        rawCollections = collectionsResult.value.data?.collections?.edges || [];
        console.log('Collections fetched:', rawCollections.length);
      } else {
        console.warn('Apollo collections query failed:', collectionsResult.reason?.message);
        console.warn('Full collections error:', JSON.stringify(collectionsResult.reason, null, 2));
      }

      // If both failed, surface an error instead of silently continuing
      if (productsResult.status === 'rejected' && collectionsResult.status === 'rejected') {
        throw new Error('Failed to load products and collections from Shopify');
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