import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createAddAddressScreenStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 20,
    },
  });
