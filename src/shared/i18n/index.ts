import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./ar.json";
import en from "./en.json";

export async function loadLanguage() {
  const savedLanguage = await AsyncStorage.getItem("language");

  return savedLanguage === "ar" ? "ar" : "en";
}
export async function initializeI18n() {
  const language = await loadLanguage();

  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: en,
        },
        ar: {
          translation: ar,
        },
      },
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
  await i18n.changeLanguage(language);
    return i18n;
}

export default i18n;
