// ──────────────────────────────────────────────
// Product Details Feature — Main Screen
// ──────────────────────────────────────────────

import { Colors, Palette } from '@shared/constants/theme';
import { apolloClient } from '@shared/graphql/client';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Heart, Star } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomActionBar } from '../components/BottomActionBar';
import { ColorSelector } from '../components/ColorSelector';
import { SizeSelector } from '../components/SizeSelector';
import { GET_PRODUCT_DETAILS_QUERY } from '../graphql/productDetailsQueries';
import { createProductDetailsStyles } from '../styles/productDetails.styles';
import { ProductDetails } from '../types/productDetails.types';

// Default mock values matching the design exactly if GraphQL data is loading/partial
const DEFAULT_PRODUCT: ProductDetails = {
  id: 'default-air-jordan',
  title: 'Air Jordan 1 Retro High',
  category: 'Fashion',
  price: 149,
  compareAtPrice: 199,
  discount: 25,
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
  rating: 4.8,
  reviewCount: 234,
  description:
    'The iconic Air Jordan 1 Retro High brings heritage style to modern comfort. Premium leather upper with Air cushioning for all-day support.',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['Black', 'White', 'Navy', 'Gray'],
};

export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const theme = useColorScheme() ?? 'light';
  const styles = createProductDetailsStyles(theme);
  const colors = Colors[theme];

  const [product, setProduct] = useState<ProductDetails>(DEFAULT_PRODUCT);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Navy');
  const [isFavorite, setIsFavorite] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!params?.id) return;

  //   const fetchDetails = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await apolloClient.query<any>({
  //         query: GET_PRODUCT_DETAILS_QUERY,
  //         variables: { id: params.id },
  //       });

  //       const node = res.data?.product;
  //       if (node) {
  //         const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '149');
  //         const compareAt = node.compareAtPriceRange?.maxVariantPrice?.amount
  //           ? parseFloat(node.compareAtPriceRange.maxVariantPrice.amount)
  //           : undefined;

  //         const calculatedDiscount =
  //           compareAt && compareAt > price
  //             ? Math.round(((compareAt - price) / compareAt) * 100)
  //             : 25;

  //         setProduct({
  //           id: node.id,
  //           title: node.title || DEFAULT_PRODUCT.title,
  //           category: node.productType || DEFAULT_PRODUCT.category,
  //           price: price > 0 ? price : DEFAULT_PRODUCT.price,
  //           compareAtPrice: compareAt && compareAt > 0 ? compareAt : DEFAULT_PRODUCT.compareAtPrice,
  //           discount: calculatedDiscount,
  //           image: node.featuredImage?.url || DEFAULT_PRODUCT.image,
  //           rating: DEFAULT_PRODUCT.rating,
  //           reviewCount: DEFAULT_PRODUCT.reviewCount,
  //           description: node.description || DEFAULT_PRODUCT.description,
  //           sizes: DEFAULT_PRODUCT.sizes,
  //           colors: DEFAULT_PRODUCT.colors,
  //         });
  //       }
  //     } catch (err) {
  //       console.warn('Failed to load GraphQL product details, using default:', err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDetails();
  // }, [params?.id]);
  useEffect(() => {
    if (!params?.id) return;

    // 1. فك تشفير الـ ID الممرر عبر الرابط ليرجع للصيغة الأصلية gid://shopify/Product/...
    const productId = decodeURIComponent(params.id);

    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const res = await apolloClient.query<any>({
          query: GET_PRODUCT_DETAILS_QUERY,
          variables: { id: productId }, // 👈 استخدام productId بعد الفك
        });

        const node = res.data?.product;
        if (node) {
          const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '149');
          const compareAt = node.compareAtPriceRange?.maxVariantPrice?.amount
            ? parseFloat(node.compareAtPriceRange.maxVariantPrice.amount)
            : undefined;

          const calculatedDiscount =
            compareAt && compareAt > price
              ? Math.round(((compareAt - price) / compareAt) * 100)
              : 25;

          setProduct({
            id: node.id,
            title: node.title || DEFAULT_PRODUCT.title,
            category: node.productType || DEFAULT_PRODUCT.category,
            price: price > 0 ? price : DEFAULT_PRODUCT.price,
            compareAtPrice: compareAt && compareAt > 0 ? compareAt : DEFAULT_PRODUCT.compareAtPrice,
            discount: calculatedDiscount,
            image: node.featuredImage?.url || DEFAULT_PRODUCT.image,
            rating: DEFAULT_PRODUCT.rating,
            reviewCount: DEFAULT_PRODUCT.reviewCount,
            description: node.description || DEFAULT_PRODUCT.description,
            sizes: DEFAULT_PRODUCT.sizes,
            colors: DEFAULT_PRODUCT.colors,
          });
        }
      } catch (err) {
        console.warn('Failed to load GraphQL product details, using default:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [params?.id]);

  const renderStars = () => {
    const fullStars = Math.floor(product.rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          color={i < fullStars ? Palette.amber500 : colors.mutedForeground}
          fill={i < fullStars ? Palette.amber500 : 'none'}
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Hero Product Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            contentFit="cover"
            transition={300}
          />

          {/* Floating Top Overlay Header */}
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.circleIconButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <ChevronLeft size={22} color={Palette.textLight} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.circleIconButton}
              onPress={() => setIsFavorite(!isFavorite)}
              activeOpacity={0.8}
            >
              <Heart
                size={20}
                color={colors.destructive}
                fill={isFavorite ? colors.destructive : 'none'}
              />
            </TouchableOpacity>
          </View>

          {/* Discount Badge */}
          {product.discount != null && product.discount > 0 ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          ) : null}
        </View>

        {/* Product Info Section */}
        <View style={styles.contentContainer}>
          {/* Category */}
          <Text style={styles.categoryText}>{product.category}</Text>

          {/* Title */}
          <Text style={styles.titleText}>{product.title}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.starsGroup}>{renderStars()}</View>
            <Text style={styles.ratingNumber}>{product.rating}</Text>
            <Text style={styles.reviewCountText}>({product.reviewCount} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.currentPriceText}>${product.price}</Text>
            {product.compareAtPrice != null && product.compareAtPrice > 0 ? (
              <Text style={styles.comparePriceText}>${product.compareAtPrice}</Text>
            ) : null}
          </View>

          {/* Size Selector */}
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />

          {/* Color Selector */}
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>

          {/* Write a Review Button */}
          <TouchableOpacity style={styles.reviewButton} activeOpacity={0.8}>
            <Text style={styles.reviewButtonText}>Write a Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <BottomActionBar
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
        onAddToCart={() => console.log('Add to cart clicked')}
      />
    </View>
  );
}
