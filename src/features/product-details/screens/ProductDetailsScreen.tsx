import { Palette } from '@shared/constants/theme';
import { apolloClient } from '@shared/graphql/client';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Heart } from 'lucide-react-native';
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
import { useCartStore } from '../../cart/store/cartStore';
import { useTheme } from '@shared/hooks/use-theme';
import { useWishlist } from '@features/wishlist/hooks/useWishlist';



export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const { colors } = useTheme();
  const styles = createProductDetailsStyles(colors);

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const isFavorite = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (!params?.id) return;
    const productId = decodeURIComponent(params.id);

    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const res = await apolloClient.query<any>({
          query: GET_PRODUCT_DETAILS_QUERY,
          variables: { id: productId },
        });

        const node = res.data?.product;
        if (node) {
          const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
          const compareAt = node.compareAtPriceRange?.maxVariantPrice?.amount
            ? parseFloat(node.compareAtPriceRange.maxVariantPrice.amount)
            : undefined;

          const calculatedDiscount =
            compareAt && compareAt > price
              ? Math.round(((compareAt - price) / compareAt) * 100)
              : undefined;

          const sizeOption = node.options?.find((opt: any) => opt.name.toLowerCase() === 'size');
          const colorOption = node.options?.find((opt: any) => opt.name.toLowerCase() === 'color');

          const availableSizes = sizeOption ? sizeOption.values : [];
          const availableColors = colorOption ? colorOption.values : [];

          const parsedVariants = (node.variants?.edges || []).map((edge: any) => {
            const vNode = edge.node || {};
            return {
              id: vNode.id,
              title: vNode.title,
              price: parseFloat(vNode.price?.amount || '0'),
              compareAtPrice: vNode.compareAtPrice?.amount ? parseFloat(vNode.compareAtPrice.amount) : undefined,
              selectedOptions: vNode.selectedOptions || [],
            };
          });

          setProduct({
            id: node.id,
            title: node.title || 'Untitled',
            category: node.productType || undefined,
            price: price,
            compareAtPrice: compareAt && compareAt > price ? compareAt : undefined,
            discount: calculatedDiscount,
            image: node.featuredImage?.url || '',
            description: node.description || undefined,
            sizes: availableSizes,
            colors: availableColors,
            variants: parsedVariants,
          });

          if (availableSizes.length > 0) setSelectedSize(availableSizes[0]);
          if (availableColors.length > 0) setSelectedColor(availableColors[0]);
        }
      } catch (err) {
        console.warn('Failed to load GraphQL product details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [params?.id]);



  if (isLoading || !product) {
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
              onPress={() => product && toggleWishlist(product.id)}
              activeOpacity={0.8}
            >
              <Heart
                size={20}
                color={isFavorite ? colors.destructive : colors.mutedForeground}
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
          {product.category ? (
            <Text style={styles.categoryText}>{product.category}</Text>
          ) : null}

          {/* Title */}
          <Text style={styles.titleText}>{product.title}</Text>



          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.currentPriceText}>${product.price}</Text>
            {product.compareAtPrice != null && product.compareAtPrice > 0 ? (
              <Text style={styles.comparePriceText}>${product.compareAtPrice}</Text>
            ) : null}
          </View>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 ? (
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
          ) : null}

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 ? (
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          ) : null}

          {/* Description */}
          {product.description ? (
            <>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </>
          ) : null}

          {/* Write a Review Button */}
          <TouchableOpacity style={styles.reviewButton} activeOpacity={0.8}>
            <Text style={styles.reviewButtonText}>Write a Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <BottomActionBar
        isFavorite={isFavorite}
        onToggleFavorite={() => product && toggleWishlist(product.id)}
        onAddToCart={() => {
          if (!product || !product.variants || product.variants.length === 0) return;

          // Find variant matching selected size and color
          const matchingVariant = product.variants.find((v) => {
            const sizeMatch = !selectedSize || v.selectedOptions.some(
              (opt) => opt.name.toLowerCase() === 'size' && opt.value === selectedSize
            );
            const colorMatch = !selectedColor || v.selectedOptions.some(
              (opt) => opt.name.toLowerCase() === 'color' && opt.value === selectedColor
            );
            return sizeMatch && colorMatch;
          });

          const variantToUse = matchingVariant || product.variants[0];
          if (variantToUse) {
            addToCart(variantToUse.id, 1);
          }
        }}
      />
    </View>
  );
}
