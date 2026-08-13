import { ThemedText } from "@shared/components/themed-text";
import { Colors, FontFamily, FontSize } from "@shared/constants/theme";
import React from "react";
import { View } from "react-native";

interface ProfileAvatarProps {
  firstName?: string;
  lastName?: string;
  colorScheme: "light" | "dark";
}

export function ProfileAvatar({ firstName, lastName, colorScheme }: ProfileAvatarProps) {
  const colors = Colors[colorScheme];

  return (
    <View
      style={{
        width: 72,
        height: 72,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.primaryForeground,
        backgroundColor: colorScheme === "light" ? "#9B72E8" : colors.secondary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemedText
        style={{
          color: colors.primaryForeground,
          fontSize: FontSize.xxl,
          fontFamily: FontFamily.semiBold,
        }}
      >
        {firstName?.charAt(0) ?? "U"}
        {lastName?.charAt(0) ?? ""}
      </ThemedText>
    </View>
  );
}