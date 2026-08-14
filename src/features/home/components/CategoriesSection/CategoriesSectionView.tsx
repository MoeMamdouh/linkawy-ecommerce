import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../../types/home.types';
import { SectionHeaderView } from '../SectionHeader';
import { createCategoriesSectionStyles } from './categoriesSection.styles';
import { useTheme } from '@shared/hooks/use-theme';

interface CategoriesSectionViewProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
  onSeeAll?: () => void;
}



const CategoriesSectionView: React.FC<CategoriesSectionViewProps> = ({
  categories,
  onCategoryPress,
  onSeeAll,
}) => {
  const { colors } = useTheme();
  const styles = createCategoriesSectionStyles(colors);

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => {
      return (
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => onCategoryPress?.(item)}
          activeOpacity={0.7}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
          </View>
          <Text style={styles.categoryName} numberOfLines={1}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [styles, colors, onCategoryPress]
  );

  return (
    <View>
      <SectionHeaderView title="Categories" onSeeAll={onSeeAll} />
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default CategoriesSectionView;
