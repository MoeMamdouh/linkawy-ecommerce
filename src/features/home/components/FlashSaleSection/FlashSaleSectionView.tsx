// ──────────────────────────────────────────────
// FlashSaleSection — View
// ──────────────────────────────────────────────

import { useTheme } from '@shared/hooks/use-theme';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../types/home.types';
import { SectionHeaderView } from '../SectionHeader';
import { createFlashSaleSectionStyles } from './flashSaleSection.styles';
import { useFlashSaleTimer } from './useFlashSaleTimer';

interface FlashSaleSectionViewProps {
  products: Product[];
  endTime: number;
  onProductPress?: (product: Product) => void;
  onSeeAll?: () => void;
}

const FlashSaleSectionView: React.FC<FlashSaleSectionViewProps> = ({
  products,
  endTime,
  onProductPress,
  onSeeAll,
}) => {
  const { colors } = useTheme();
  const styles = createFlashSaleSectionStyles(colors);
  const timer = useFlashSaleTimer(endTime);
const { t } = useTranslation();
  const TimerBadge = (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{timer.hours}</Text>
      <Text style={styles.timerSeparator}>:</Text>
      <Text style={styles.timerText}>{timer.minutes}</Text>
      <Text style={styles.timerSeparator}>:</Text>
      <Text style={styles.timerText}>{timer.seconds}</Text>
    </View>
  );

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onProductPress?.(item)}
        activeOpacity={0.85}
      >
        <View style={styles.cardImageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.cardImage}
            contentFit="cover"
            transition={200}
          />
          {item.discount != null && item.discount > 0 ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>${item.price}</Text>
            {item.compareAtPrice != null && item.compareAtPrice > 0 ? (
              <Text style={styles.comparePrice}>${item.compareAtPrice}</Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    ),
    [styles, onProductPress]
  );

  return (
    <View>
      <SectionHeaderView
  title={t("flashSale.title")}
  rightElement={TimerBadge}
  onSeeAll={onSeeAll}
/>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default FlashSaleSectionView;
