import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "@/consent/useCookieConsent";
import { isSupportedLocale, LOCALE_STORAGE_KEY } from "@/i18n/constants";

/** Persists the UI language only after preference cookies are allowed. */
export function PersistLocalePreference() {
  const { i18n } = useTranslation();
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (!consent?.preferences) return;
    const base = (i18n.resolvedLanguage || i18n.language || "cs").split("-")[0];
    if (!isSupportedLocale(base)) return;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, base);
    } catch {
      /* ignore */
    }
  }, [consent?.preferences, i18n.resolvedLanguage, i18n.language]);

  return null;
}
