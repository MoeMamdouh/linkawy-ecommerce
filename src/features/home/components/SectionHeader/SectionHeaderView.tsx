// ──────────────────────────────────────────────
// SectionHeader — View
// ──────────────────────────────────────────────

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { createSectionHeaderStyles } from './sectionHeader.styles';
import { useTheme } from '@shared/hooks/use-theme';

interface SectionHeaderViewProps {
  title: string;
  onSeeAll?: () => void;
  rightElement?: React.ReactNode; // optional custom element (e.g. countdown timer)
}

const SectionHeaderView: React.FC<SectionHeaderViewProps> = ({
  title,
  onSeeAll,
  rightElement,
}) => {
  const { colors } = useTheme();
  const styles = createSectionHeaderStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        {rightElement}
      </View>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeaderView;
