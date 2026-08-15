import { CATEGORIES_LIST_QUERY } from '@features/product-list/graphql/productListQueries';
import { useShopStore } from '@features/shop/store/shopStore';
import { apolloClient } from '@shared/graphql/client';
import { useTheme } from '@shared/hooks/use-theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createCategoriesListScreenStyles } from './categoriesListScreen.styles';

interface CategoryItem {
  id: string;
  name: string;
  handle: string;
  description?: string;
  image?: string;
}

export default function CategoriesListScreen() {
  const { colors } = useTheme();
  const styles = createCategoriesListScreenStyles(colors);
  const router = useRouter();
  const openShop = useShopStore((state) => state.openShop);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await apolloClient.query<{
          collections?: {
            edges?: {
              node?: {
                id?: string;
                title?: string;
                handle?: string;
                description?: string;
                image?: { url?: string };
              };
            }[];
          };
        }>({
          query: CATEGORIES_LIST_QUERY,
          variables: { first: 50 },
          fetchPolicy: 'no-cache',
        });

        const items = (res.data?.collections?.edges || []).map((edge) => ({
          id: edge?.node?.id || '',
          name: edge?.node?.title || 'Category',
          handle: edge?.node?.handle || '',
          description: edge?.node?.description || undefined,
          image: edge?.node?.image?.url || undefined,
        }));

        setCategories(items);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryPress = useCallback(
    (category: CategoryItem) => {
      openShop({ categoryId: category.id });
      router.push('/(tabs)/shop');
    },
    [openShop, router]
  );

  const renderItem = useCallback(
    ({ item }: { item: CategoryItem }) => (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => handleCategoryPress(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.categoryImage}
          contentFit="cover"
        />
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.name}</Text>
          {item.description ? (
            <Text style={styles.categoryDescription} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    ),
    [styles, handleCategoryPress]
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={styles.title}>Categories</Text>
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
