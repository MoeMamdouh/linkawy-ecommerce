// ──────────────────────────────────────────────
// CategoryFilters — View
// ──────────────────────────────────────────────

import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { ALL_CATEGORY_ID } from '../../store/shopStore';
import { ShopCategory } from '../../types/shop.types';
import { createCategoryFiltersStyles } from './categoryFilters.styles';
import { useTheme } from '@shared/hooks/use-theme';

interface CategoryFilterItem {
  id: string;
  name: string;
}

interface CategoryFiltersViewProps {
  categories: ShopCategory[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  sectionBackground?: string;
  embedded?: boolean;
}

const CategoryFiltersView: React.FC<CategoryFiltersViewProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  sectionBackground,
  embedded = false,
}) => {
  const { colors } = useTheme();
  const styles = createCategoryFiltersStyles(colors, sectionBackground, embedded);

  const filterItems: CategoryFilterItem[] = [
    { id: ALL_CATEGORY_ID, name: 'All' },
    ...categories,
  ];

  const renderItem = useCallback(
    ({ item }: { item: CategoryFilterItem }) => {
      const isActive = item.id === selectedCategoryId;
      return (
        <TouchableOpacity
          style={[styles.pill, isActive && styles.pillActive]}
          onPress={() => onSelectCategory(item.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategoryId, onSelectCategory, styles]
  );

  return (
    <FlatList
      data={filterItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default CategoryFiltersView;
