import { useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import { useCustomerProfile } from '@features/customer/hooks/useCustomer';
import { useWishlistStore } from '../store/useWishlistStore';
import { GET_WISHLIST_PRODUCTS_QUERY } from '../graphql/wishlistQueries';
import { Product } from '@features/home/types/home.types';

export const useWishlist = () => {
  const { data: customerData } = useCustomerProfile();
  const customerId = customerData?.customer?.id || null;

  const items = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const storeLoading = useWishlistStore((state) => state.isLoading);

  const isInWishlist = useCallback((productId: string) => {
    return items.includes(productId);
  }, [items]);

  const prevCustomerId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      // If transition from guest (null) to authenticated (string)
      if (prevCustomerId.current === null && customerId !== null) {
        await useWishlistStore.getState().mergeGuestWishlist(customerId);
        await useWishlistStore.getState().initializeWishlist(customerId);
      } else if (prevCustomerId.current !== customerId) {
        await useWishlistStore.getState().initializeWishlist(customerId);
      }
      prevCustomerId.current = customerId;
    };
    init();
  }, [customerId]);

  const { data, loading: queryLoading, error, refetch } = useQuery<any>(
    GET_WISHLIST_PRODUCTS_QUERY,
    {
      variables: { ids: items },
      skip: items.length === 0,
      fetchPolicy: 'network-only',
    }
  );

  // Map Shopify nodes back to our standard Product list
  const wishlistProducts: Product[] = [];
  if (data?.nodes && items.length > 0) {
    data.nodes.forEach((node: any, index: number) => {
      if (!node) return;
      const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
      const compareAt = node.compareAtPriceRange?.maxVariantPrice?.amount
        ? parseFloat(node.compareAtPriceRange.maxVariantPrice.amount)
        : undefined;

      const discount =
        compareAt && compareAt > price
          ? Math.round(((compareAt - price) / compareAt) * 100)
          : undefined;

      const firstVariantId = node.variants?.edges?.[0]?.node?.id || undefined;

      wishlistProducts.push({
        id: node.id || `prod-${index}`,
        title: node.title || 'Product',
        price,
        compareAtPrice: compareAt && compareAt > price ? compareAt : undefined,
        image: node.featuredImage?.url || '',
        category: node.productType || 'General',
        discount,
        firstVariantId,
      });
    });
  }

  const isLoading = storeLoading || (items.length > 0 && queryLoading);

  return {
    items,
    wishlistProducts,
    isLoading,
    error: error?.message || null,
    toggleWishlist,
    isInWishlist,
    refetch,
  };
};
