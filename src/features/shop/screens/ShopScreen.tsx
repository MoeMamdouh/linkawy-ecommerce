import { SearchBarView } from '@features/home/components/SearchBar';
import { Product } from '@features/home/types/home.types';
import { useCartStore } from '@features/cart/store/cartStore';
import { useTheme } from '@shared/hooks/use-theme';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryFiltersView } from '../components/CategoryFilters';
import { ProductGridView } from '../components/ProductGrid';
import { useShopData } from '../hooks/useShopData';
import { createShopScreenStyles } from './shopScreen.styles';

export default function ShopScreen() {
  const { colors } = useTheme();
  const styles = createShopScreenStyles(colors);
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

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
  } = useShopData();

  const handleProductPress = useCallback(
    (product: Product) => {
      router.push({
        pathname: '/(tabs)/product/[id]',
        params: { id: product.id },
      });
    },
    [router]
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      if (product.firstVariantId) {
        addToCart(product.firstVariantId, 1);
      }
    },
    [addToCart]
  );

  const listHeader = useMemo(
    () => (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Shop</Text>
        </View>
        <SearchBarView
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
        />
        <CategoryFiltersView
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategory}
        />
        <Text style={styles.resultsCount}>
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </Text>
      </View>
    ),
    [
      styles,
      searchQuery,
      setSearchQuery,
      categories,
      selectedCategoryId,
      setSelectedCategory,
      products.length,
    ]
  );

  if (isLoading && products.length === 0 && categories.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ProductGridView
        products={products}
        favoriteIds={favoriteIds}
        onProductPress={handleProductPress}
        onToggleFavorite={toggleFavorite}
        onAddToCart={handleAddToCart}
        ListHeaderComponent={listHeader}
      />
    </SafeAreaView>
  );
}
