import { useTheme } from "@shared/hooks/use-theme";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
}

export function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const { i18n } = useTranslation();

  const isRTL = (i18n.language || "en").startsWith("ar") || I18nManager.isRTL;
  const ChevronIcon = isRTL ? ChevronRight : ChevronLeft;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <TouchableOpacity
        onPress={handleBack}
        style={styles.backButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        activeOpacity={0.7}
      >
        <ChevronIcon size={22} color={colors.foreground} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.foreground }]}>
        {title}
      </Text>

      <View style={styles.rightPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  rightPlaceholder: {
    width: 40,
  },
});
