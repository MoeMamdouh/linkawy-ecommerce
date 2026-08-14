import { ThemedText } from "@shared/components/themed-text";
import { Colors, FontFamily, FontSize } from "@shared/constants/theme";
import { changeLanguage } from "@shared/i18n";
import { useResolvedTheme } from "@shared/store/useThemeStore";
import { CheckCircle2, Globe } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

type LanguageOption = "en" | "ar";

export default function LanguageScreen() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const themeMode = useResolvedTheme();
  const colors = Colors[themeMode];

  const options: {
    key: LanguageOption;
    label: string;
  }[] = [
    {
      key: "en",
      label: t("profile.english"),
    },
    {
      key: "ar",
      label: t("profile.arabic"),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Options */}
      <View style={{ padding: 20, gap: 14 }}>
        {options.map((option) => {
          const isSelected = currentLanguage === option.key;

          return (
            <Pressable
              key={option.key}
              onPress={() => changeLanguage(option.key)}
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
                  backgroundColor: isSelected ? "#F0EEFA" : "#F0EEFA",
                }}
              >
                <Globe size={22} color={colors.primary} />
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