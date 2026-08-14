import { ScreenHeader } from "@shared/components/ui/screen-header";
import { useTheme } from "@shared/hooks/use-theme";
import { CheckCircle2, Moon, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { Appearance, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createThemeScreenStyles } from "./themeScreen.styles";

export default function ThemeScreen() {
  const { colors, scheme } = useTheme();
  const styles = createThemeScreenStyles(colors);
  const { t } = useTranslation();
  const { setColorScheme } = useColorScheme();

  const handleSelectTheme = (mode: "light" | "dark") => {
    setColorScheme(mode);
    Appearance.setColorScheme(mode);
  };

  const options = [
    {
      key: "light" as const,
      label: t("theme.lightMode", { defaultValue: "Light Mode" }),
      description: t("theme.lightModeDescription", {
        defaultValue: "Clean and bright interface",
      }),
      Icon: Sun,
      bgColor: "#F5F5F7",
    },
    {
      key: "dark" as const,
      label: t("theme.darkMode", { defaultValue: "Dark Mode" }),
      description: t("theme.darkModeDescription", {
        defaultValue: "Easy on the eyes at night",
      }),
      Icon: Moon,
      bgColor: "#0F172A",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={["top"]}>
      <ScreenHeader title={t("theme.appearance", { defaultValue: "Appearance" })} />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.optionsContainer}>
          {options.map((option) => {
            const isSelected = scheme === option.key;
            const Icon = option.Icon;

            return (
              <Pressable
                key={option.key}
                onPress={() => handleSelectTheme(option.key)}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedCard,
                ]}
              >
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: option.bgColor },
                  ]}
                >
                  <Icon
                    size={22}
                    color={isSelected ? colors.primary : colors.mutedForeground}
                  />
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
                  <Text style={styles.description}>{option.description}</Text>
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
