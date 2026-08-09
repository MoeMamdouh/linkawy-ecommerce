// ──────────────────────────────────────────────
// BottomActionBar Component
// ──────────────────────────────────────────────

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Heart, ShoppingCart } from 'lucide-react-native';
import { Colors, Palette } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { createProductDetailsStyles } from '../styles/productDetails.styles';
import { BottomActionBarProps } from '../types/productDetails.types';

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  const theme = useColorScheme() ?? 'light';
  const styles = createProductDetailsStyles(theme);
  const colors = Colors[theme];

  return (
    <View style={styles.bottomBarContainer}>
      {/* Wishlist Heart Button */}
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={onToggleFavorite}
        activeOpacity={0.8}
      >
        <Heart
          size={22}
          color={isFavorite ? colors.destructive : colors.destructive}
          fill={isFavorite ? colors.destructive : colors.destructive}
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
