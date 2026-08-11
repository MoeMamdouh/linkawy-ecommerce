
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createProductDetailsStyles } from '../styles/productDetails.styles';
import { SizeSelectorProps } from '../types/productDetails.types';
import { useTheme } from '@shared/hooks/use-theme';

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  const { colors } = useTheme();
  const styles = createProductDetailsStyles(colors);

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
