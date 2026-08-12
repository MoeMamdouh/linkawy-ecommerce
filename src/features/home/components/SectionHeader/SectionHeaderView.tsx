// ──────────────────────────────────────────────
// SectionHeader — View
// ──────────────────────────────────────────────

import { useTheme } from '@shared/hooks/use-theme';
import React from 'react';
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from 'react-native';
import { createSectionHeaderStyles } from './sectionHeader.styles';
const { t } = useTranslation();

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
          <Text style={styles.seeAllText}>{t("sectionHeader.seeAll")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
    

export default SectionHeaderView;
