import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import translationKR from "./locales/kr/translation.json"
import translationRU from "./locales/ru/translation.json"
import translationQQ from "./locales/qq/translation.json"
import translationUZ from "./locales/uz/translation.json"
import translationENG from "./locales/eng/translation.json"

// the translations
const resources = {
  kr: {
    translation: translationKR,
  },
  ru: {
    translation: translationRU,
  },
  qq: {
    translation: translationQQ,
  },
  uz: {
    translation: translationUZ,
  },
  eng: {
    translation: translationENG,
  },
}

const language = localStorage.getItem("I18N_LANGUAGE")
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "uz")
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "uz",
    fallbackLng: "eng", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n
