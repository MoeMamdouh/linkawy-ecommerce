import { ThemedText } from "@shared/components/themed-text";
import { Colors, FontFamily, FontSize } from "@shared/constants/theme";
import React from "react";
import { View } from "react-native";
import { ProfileStat } from "../types/profile.types";

interface ProfileStatsProps {
  stats: ProfileStat[];
  colorScheme: "light" | "dark";
}

export function ProfileStats({ stats, colorScheme }: ProfileStatsProps) {
  const colors = Colors[colorScheme];
  const mutedText = colorScheme === "light" ? "#E5D9FF" : colors.mutedForeground;

  return (
    <View style={{ flexDirection: "row", gap: 20, marginTop: 25 }}>
      {stats.map((stat) => (
        <View
          key={stat.label}
          style={{
            flex: 1,
            backgroundColor: colorScheme === "light" ? "#8050D8" : colors.secondary,
            borderRadius: 18,
            paddingVertical: 15,
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{
              color: colors.primaryForeground,
              fontSize: FontSize.xxl,
              fontFamily: FontFamily.bold,
            }}
          >
            {stat.value}
          </ThemedText>
          <ThemedText style={{ color: mutedText, fontSize: FontSize.sm, marginTop: 3 }}>
            {stat.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}