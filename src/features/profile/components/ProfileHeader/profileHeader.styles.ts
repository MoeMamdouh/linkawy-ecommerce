import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createProfileHeaderStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 24,
    },
    userRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    avatarText: {
      color: "#FFFFFF",
      fontSize: 22,
      fontWeight: "900",
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      color: "#FFFFFF",
      fontSize: 20,
      fontWeight: "900",
    },
    userEmail: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: 14,
      marginTop: 2,
    },
  });
