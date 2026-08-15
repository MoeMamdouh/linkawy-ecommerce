import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createOrderCardStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    orderNumber: {
      fontSize: 16,
      fontWeight: "900",
      color: colors.foreground,
    },
    orderDate: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 2,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: "rgba(107, 70, 193, 0.1)",
    },
    statusText: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.primary,
      textTransform: "capitalize",
    },
    itemsRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 12,
    },
    thumbnail: {
      width: 52,
      height: 52,
      borderRadius: 12,
      backgroundColor: colors.muted,
    },
    moreItemsBox: {
      width: 52,
      height: 52,
      borderRadius: 12,
      backgroundColor: colors.muted,
      alignItems: "center",
      justifyContent: "center",
    },
    moreItemsText: {
      fontSize: 12,
      fontWeight: "800",
      color: colors.mutedForeground,
    },
    footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
    },
    itemCountText: {
      fontSize: 13,
      color: colors.mutedForeground,
    },
    totalPriceText: {
      fontSize: 16,
      fontWeight: "900",
      color: colors.primary,
    },
  });
