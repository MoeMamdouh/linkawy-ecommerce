// ──────────────────────────────────────────────
// Shop Feature — Type Definitions
// ──────────────────────────────────────────────

import { Product } from '@features/home/types/home.types';

export interface ShopCategory {
  id: string;
  name: string;
  handle: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc';

export interface ShopState {
  searchQuery: string;
  selectedCategoryId: string;
  categories: ShopCategory[];
  products: Product[];
  favoriteIds: string[];
  isLoading: boolean;
  error: string | null;
  focusSearchOnOpen: boolean;
  sortOption: SortOption;
}

export interface ShopActions {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (categoryId: string) => void;
  setSortOption: (option: SortOption) => void;
  toggleFavorite: (productId: string) => void;
  loadCategories: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  openShop: (options?: { searchQuery?: string; categoryId?: string; focusSearch?: boolean }) => void;
  consumeFocusSearch: () => boolean;
}

export type ShopStore = ShopState & ShopActions;
