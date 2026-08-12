import { useTheme } from '@shared/hooks/use-theme';
import {
  Dumbbell,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
} from 'lucide-react-native';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../../types/home.types';
import { SectionHeaderView } from '../SectionHeader';
import { createCategoriesSectionStyles } from './categoriesSection.styles';
interface CategoriesSectionViewProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
  onSeeAll?: () => void;
}
const { t } = useTranslation();
// Map icon string names to actual lucide components
const iconMap: Record<string, React.FC<{ size: number; color: string }>> = {
  Shirt,
  Smartphone,
  Sparkles,
  Sofa,
  Dumbbell,
};

const CategoriesSectionView: React.FC<CategoriesSectionViewProps> = ({
  categories,
  onCategoryPress,
  onSeeAll,
}) => {
  const { colors } = useTheme();
  const styles = createCategoriesSectionStyles(colors);

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => {
      const IconComponent = iconMap[item.icon] || Shirt;
      return (
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => onCategoryPress?.(item)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            {IconComponent && (
              <IconComponent size={24} color={colors.primary} />
            )}
          </View>
          <Text style={styles.categoryName} numberOfLines={1}>
            {t(`categories.${item.handle}`,
             {
              defaultValue: item.name,
})}
          </Text>
        </TouchableOpacity>
      );
    },
    [styles, colors, onCategoryPress]
  );
const { t } = useTranslation();
  return (
    <View>
      <SectionHeaderView title={t("categories.title")} onSeeAll={onSeeAll}
/>
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
