// ──────────────────────────────────────────────
// ProductCard — View (Reusable for grids)
// ──────────────────────────────────────────────

import { Palette } from '@shared/constants/theme';
import { useTheme } from '@shared/hooks/use-theme';
import { formatProductPrice, getProductDisplayRating } from '@shared/utils/productDisplay';
import { Image } from 'expo-image';
import { Heart, Plus } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../types/home.types';
import { createProductCardStyles } from './productCard.styles';
import StarRatingView from './StarRatingView';

interface ProductCardViewProps {
  product: Product;
  isFavorite?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  onAddToCart?: () => void;
  showRating?: boolean;
}

const ProductCardView: React.FC<ProductCardViewProps> = ({
  product,
  isFavorite = false,
  onPress,
  onToggleFavorite,
  onAddToCart,
  showRating = false,
}) => {
  const { colors, isDark } = useTheme();
  const styles = createProductCardStyles(colors, isDark);

  const { rating, reviewCount } = useMemo(() => {
    if (product.rating != null && product.reviewCount != null) {
      return { rating: product.rating, reviewCount: product.reviewCount };
    }
    return getProductDisplayRating(product.id);
  }, [product.id, product.rating, product.reviewCount]);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {product.discount != null && product.discount > 0 ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={onToggleFavorite}
          activeOpacity={0.7}
        >
          <Heart
            size={16}
            color={isFavorite ? colors.favoriteActive : colors.favoriteInactive}
            fill={isFavorite ? colors.favoriteActive : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>

        {showRating ? (
          <View style={styles.ratingRow}>
            <StarRatingView rating={rating} />
            <Text style={styles.ratingText}>({reviewCount})</Text>
          </View>
        ) : null}

        <View style={styles.priceRow}>
          <View style={styles.priceGroup}>
            <Text style={styles.currentPrice}>${formatProductPrice(product.price)}</Text>
            {product.compareAtPrice != null && product.compareAtPrice > product.price ? (
              <Text style={styles.comparePrice}>
                ${formatProductPrice(product.compareAtPrice)}
              </Text>
            ) : null}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={onAddToCart} activeOpacity={0.8}>
            <Plus size={16} color={Palette.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
