import { ThemedText } from "@shared/components/themed-text";
import { Colors, FontFamily, FontSize } from "@shared/constants/theme";
import React from "react";
import { View } from "react-native";
import { ProfileStat } from "../types/profile.types";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileStats } from "./ProfileStats";

interface ProfileHeaderCardProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  stats: ProfileStat[];
  colorScheme: "light" | "dark";
}

export function ProfileHeaderCard({
  firstName,
  lastName,
  email,
  stats,
  colorScheme,
}: ProfileHeaderCardProps) {
  const colors = Colors[colorScheme];
  const mutedText = colorScheme === "light" ? "#E5D9FF" : colors.mutedForeground;

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 24,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <ProfileAvatar firstName={firstName} lastName={lastName} colorScheme={colorScheme} />
        <View>
          <ThemedText
            style={{
              color: colors.primaryForeground,
              fontSize: FontSize.xxl,
              fontFamily: FontFamily.semiBold,
            }}
          >
            {firstName || "Customer"} {lastName || ""}
          </ThemedText>
          <ThemedText style={{ color: mutedText, fontSize: 15, marginTop: 4 }}>
            {email || ""}
          </ThemedText>
        </View>
      </View>

      <ProfileStats stats={stats} colorScheme={colorScheme} />
    </View>
  );
}