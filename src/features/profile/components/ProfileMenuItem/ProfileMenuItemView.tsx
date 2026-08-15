import { ProfileMenuItem } from "@features/profile/types/profile.types";
import { useTheme } from "@shared/hooks/use-theme";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, Text, TouchableOpacity, View } from "react-native";
import { createProfileMenuItemStyles } from "./profileMenuItem.styles";

export function ProfileMenuItemView({
  label,
  value,
  Icon,
  onPress,
  isDestructive,
}: ProfileMenuItem) {
  const { colors } = useTheme();
  const styles = createProfileMenuItemStyles(colors);
  const { i18n } = useTranslation();

  const isRTL = (i18n.language || "en").startsWith("ar") || I18nManager.isRTL;
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const iconColor = isDestructive ? "#EF4444" : colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        isDestructive && styles.destructiveContainer,
      ]}
    >
      <View
        style={[
          styles.iconBox,
          isDestructive && styles.destructiveIconBox,
        ]}
      >
        <Icon size={18} color={iconColor} />
      </View>

      <Text
        style={[
          styles.label,
          isDestructive && styles.destructiveLabel,
        ]}
      >
        {label}
      </Text>

      {!!value && <Text style={styles.value}>{value}</Text>}

      {!isDestructive && (
        <ChevronIcon size={16} color={colors.mutedForeground} />
      )}
    </TouchableOpacity>
  );
}
