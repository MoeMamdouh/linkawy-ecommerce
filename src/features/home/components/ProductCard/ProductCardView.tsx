// ──────────────────────────────────────────────
// ProductCard — View (Reusable for grids)
// ──────────────────────────────────────────────

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Heart, Plus, Star } from 'lucide-react-native';
import { Colors, Palette } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { Product } from '../../types/home.types';
import { createProductCardStyles } from './productCard.styles';

interface ProductCardViewProps {
  product: Product;
  isFavorite?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  onAddToCart?: () => void;
}

const ProductCardView: React.FC<ProductCardViewProps> = ({
  product,
  isFavorite = false,
  onPress,
  onToggleFavorite,
  onAddToCart,
}) => {
  const theme = useColorScheme() ?? 'light';
  const styles = createProductCardStyles(theme);
  const colors = Colors[theme];

  // Render star rating
  const renderStars = () => {
    const fullStars = Math.floor(product.rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={11}
          color={i < fullStars ? Palette.amber500 : colors.mutedForeground}
          fill={i < fullStars ? Palette.amber500 : 'none'}
        />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image + Badges */}
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

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <View style={styles.starsContainer}>{renderStars()}</View>
          <Text style={styles.ratingText}>({product.reviewCount})</Text>
        </View>

        {/* Price + Add Button */}
        <View style={styles.priceRow}>
          <View style={styles.priceGroup}>
            <Text style={styles.currentPrice}>${product.price}</Text>
            {product.compareAtPrice != null && product.compareAtPrice > 0 ? (
              <Text style={styles.comparePrice}>${product.compareAtPrice}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddToCart}
            activeOpacity={0.8}
          >
            <Plus size={16} color={Palette.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
