import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createProfileMenuItemStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: "rgba(107, 70, 193, 0.1)",
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      flex: 1,
      fontSize: 15,
      fontWeight: "600",
      color: colors.foreground,
    },
    value: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginRight: 4,
    },
    // Destructive style variants (Logout)
    destructiveContainer: {
      backgroundColor: "rgba(239, 68, 68, 0.08)",
      borderColor: "rgba(239, 68, 68, 0.2)",
    },
    destructiveIconBox: {
      backgroundColor: "rgba(239, 68, 68, 0.15)",
    },
    destructiveLabel: {
      color: "#EF4444",
    },
  });
