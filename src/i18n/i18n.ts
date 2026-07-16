import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { isSupportedLocale, LOCALE_STORAGE_KEY, SUPPORTED_LOCALES } from "./constants";
import { getInitialLocale } from "./detectLocale";

import cs from "./locales/cs.json";

export async function initI18n() {
  const initialLocale = getInitialLocale();

  const resources: Record<string, { translation: typeof cs }> = {
    cs: { translation: cs },
  };

  if (initialLocale === "ru") {
    const ru = await import("./locales/ru.json");
    resources.ru = { translation: ru.default };
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: initialLocale,
    fallbackLng: "cs",
    supportedLngs: [...SUPPORTED_LOCALES],
    partialBundledLanguages: true,
    interpolation: { escapeValue: false },
    returnNull: false,
  });

  i18n.on("languageChanged", async (lng) => {
    const base = lng.split("-")[0]?.toLowerCase() ?? lng;
    if (isSupportedLocale(base)) {
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, base);
      } catch {
        /* ignore */
      }
      if (base === "ru" && !i18n.hasResourceBundle("ru", "translation")) {
        const ru = await import("./locales/ru.json");
        i18n.addResourceBundle("ru", "translation", ru.default, true, true);
      }
    }
  });
}

export default i18n;
