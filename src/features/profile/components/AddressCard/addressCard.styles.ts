import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createAddressCardStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 14,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: "rgba(107, 70, 193, 0.1)",
      alignItems: "center",
      justifyContent: "center",
    },
    infoContainer: {
      flex: 1,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    streetAddress: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.foreground,
    },
    defaultBadge: {
      backgroundColor: "rgba(107, 70, 193, 0.15)",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
    },
    defaultBadgeText: {
      fontSize: 10,
      fontWeight: "700",
      color: colors.primary,
    },
    subText: {
      fontSize: 13,
      color: colors.mutedForeground,
      marginTop: 4,
    },
  });
