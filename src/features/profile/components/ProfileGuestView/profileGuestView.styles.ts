import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createProfileGuestViewStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
      backgroundColor: colors.background,
    },
    card: {
      width: "100%",
      alignItems: "center",
      gap: 16,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 24,
      padding: 24,
    },
    iconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: "rgba(107, 70, 193, 0.1)",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.foreground,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      color: colors.mutedForeground,
      textAlign: "center",
      marginTop: 4,
    },
    button: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 14,
      marginTop: 8,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });
