import { ThemeColors } from "@shared/constants/theme";
import { StyleSheet } from "react-native";

export const createProfileStatsStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 12,
      marginTop: 20,
    },
    statCard: {
      flex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 8,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    statValue: {
      color: "#FFFFFF",
      fontSize: 22,
      fontWeight: "900",
    },
    statLabel: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: 12,
      marginTop: 2,
    },
  });
