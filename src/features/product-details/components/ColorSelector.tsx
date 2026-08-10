
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createProductDetailsStyles } from '../styles/productDetails.styles';
import { ColorSelectorProps } from '../types/productDetails.types';
import { useTheme } from '@shared/hooks/use-theme';

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  const styles = createProductDetailsStyles(useTheme().colors);

  return (
    <View>
      <Text style={styles.sectionTitle}>Color</Text>
      <View style={styles.selectorRow}>
        {colors.map((color) => {
          const isSelected = color === selectedColor;
          return (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorPill,
                isSelected && styles.activeColorPill,
              ]}
              onPress={() => onSelectColor(color)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.colorPillText,
                  isSelected && styles.activeColorPillText,
                ]}
              >
                {color}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
