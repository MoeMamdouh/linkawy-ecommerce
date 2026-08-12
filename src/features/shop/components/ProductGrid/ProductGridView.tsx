// ──────────────────────────────────────────────
// ProductGrid — View
// ──────────────────────────────────────────────

import { ProductCardView } from '@features/home/components/ProductCard';
import { Product } from '@features/home/types/home.types';
import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { createProductGridStyles } from './productGrid.styles';
import { useTheme } from '@shared/hooks/use-theme';

interface ProductGridViewProps {
  products: Product[];
  favoriteIds: string[];
  onProductPress: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  ListHeaderComponent?: React.ReactElement;
}

const ProductGridView: React.FC<ProductGridViewProps> = ({
  products,
  favoriteIds,
  onProductPress,
  onToggleFavorite,
  onAddToCart,
  ListHeaderComponent,
}) => {
  const { colors } = useTheme();
  const styles = createProductGridStyles(colors);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCardView
        product={item}
        isFavorite={favoriteIds.includes(item.id)}
        onPress={() => onProductPress(item)}
        onToggleFavorite={() => onToggleFavorite(item.id)}
        onAddToCart={() => onAddToCart(item)}
      />
    ),
    [favoriteIds, onProductPress, onToggleFavorite, onAddToCart]
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No products found</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={renderEmpty}
    />
  );
};

export default ProductGridView;
