import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

import ar from "./ar.json";
import en from "./en.json";

const LANGUAGE_KEY = "user_language";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

// Initialize i18next synchronously on module load
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export const initializeI18n = async (): Promise<void> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      const isRTL = savedLanguage === "ar";
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      await i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error("Error loading saved language:", error);
  }
};

export const changeLanguage = async (lang: "en" | "ar"): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    const isRTL = lang === "ar";
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    await i18n.changeLanguage(lang);
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

export default i18n;
