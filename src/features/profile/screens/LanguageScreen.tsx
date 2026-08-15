import { changeLanguage } from "@shared/i18n";
import { ScreenHeader } from "@shared/components/ui/screen-header";
import { useTheme } from "@shared/hooks/use-theme";
import { CheckCircle2 } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createLanguageScreenStyles } from "./languageScreen.styles";

type LanguageOption = "en" | "ar";

export default function LanguageScreen() {
  const { colors } = useTheme();
  const styles = createLanguageScreenStyles(colors);
  const { i18n, t } = useTranslation();

  const currentLanguage = (i18n.language || "en").startsWith("ar") ? "ar" : "en";

  const options: {
    key: LanguageOption;
    label: string;
    flag: string;
    direction: string;
  }[] = [
    {
      key: "en",
      label: t("profile.english", { defaultValue: "English" }),
      flag: "🇺🇸",
      direction: "Left to right",
    },
    {
      key: "ar",
      label: t("profile.arabic", { defaultValue: "العربية" }),
      flag: "🇸🇦",
      direction: "يمين إلى يسار",
    },
  ];

  const handleLanguageChange = (lang: LanguageOption) => {
    void changeLanguage(lang);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={["top"]}>
      <ScreenHeader title={t("profile.language", { defaultValue: "Language" })} />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.optionsContainer}>
          {options.map((option) => {
            const isSelected = currentLanguage === option.key;

            return (
              <Pressable
                key={option.key}
                onPress={() => handleLanguageChange(option.key)}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedCard,
                ]}
              >
                <View style={styles.flagBox}>
                  <Text style={styles.flagText}>{option.flag}</Text>
                </View>

                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.label,
                      isSelected && styles.selectedLabel,
                    ]}
                  >
                    {option.label}
                  </Text>
                  <Text style={styles.direction}>{option.direction}</Text>
                </View>

                {isSelected && (
                  <CheckCircle2 size={20} color={colors.primary} />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
