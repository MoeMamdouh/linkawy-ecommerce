import { ThemedText } from "@shared/components/themed-text";
import { Button } from "@shared/components/ui/button";
import { changeLanguage } from "@shared/i18n";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function LanguageScreen() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
   
   
 return (
   
    <View style={{ flex: 1, padding: 20, gap: 12 }}>
      <ThemedText>
        {t("profile.language")}
      </ThemedText>

      <Button
        variant="transparent"
        onPress={() => changeLanguage("en")}
      >
        <ThemedText>
          {currentLanguage === "en" ? "✓ " : ""}
          {t("profile.english")}
        </ThemedText>
      </Button>

      <Button
        variant="transparent"
        onPress={() => changeLanguage("ar")}
      >
        <ThemedText>
          {currentLanguage === "ar" ? "✓ " : ""}
          {t("profile.arabic")}
        </ThemedText>
      </Button>
    </View>
  );
}