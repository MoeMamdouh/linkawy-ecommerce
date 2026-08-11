
import { Palette } from '@shared/constants/theme';
import { Heart, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createProductDetailsStyles } from '../styles/productDetails.styles';
import { BottomActionBarProps } from '../types/productDetails.types';
import { useTheme } from '@shared/hooks/use-theme';

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  const { colors } = useTheme();
  const styles = createProductDetailsStyles(colors);

  return (
    <View style={styles.bottomBarContainer}>
      {/* Wishlist Heart Button */}
      <TouchableOpacity
        style={[styles.wishlistButton, { borderColor: isFavorite ? colors.destructive : colors.border }]}
        onPress={onToggleFavorite}
        activeOpacity={0.8}
      >
        <Heart
          size={22}
          color={isFavorite ? colors.destructive : colors.mutedForeground}
          fill={isFavorite ? colors.destructive : 'none'}
        />
      </TouchableOpacity>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={onAddToCart}
        activeOpacity={0.85}
      >
        <ShoppingCart size={20} color={Palette.white} />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};
