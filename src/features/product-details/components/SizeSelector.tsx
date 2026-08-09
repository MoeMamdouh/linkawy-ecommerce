// ──────────────────────────────────────────────
// SizeSelector Component
// ──────────────────────────────────────────────

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { createProductDetailsStyles } from '../styles/productDetails.styles';
import { SizeSelectorProps } from '../types/productDetails.types';

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  const theme = useColorScheme() ?? 'light';
  const styles = createProductDetailsStyles(theme);

  return (
    <View>
      <Text style={styles.sectionTitle}>Size</Text>
      <View style={styles.selectorRow}>
        {sizes.map((size) => {
          const isSelected = size === selectedSize;
          return (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizePill,
                isSelected && styles.activeSizePill,
              ]}
              onPress={() => onSelectSize(size)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.sizePillText,
                  isSelected && styles.activeSizePillText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
