// ──────────────────────────────────────────────
// Product Details Feature — Type Definitions
// ──────────────────────────────────────────────

export interface ProductDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: string[];
}

export interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export interface BottomActionBarProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
}
