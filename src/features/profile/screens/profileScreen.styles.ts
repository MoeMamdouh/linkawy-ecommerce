import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createProfileScreenStyles = (colors: ThemeColors) =>
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
    scrollContent: {
      flexGrow: 1,
    },
    menuSection: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      gap: 12,
    },
  });
