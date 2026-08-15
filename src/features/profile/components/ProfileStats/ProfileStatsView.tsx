import { ProfileStat } from "@features/profile/types/profile.types";
import { useTheme } from "@shared/hooks/use-theme";
import React from "react";
import { Text, View } from "react-native";
import { createProfileStatsStyles } from "./profileStats.styles";

interface ProfileStatsViewProps {
  stats: ProfileStat[];
}

export function ProfileStatsView({ stats }: ProfileStatsViewProps) {
  const { colors } = useTheme();
  const styles = createProfileStatsStyles(colors);

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}
