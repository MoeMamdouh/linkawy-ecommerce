import { ThemedText } from "@shared/components/themed-text";
import { Button } from "@shared/components/ui/button";
import { Colors, FontFamily, FontSize } from "@shared/constants/theme";
import React from "react";
import { View } from "react-native";
import { ProfileMenuItem as ProfileMenuItemType } from "../types/profile.types";

interface ProfileMenuItemProps {
  item: ProfileMenuItemType;
  colorScheme: "light" | "dark";
}

export function ProfileMenuItem({ item, colorScheme }: ProfileMenuItemProps) {
  const colors = Colors[colorScheme];
  const Icon = item.Icon;

  return (
    <Button
      variant="transparent"
      onPress={item.onPress}
      style={{
        height: 72,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 18,
        paddingHorizontal: 16,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flex: 1 }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: colors.primaryLight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color={colors.primary} />
        </View>

        <ThemedText
          style={{
            color: colors.foreground,
            fontSize: FontSize.md,
            fontFamily: FontFamily.black,
          }}
        >
          {item.label}
        </ThemedText>
      </View>

      {item.value !== "" && (
        <ThemedText style={{ color: colors.mutedForeground, fontSize: FontSize.sm, marginRight: 10 }}>
          {item.value}
        </ThemedText>
      )}

      <ThemedText style={{ color: colors.mutedForeground, fontSize: FontSize.xxl }}>
        ›
      </ThemedText>
    </Button>
  );
}