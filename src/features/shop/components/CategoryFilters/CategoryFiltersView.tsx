// ──────────────────────────────────────────────
// CategoryFilters — View
// ──────────────────────────────────────────────

import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
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

  const flatListRef = useRef<FlatList>(null);

  const filterItems: CategoryFilterItem[] = [
    { id: ALL_CATEGORY_ID, name: 'All' },
    ...categories,
  ];

  useEffect(() => {
    if (filterItems.length > 0 && selectedCategoryId) {
      const index = filterItems.findIndex((item) => item.id === selectedCategoryId);
      if (index !== -1 && flatListRef.current) {
        // Small delay ensures FlatList has laid out its items before scrolling
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
          });
        }, 100);
      }
    }
  }, [selectedCategoryId, filterItems.length]);

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
    <View>
      <FlatList
        ref={flatListRef}
        data={filterItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true, viewPosition: 0.5 });
          });
        }}
      />
    </View>
  );
};

export default CategoryFiltersView;
