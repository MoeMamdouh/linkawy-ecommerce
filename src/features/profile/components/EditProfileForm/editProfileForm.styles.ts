import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createEditProfileFormStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    avatarSection: {
      alignItems: "center",
      marginBottom: 8,
    },
    avatarBox: {
      width: 80,
      height: 80,
      borderRadius: 24,
      backgroundColor: "rgba(107, 70, 193, 0.15)",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    avatarText: {
      fontSize: 28,
      fontWeight: "900",
      color: colors.primary,
    },
    avatarHint: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 8,
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
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: 18,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: "900",
      color: "#FFFFFF",
    },
    errorText: {
      fontSize: 14,
      color: "#EF4444",
      textAlign: "center",
    },
    successText: {
      fontSize: 14,
      color: "#10B981",
      textAlign: "center",
    },
  });
