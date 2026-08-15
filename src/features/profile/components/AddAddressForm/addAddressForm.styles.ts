import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createAddAddressFormStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    fieldGroup: {
      gap: 6,
    },
    fieldLabel: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.mutedForeground,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    input: {
      backgroundColor: colors.muted,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 15,
      color: colors.foreground,
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: 18,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: "900",
      color: "#FFFFFF",
    },
    errorText: {
      fontSize: 14,
      color: "#EF4444",
      textAlign: "center",
    },
  });
