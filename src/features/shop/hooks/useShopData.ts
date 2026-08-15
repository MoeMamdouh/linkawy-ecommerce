// ──────────────────────────────────────────────
// Shop Feature — Data Fetching Hook
// ──────────────────────────────────────────────

import { useEffect, useMemo, useRef } from 'react';
import { useShopStore } from '../store/shopStore';

const SEARCH_DEBOUNCE_MS = 150;

export const useShopData = () => {
  const {
    searchQuery,
    selectedCategoryId,
    categories,
    products: serverProducts,
    favoriteIds,
    isLoading,
    error,
    sortOption,
    setSearchQuery,
    setSelectedCategory,
    setSortOption,
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

  const displayedProducts = useMemo(() => {
    let filtered = [...serverProducts];

    // Instant client-side search filter for immediate feedback while network request is debounced
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
    }

    // Instant client-side sort
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }, [serverProducts, searchQuery, sortOption]);

  return {
    searchQuery,
    selectedCategoryId,
    categories,
    products: displayedProducts,
    favoriteIds,
    isLoading,
    error,
    sortOption,
    setSearchQuery,
    setSelectedCategory,
    setSortOption,
    toggleFavorite,
    refresh: fetchProducts,
  };
};
