// ──────────────────────────────────────────────
// Shop Feature — Data Fetching Hook
// ──────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { useShopStore } from '../store/shopStore';

const SEARCH_DEBOUNCE_MS = 400;

export const useShopData = () => {
  const {
    searchQuery,
    selectedCategoryId,
    categories,
    products,
    favoriteIds,
    isLoading,
    error,
    setSearchQuery,
    setSelectedCategory,
    toggleFavorite,
    loadCategories,
    fetchProducts,
  } = useShopStore();

  const hasInitialized = useRef(false);
  const skipNextFetch = useRef(true);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    loadCategories().then(() => fetchProducts());
  }, [loadCategories, fetchProducts]);

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchProducts();
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, selectedCategoryId, fetchProducts]);

  return {
    searchQuery,
    selectedCategoryId,
    categories,
    products,
    favoriteIds,
    isLoading,
    error,
    setSearchQuery,
    setSelectedCategory,
    toggleFavorite,
    refresh: fetchProducts,
  };
};
