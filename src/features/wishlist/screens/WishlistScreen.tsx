import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Heart, ChevronLeft } from 'lucide-react-native';
import { useWishlist } from '../hooks/useWishlist';
import { useTheme } from '@shared/hooks/use-theme';
import { useCartStore } from '@features/cart/store/cartStore';
import { ProductCardView } from '@features/home/components/ProductCard';
import { createWishlistScreenStyles } from './wishlistScreen.styles';
import { Product } from '@features/home/types/home.types';

export default function WishlistScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createWishlistScreenStyles(colors);
  
  const {
    wishlistProducts,
    isLoading,
    error,
    toggleWishlist,
    refetch,
  } = useWishlist();

  const addToCart = useCartStore((state) => state.addToCart);

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/(tabs)/product/[id]',
      params: { id: product.id },
    });
  };

  const handleAddToCart = (product: Product) => {
    if (product.firstVariantId) {
      addToCart(product.firstVariantId, 1);
    } else {
      console.warn('Product has no variants, cannot add to cart:', product.id);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={[styles.emptyButton, { marginTop: 16 }]} onPress={refetch}>
          <Text style={styles.emptyButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ChevronLeft color={colors.foreground} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>
      <Text style={styles.headerSubtitle}>
        {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Heart size={40} color={colors.mutedForeground} />
      </View>
      <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Explore our collections and add products to your wishlist to buy them later.
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => router.push('/(tabs)/shop')}
        activeOpacity={0.8}
      >
        <Text style={styles.emptyButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCardView
      product={item}
      isFavorite={true}
      onPress={() => handleProductPress(item)}
      onToggleFavorite={() => toggleWishlist(item.id)}
      onAddToCart={() => handleAddToCart(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      {wishlistProducts.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={wishlistProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}