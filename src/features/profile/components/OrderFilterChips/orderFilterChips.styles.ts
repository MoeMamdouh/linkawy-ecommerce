import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createOrderFilterChipsStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.muted,
    },
    activeChip: {
      backgroundColor: colors.primary,
    },
    chipText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.mutedForeground,
    },
    activeChipText: {
      color: "#FFFFFF",
      fontWeight: "700",
    },
  });
