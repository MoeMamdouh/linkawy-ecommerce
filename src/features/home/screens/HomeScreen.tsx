import { useShopStore } from '@features/shop/store/shopStore';
import { useTheme } from '@shared/hooks/use-theme';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from 'react-native';
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

import { useWishlist } from '@features/wishlist/hooks/useWishlist';
import { useCartStore } from '../../cart/store/cartStore';


export default function HomeScreen() {
  const { colors } = useTheme();
  const styles = createHomeScreenStyles(colors);
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const openShop = useShopStore((state) => state.openShop);
  const { toggleWishlist, isInWishlist } = useWishlist();

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

  const navigateToShop = useCallback(() => {
    openShop({ focusSearch: true });
    router.push('/(tabs)/shop');
  }, [openShop, router]);

  const handleProductPress = useCallback((product: Product) => {
    router.push({
      pathname: '/(tabs)/product/[id]',
      params: { id: product.id },
    });
  }, [router]);

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
          onSearchPress={navigateToShop}
        />
        <SearchBarView editable={false} onPress={navigateToShop} />
        {/* <PromoSliderView slides={bannerSlides} autoScrollInterval={4000} /> */}
        <PromoSliderView slides={bannerSlides || []} autoScrollInterval={4000} />
        <CategoriesSectionView
          categories={categories}
          onSeeAll={() => router.push('/(tabs)/categories' as any)}
        />
        <FlashSaleSectionView
          products={flashSaleProducts}
          endTime={flashSaleEndTime}
          onProductPress={handleProductPress}
        />
        <FeaturedSectionView
          products={featuredProducts}
          onAddToCart={handleAddToCart}
          onProductPress={handleProductPress}
          isInWishlist={isInWishlist}
          onToggleWishlist={toggleWishlist}
        />
        <NewArrivalsSectionView
          products={newArrivals}
          onAddToCart={handleAddToCart}
          onProductPress={handleProductPress}
          isInWishlist={isInWishlist}
          onToggleWishlist={toggleWishlist}
        />
      </ScrollView>
    </SafeAreaView>
  );
}