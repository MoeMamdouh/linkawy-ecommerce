import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createLanguageScreenStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    optionsContainer: {
      gap: 14,
    },
    optionCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      padding: 16,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    selectedCard: {
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: "rgba(107, 70, 193, 0.06)",
    },
    flagBox: {
      width: 52,
      height: 52,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F0EEFA",
    },
    flagText: {
      fontSize: 28,
    },
    textContainer: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.foreground,
    },
    selectedLabel: {
      color: colors.primary,
    },
    direction: {
      fontSize: 13,
      color: colors.mutedForeground,
      marginTop: 2,
    },
  });
