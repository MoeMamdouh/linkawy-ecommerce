import { useTheme } from "@shared/hooks/use-theme";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { createOrderFilterChipsStyles } from "./orderFilterChips.styles";

interface OrderFilterChipsViewProps {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

export function OrderFilterChipsView({
  selectedFilter,
  onSelectFilter,
}: OrderFilterChipsViewProps) {
  const { colors } = useTheme();
  const styles = createOrderFilterChipsStyles(colors);
  const { t } = useTranslation();

  const filters = [
    { key: "all", label: t("shop.all", { defaultValue: "All" }) },
    { key: "processing", label: "Processing" },
    { key: "fulfilled", label: "Fulfilled" },
    { key: "unfulfilled", label: "Unfulfilled" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <View style={{ backgroundColor: colors.card }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {filters.map((f) => {
          const isActive = selectedFilter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => onSelectFilter(f.key)}
              activeOpacity={0.7}
              style={[styles.chip, isActive && styles.activeChip]}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive && styles.activeChipText,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
