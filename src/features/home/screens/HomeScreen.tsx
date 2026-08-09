import { Colors } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, ScrollView, TextInput, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoriesSectionView } from '../components/CategoriesSection';
import { FeaturedSectionView } from '../components/FeaturedSection';
import { FlashSaleSectionView } from '../components/FlashSaleSection';
import { HeaderView } from '../components/Header';
import { NewArrivalsSectionView } from '../components/NewArrivalsSection';
import { PromoSliderView } from '../components/PromoSlider';
import { SearchBarView } from '../components/SearchBar';
import { useHomeData } from '../hooks/useHomeData';
import { Product } from '../types/home.types';
import { createHomeScreenStyles } from './homeScreen.styles';

import { useCartStore } from '../../cart/store/cartStore';

export default function HomeScreen() {
  const theme = useColorScheme() ?? 'light';
  const styles = createHomeScreenStyles(theme);
  const colors = Colors[theme];
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const {
    bannerSlides,
    categories,
    flashSaleProducts,
    featuredProducts,
    newArrivals,
    flashSaleEndTime,
    isLoading,
    error,
  } = useHomeData();

  const [showSearchInHeader, setShowSearchInHeader] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const searchInputRef = useRef<TextInput>(null);

  const handleProductPress = useCallback((product: Product) => {
    router.push({
      pathname: '/(tabs)/product/[id]',
      params: { id: encodeURIComponent(product.id) },
    });
  }, [router]);

  const handleSearchPress = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 200);
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    if (product.firstVariantId) {
      addToCart(product.firstVariantId, 1);
    } else {
      console.warn('Product has no variants, cannot add to cart:', product.id);
    }
  }, [addToCart]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // When the user scrolls down past the search bar (approx 60px), show the search icon in the header
    if (offsetY > 60 && !showSearchInHeader) {
      setShowSearchInHeader(true);
    } else if (offsetY <= 60 && showSearchInHeader) {
      setShowSearchInHeader(false);
    }
  }, [showSearchInHeader]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: colors.destructive, fontFamily: 'Outfit_600SemiBold', fontSize: 16, textAlign: 'center', padding: 20 }}>
          Error: {error}
        </Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
      >
        <HeaderView
          showSearchIcon={showSearchInHeader}
          onSearchPress={handleSearchPress}
        />
        <SearchBarView ref={searchInputRef} />
        {/* <PromoSliderView slides={bannerSlides} autoScrollInterval={4000} /> */}
        <PromoSliderView slides={bannerSlides || []} autoScrollInterval={4000} />
        <CategoriesSectionView categories={categories} />
        <FlashSaleSectionView
          products={flashSaleProducts}
          endTime={flashSaleEndTime}
          onProductPress={handleProductPress}
        />
        <FeaturedSectionView
          products={featuredProducts}
          onAddToCart={handleAddToCart}
          onProductPress={handleProductPress}
        />
        <NewArrivalsSectionView
          products={newArrivals}
          onAddToCart={handleAddToCart}
          onProductPress={handleProductPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}