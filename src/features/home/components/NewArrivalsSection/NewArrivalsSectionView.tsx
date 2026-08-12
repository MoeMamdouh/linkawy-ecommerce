// ──────────────────────────────────────────────
// NewArrivalsSection — View
// ──────────────────────────────────────────────

import React from 'react';
import { View } from 'react-native';
import { Product } from '../../types/home.types';
import { SectionHeaderView } from '../SectionHeader';
import { ProductCardView } from '../ProductCard';
import { createNewArrivalsSectionStyles } from './newArrivalsSection.styles';
import { useTheme } from '@shared/hooks/use-theme';

interface NewArrivalsSectionViewProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
  onSeeAll?: () => void;
  onAddToCart?: (product: Product) => void;
}

const NewArrivalsSectionView: React.FC<NewArrivalsSectionViewProps> = ({
  products,
  onProductPress,
  onSeeAll,
  onAddToCart,
}) => {
  const { colors } = useTheme();
  const styles = createNewArrivalsSectionStyles(colors);

  // Build pairs for 2-column grid (avoids VirtualizedList-inside-ScrollView warning)
  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += 2) {
    rows.push(products.slice(i, i + 2));
  }

  return (
    <View>
      <SectionHeaderView title="New Arrivals" onSeeAll={onSeeAll} />
      <View style={styles.gridContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.columnWrapper}>
            {row.map((item) => (
              <ProductCardView
                key={item.id}
                product={item}
                onPress={() => onProductPress?.(item)}
                onAddToCart={() => onAddToCart?.(item)}
              />
            ))}
            {row.length === 1 && <View style={styles.emptyCard} />}
          </View>
        ))}
      </View>
    </View>
  );
};

export default NewArrivalsSectionView;
