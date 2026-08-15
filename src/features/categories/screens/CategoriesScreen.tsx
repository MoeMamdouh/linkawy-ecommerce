import { useHomeStore } from '@features/home/store/homeStore';
import { Category } from '@features/home/types/home.types';
import { useShopStore } from '@features/shop/store/shopStore';
import { useTheme } from '@shared/hooks/use-theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createCategoriesScreenStyles } from './categoriesScreen.styles';

const CategoryItemView = ({ item, onPress, styles }: { item: Category; onPress: (category: Category) => void; styles: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.categoryItem}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.categoryName} numberOfLines={1}>
          {item.name}
        </Text>
        {item.description ? (
          <>
            <Text style={styles.categoryDescription} numberOfLines={isExpanded ? undefined : 2}>
              {item.description}
            </Text>
            {!isExpanded && (
              <TouchableOpacity style={styles.seeMoreButton} onPress={() => setIsExpanded(true)}>
                <Text style={styles.seeMoreText}>See More</Text>
              </TouchableOpacity>
            )}
          </>
        ) : null}
        {(!item.description || isExpanded) && (
          <TouchableOpacity style={styles.shopButton} onPress={() => onPress(item)}>
            <Text style={styles.shopButtonText}>Shop This Category</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function CategoriesScreen() {
  const { colors } = useTheme();
  const styles = createCategoriesScreenStyles(colors);
  const router = useRouter();

  const categories = useHomeStore((state) => state.categories);
  const openShop = useShopStore((state) => state.openShop);

  const handleCategoryPress = useCallback(
    (category: Category) => {
      openShop({ categoryId: category.id });
      router.push('/(tabs)/shop');
    },
    [openShop, router]
  );

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => (
      <CategoryItemView item={item} onPress={handleCategoryPress} styles={styles} />
    ),
    [styles, handleCategoryPress]
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ChevronLeft color={colors.foreground} size={28} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Categories</Text>
          <Text style={styles.headerSubtitle}>
            {categories.length} {categories.length === 1 ? 'collection' : 'collections'}
          </Text>
        </View>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
