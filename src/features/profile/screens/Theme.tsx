import { ThemedText } from "@shared/components/themed-text";
import { Colors, FontFamily, FontSize } from "@shared/constants/theme";
import { useResolvedTheme, useThemeStore } from "@shared/store/useThemeStore";
import { useRouter } from "expo-router";
import { CheckCircle2, Moon, Sun } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

type ThemeOption = "light" | "dark";

export default function ThemeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  // دول بقوا جوه الـ component
  const themeMode = useResolvedTheme();
  const setThemeOverride = useThemeStore((state) => state.setThemeOverride);

  const colors = Colors[themeMode];

  const options: {
    key: ThemeOption;
    label: string;
    description: string;
    Icon: typeof Sun;
  }[] = [
    {
      key: "light",
      label: t("theme.lightMode"),
      description: t("theme.lightModeDescription"),
      Icon: Sun,
    },
    {
      key: "dark",
      label: t("theme.darkMode"),
      description: t("theme.darkModeDescription"),
      Icon: Moon,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      {/* Options */}
      <View style={{ padding: 20, gap: 14 }}>
        {options.map((option) => {
          const isSelected = themeMode === option.key;
          const Icon = option.Icon;

          return (
            <Pressable
              key={option.key}
              onPress={() => setThemeOverride(option.key)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                padding: 16,
                borderRadius: 18,
                borderWidth: isSelected ? 2 : 1,
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: isSelected ? colors.primaryLight : colors.card,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: option.key === "dark" ? "#1C1C28" : "#F0EEFA",
                }}
              >
                <Icon
                  size={22}
                  color={option.key === "dark" ? "#9B93AF" : colors.primary}
                />
              </View>

              <View style={{ flex: 1 }}>
                <ThemedText
                  style={{
                    fontSize: FontSize.md,
                    fontFamily: FontFamily.bold,
                    color: isSelected ? colors.primary : colors.foreground,
                  }}
                >
                  {option.label}
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: FontSize.sm,
                    color: colors.mutedForeground,
                    marginTop: 2,
                  }}
                >
                  {option.description}
                </ThemedText>
              </View>

              {isSelected && (
                <CheckCircle2 size={22} color={colors.primary} />
              )}
            </Pressable>
          );
        })}
      </View>

       
    </View>
  );
}