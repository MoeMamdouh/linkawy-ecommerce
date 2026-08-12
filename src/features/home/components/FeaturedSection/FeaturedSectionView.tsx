import React from 'react';
import { View } from 'react-native';
import { Product } from '../../types/home.types';
import { ProductCardView } from '../ProductCard';
import { SectionHeaderView } from '../SectionHeader';
import { createFeaturedSectionStyles } from './featuredSection.styles';
import { useTheme } from '@shared/hooks/use-theme';

interface FeaturedSectionViewProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
  onSeeAll?: () => void;
  onAddToCart?: () => void;
}

const FeaturedSectionView: React.FC<FeaturedSectionViewProps> = ({
  products,
  onProductPress,
  onSeeAll,
  onAddToCart,
}) => {
  const { colors }  = useTheme();
  const styles = createFeaturedSectionStyles(colors);

  // Build pairs for 2-column grid (avoids VirtualizedList-inside-ScrollView warning)
  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += 2) {
    rows.push(products.slice(i, i + 2));
  }

  return (
    <View>
      <SectionHeaderView title="Featured Products" onSeeAll={onSeeAll} />
      <View style={styles.gridContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.columnWrapper}>
            {row.map((item) => (
              <ProductCardView
                key={item.id}
                product={item}
                onPress={() => onProductPress?.(item)}
                onAddToCart={onAddToCart}
              />
            ))}
            {/* Add empty spacer if odd number of items in last row */}
            {row.length === 1 && <View style={styles.emptyCard} />}
          </View>
        ))}
      </View>
    </View>
  );
};

export default FeaturedSectionView;
