import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { isSupportedLocale, LOCALE_STORAGE_KEY, SUPPORTED_LOCALES, type SupportedLocale } from "./constants";
import { getInitialLocale } from "./detectLocale";

import cs from "./locales/cs.json";
import ru from "./locales/ru.json";

const resources = {
  cs: { translation: cs },
  ru: { translation: ru },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLocale(),
  fallbackLng: "cs",
  supportedLngs: [...SUPPORTED_LOCALES],
  interpolation: { escapeValue: false },
  returnNull: false,
});

i18n.on("languageChanged", (lng) => {
  const base = lng.split("-")[0]?.toLowerCase() ?? lng;
  if (isSupportedLocale(base)) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, base);
    } catch {
      /* ignore */
    }
  }
});

export default i18n;
