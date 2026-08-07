import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Minus, Plus, X } from 'lucide-react-native';
import { Colors } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { CartItem } from '../hooks/useCart';
import { styles } from '../styles/cart-screen.styles';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Product Image */}
      <Image source={{ uri: item.image }} style={styles.productImage} />

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={[styles.productName, { color: colors.foreground }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.variantText, { color: colors.mutedForeground }]}>
          {item.size} · {item.color}
        </Text>
        <Text style={[styles.priceText, { color: colors.primary }]}>
          ${item.price}
        </Text>
      </View>

      {/* Close / Remove Button */}
      <TouchableOpacity
        onPress={() => onRemoveItem(item.id)}
        style={styles.closeButton}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={18} color={colors.mutedForeground} />
      </TouchableOpacity>

      {/* Quantity Selector Pill */}
      <View style={[styles.quantityPill, { backgroundColor: colors.muted }]}>
        <TouchableOpacity
          onPress={() => onUpdateQuantity(item.id, -1)}
          activeOpacity={0.6}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Minus size={14} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.quantityText, { color: colors.foreground }]}>
          {item.quantity}
        </Text>
        <TouchableOpacity
          onPress={() => onUpdateQuantity(item.id, 1)}
          activeOpacity={0.6}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Plus size={14} color={colors.foreground} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
