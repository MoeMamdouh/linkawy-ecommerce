// ──────────────────────────────────────────────
// Home Feature — Data Fetching Hook
// ──────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { useHomeStore } from '../store/homeStore';

export const useHomeData = () => {
  const {
    bannerSlides,
    categories,
    flashSaleProducts,
    featuredProducts,
    newArrivals,
    flashSaleEndTime,
    isLoading,
    error,
    loadHomeData,
  } = useHomeStore();

  // Use a ref to prevent loadHomeData from being called multiple times
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      loadHomeData();
    }
  }, [loadHomeData]);

  return {
    bannerSlides,
    categories,
    flashSaleProducts,
    featuredProducts,
    newArrivals,
    flashSaleEndTime,
    isLoading,
    error,
    refresh: loadHomeData,
  };
};