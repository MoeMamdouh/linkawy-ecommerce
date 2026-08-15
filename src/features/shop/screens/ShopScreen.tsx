import { useCartStore } from '@features/cart/store/cartStore';
import { SearchBarView } from '@features/home/components/SearchBar';
import { Product } from '@features/home/types/home.types';
import { useTheme } from '@shared/hooks/use-theme';
import { useFocusEffect, useRouter } from 'expo-router';
import { Check, ChevronLeft, SlidersHorizontal, X } from 'lucide-react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryFiltersView } from '../components/CategoryFilters';
import { ProductGridView } from '../components/ProductGrid';
import { useShopData } from '../hooks/useShopData';
import { useShopStore } from '../store/shopStore';
import { SortOption } from '../types/shop.types';
import { createShopScreenStyles } from './shopScreen.styles';

export default function ShopScreen() {
  const { colors, isDark } = useTheme();
  const headerBackground = isDark ? colors.background : colors.card;
  const styles = createShopScreenStyles(colors, isDark);
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const consumeFocusSearch = useShopStore((state) => state.consumeFocusSearch);
  const searchInputRef = useRef<TextInput>(null);

  const {
    searchQuery,
    selectedCategoryId,
    categories,
    products,
    favoriteIds,
    isLoading,
    error,
    sortOption,
    setSearchQuery,
    setSelectedCategory,
    setSortOption,
    toggleFavorite,
  } = useShopData();

  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  const sortOptionsList: { value: SortOption; label: string }[] = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'title-asc', label: 'A to Z' },
    { value: 'title-desc', label: 'Z to A' },
  ];

  useFocusEffect(
    useCallback(() => {
      if (consumeFocusSearch()) {
        setTimeout(() => searchInputRef.current?.focus(), 150);
      }
    }, [consumeFocusSearch])
  );

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

  const resultsHeader = useMemo(
    () => (
      <Text style={styles.resultsCount}>
        {products.length} {products.length === 1 ? 'product' : 'products'} found
      </Text>
    ),
    [styles.resultsCount, products.length]
  );


  if (error && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerSection}>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <ChevronLeft color={colors.foreground} size={28} />
            </TouchableOpacity>
            <Text style={styles.title}>Shop</Text>
          </View>
          <View style={styles.searchRow}>
            <View style={styles.searchBarContainer}>
              <SearchBarView
                ref={searchInputRef}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search products..."
                containerBackground={headerBackground}
                embedded
              />
            </View>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setIsSortModalVisible(true)}
            >
              <SlidersHorizontal color={colors.foreground} size={20} />
            </TouchableOpacity>
          </View>
          <CategoryFiltersView
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategory}
            sectionBackground={headerBackground}
            embedded
          />
        </View>
      </View>

      <ProductGridView
        products={products}
        favoriteIds={favoriteIds}
        onProductPress={handleProductPress}
        onToggleFavorite={toggleFavorite}
        onAddToCart={handleAddToCart}
        ListHeaderComponent={resultsHeader}
        showRating
      />

      {isLoading && (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      <Modal
        visible={isSortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsSortModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setIsSortModalVisible(false)}>
                <X color={colors.foreground} size={24} />
              </TouchableOpacity>
            </View>
            {sortOptionsList.map((option) => {
              const isSelected = sortOption === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={styles.sortOptionRow}
                  onPress={() => {
                    setSortOption(option.value);
                    setIsSortModalVisible(false);
                  }}
                >
                  <Text style={[styles.sortOptionText, isSelected && styles.sortOptionSelectedText]}>
                    {option.label}
                  </Text>
                  {isSelected && <Check color={colors.primary} size={20} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
