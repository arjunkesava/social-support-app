import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import arTranslations from "./locales/ar.json";
import enTranslations from "./locales/en.json";
import esTranslations from "./locales/es.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

const savedLng = localStorage.getItem("social_support_lang") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLng,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safe from xss
  },
});

export default i18n;
