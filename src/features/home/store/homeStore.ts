// // ──────────────────────────────────────────────
// // Home Feature — Zustand Store
// // ──────────────────────────────────────────────

// import { create } from 'zustand';
// import { HomeState, HomeActions, Product, Category } from '../types/home.types';
// import { apolloClient } from '@shared/graphql/apolloClient';
// import { PRODUCTS_QUERY, COLLECTIONS_QUERY } from '../graphql/homeQueries';
// import { mockBannerSlides } from '../data/mockData';

// type HomeStore = HomeState & HomeActions;

// // Map Shopify product edges to our Product type
// const mapShopifyProduct = (edge: any, index: number): Product => {
//   const node = edge.node;
//   const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
//   const compareAt = node.compareAtPriceRange?.maxVariantPrice?.amount
//     ? parseFloat(node.compareAtPriceRange.maxVariantPrice.amount)
//     : undefined;

//   // Calculate discount percentage if compareAtPrice exists
//   const discount =
//     compareAt && compareAt > price
//       ? Math.round(((compareAt - price) / compareAt) * 100)
//       : undefined;

//   return {
//     id: node.id,
//     title: node.title,
//     price,
//     compareAtPrice: compareAt,
//     image: node.featuredImage?.url || '',
//     category: node.productType || 'General',
//     rating: 4.0 + (index % 10) * 0.1, // placeholder until reviews are integrated
//     reviewCount: 50 + index * 17,       // placeholder until reviews are integrated
//     discount,
//   };
// };

// // Map Shopify collection edges to our Category type
// const mapShopifyCategory = (edge: any): Category => ({
//   id: edge.node.id,
//   name: edge.node.title,
//   icon: 'Shirt', // default icon — will be mapped per category later
// });

// // Category icon mapping based on collection title
// const categoryIconMap: Record<string, string> = {
//   fashion: 'Shirt',
//   clothing: 'Shirt',
//   electronics: 'Smartphone',
//   tech: 'Smartphone',
//   beauty: 'Sparkles',
//   cosmetics: 'Sparkles',
//   home: 'Sofa',
//   furniture: 'Sofa',
//   sports: 'Dumbbell',
//   fitness: 'Dumbbell',
// };

// const mapCategoryIcon = (title: string): string => {
//   const lower = title.toLowerCase();
//   for (const [key, icon] of Object.entries(categoryIconMap)) {
//     if (lower.includes(key)) return icon;
//   }
//   return 'Shirt'; // fallback
// };

// export const useHomeStore = create<HomeStore>((set) => ({
//   // ── Initial State ──
//   categories: [],
//   flashSaleProducts: [],
//   featuredProducts: [],
//   newArrivals: [],
//   bannerSlides: [],
//   flashSaleEndTime: 0,
//   isLoading: false,
//   error: null,

//   // ── Actions ──
//   setLoading: (loading) => set({ isLoading: loading }),
//   setError: (error) => set({ error }),

//   loadHomeData: async () => {
//     set({ isLoading: true, error: null });
//     try {
//       // Fetch products from Shopify
//       const productsRes = await apolloClient.query<any>({
//         query: PRODUCTS_QUERY,
//         variables: { first: 20 },
//       });

//       // Fetch collections from Shopify
//       const collectionsRes = await apolloClient.query<any>({
//         query: COLLECTIONS_QUERY,
//         variables: { first: 10 },
//       });

//       const rawProducts = productsRes.data?.products?.edges || [];
//       const rawCollections = collectionsRes.data?.collections?.edges || [];

//       // Map to app types
//       const allProducts: Product[] = rawProducts.map(mapShopifyProduct);

//       const mappedCategories: Category[] = rawCollections.map((edge: any) => ({
//         ...mapShopifyCategory(edge),
//         icon: mapCategoryIcon(edge.node.title),
//       }));

//       // Set flash sale end time to ~8h 45m 30s from now
//       const now = Date.now();
//       const flashSaleEndTime = now + (8 * 60 * 60 + 45 * 60 + 30) * 1000;

