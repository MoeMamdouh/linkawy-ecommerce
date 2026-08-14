import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createAddressesScreenStyles = (colors: ThemeColors) =>
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
      padding: 20,
    },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 18,
      paddingVertical: 16,
      marginHorizontal: 20,
      marginTop: 16,
      marginBottom: 8,
    },
    addButtonText: {
      fontSize: 16,
      fontWeight: "900",
      color: "#FFFFFF",
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
