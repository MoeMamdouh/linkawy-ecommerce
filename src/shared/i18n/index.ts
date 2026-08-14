import AsyncStorage from "@react-native-async-storage/async-storage";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import ar from "./ar.json";
import en from "./en.json";

const i18n = createInstance();

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export async function initializeI18n() {
  if (i18n.isInitialized) {
    return i18n;
  }

  const savedLanguage = await AsyncStorage.getItem("language");

  const language = savedLanguage === "ar" ? "ar" : "en";
const shouldBeRTL = language === "ar";

I18nManager.allowRTL(shouldBeRTL);
I18nManager.forceRTL(shouldBeRTL);
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });

  return i18n;
}

export async function changeLanguage(language: "en" | "ar") {
  await AsyncStorage.setItem("language", language);

  if (!i18n.isInitialized) {
    await initializeI18n();
  }

  await i18n.changeLanguage(language);

  const shouldBeRTL = language === "ar";

  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
  }

  return i18n;
}

export default i18n;