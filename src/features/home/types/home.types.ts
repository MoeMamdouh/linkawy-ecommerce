// ──────────────────────────────────────────────
// Home Feature — Type Definitions
// ──────────────────────────────────────────────

export interface Product {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  discount?: number;
  firstVariantId?: string;
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface BannerSlide {
  id: string;
  tag: string;       // e.g. "LIMITED OFFER"
  title: string;     // e.g. "Beauty Essentials"
  subtitle: string;  // e.g. "Premium brands"
  image: string;
  backgroundColor: string;
}

export interface HomeState {
  categories: Category[];
  flashSaleProducts: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  bannerSlides: BannerSlide[];
  flashSaleEndTime: number; // timestamp in ms
  isLoading: boolean;
  error: string | null;
}

export interface HomeActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadHomeData: () => Promise<void>;
}