//       // Split products across sections
//       set({
//         bannerSlides: mockBannerSlides, // banners are not from Shopify (promotional)
//         categories: mappedCategories,
//         flashSaleProducts: allProducts.slice(0, 5),
//         featuredProducts: allProducts.slice(5, 10),
//         newArrivals: allProducts.slice(10, 15),
//         flashSaleEndTime,
//         isLoading: false,
//       });
//     } catch (err: any) {
//       console.error('Error fetching Shopify home data:', err);
//       set({
//         error: err.message || 'Failed to load home data',
//         isLoading: false,
//       });
//     }
//   },
// }));

// ──────────────────────────────────────────────
// Home Feature — Zustand Store (Shopify Direct)
// ──────────────────────────────────────────────

import { apolloClient } from '@shared/graphql/apolloClient';
import { create } from 'zustand';
import { COLLECTIONS_QUERY, PRODUCTS_QUERY } from '../graphql/homeQueries';
import { BannerSlide, Category, HomeActions, HomeState, Product } from '../types/home.types';

type HomeStore = HomeState & HomeActions;

// Map Shopify product edges to Product type
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
    rating: parseFloat((4.0 + (index % 10) * 0.1).toFixed(1)),
    reviewCount: 50 + index * 17,
    discount,
  };
};

// Map Shopify collections to Banner Slides (استخراج البانرات من مجموعات شوبيفاي)
const mapCollectionsToBanners = (collections: any[]): BannerSlide[] => {
  return collections
    .filter((edge: any) => edge?.node?.image?.url) // بناخد المجموعات اللي ليها صورة كولكشن في شوبيفاي
    .map((edge: any, index: number) => {
      const node = edge.node;
      const colors = ['#000000', '#1A2A3A', '#2D1B36', '#0F2C23', '#3A1A1A'];

      return {
        id: node.id,
        title: node.title,
        subtitle: node.description || 'Explore the latest collection',
        tag: 'Featured',
        image: node.image.url,
        backgroundColor: colors[index % colors.length],
      };
    });
};

// Map Shopify collection edges to Category type
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
  bannerSlides: [], // مصفوفة فارغة تماماً بدون أي Mock
  flashSaleEndTime: 0,
  isLoading: false,
  error: null,

  // ── Actions ──
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  loadHomeData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [productsRes, collectionsRes] = await Promise.all([
        apolloClient.query<any>({
          query: PRODUCTS_QUERY,
          variables: { first: 20 },
        }),
        apolloClient.query<any>({
          query: COLLECTIONS_QUERY,
          variables: { first: 10 },
        }),
      ]);
      console.log('Shopify Products:', productsRes.data?.products?.edges);
      console.log('Shopify Collections:', collectionsRes.data?.collections?.edges);
      const rawProducts = productsRes.data?.products?.edges || [];
      const rawCollections = collectionsRes.data?.collections?.edges || [];

      // Mapping Shopify Data
      const allProducts: Product[] = rawProducts.map(mapShopifyProduct);
      const mappedCategories: Category[] = rawCollections.map(mapShopifyCategory);

      // تحويل الكولكشنز اللي ليها صور لـ Banners حقيقية من شوبيفاي
      const mappedBanners: BannerSlide[] = mapCollectionsToBanners(rawCollections);

      const now = Date.now();
      const flashSaleEndTime = now + (8 * 60 * 60 + 45 * 60 + 30) * 1000;

      set({
        bannerSlides: mappedBanners, // بيانات البانر جاية من Shopify مباشرة
        categories: mappedCategories,
        flashSaleProducts: allProducts.slice(0, 5),
        featuredProducts: allProducts.slice(5, 10),
        newArrivals: allProducts.slice(10, 15),
        flashSaleEndTime,
        isLoading: false,
      });
    } catch (err: any) {
      console.error('Error fetching Shopify home data:', err);
      set({
        bannerSlides: [],
        error: err.message || 'Failed to load home data',
        isLoading: false,
      });
    }
  },
}));