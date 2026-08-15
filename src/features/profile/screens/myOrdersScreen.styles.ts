import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createMyOrdersScreenStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    listContent: {
      padding: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 32,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.foreground,
      marginTop: 16,
    },
    emptySubtitle: {
      fontSize: 14,
      color: colors.mutedForeground,
      textAlign: "center",
      marginTop: 6,
    },
  });
