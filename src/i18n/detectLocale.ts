import { isSupportedLocale, LOCALE_STORAGE_KEY, type SupportedLocale } from "./constants";

/** Default when the browser does not prefer Czech or Russian. */
const DEFAULT_LOCALE: SupportedLocale = "cs";

function localeFromNavigator(): SupportedLocale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const base = raw.split("-")[0]?.toLowerCase();
    if (isSupportedLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function getInitialLocale(): SupportedLocale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isSupportedLocale(stored)) return stored;
  } catch {
    /* private mode */
  }
  return localeFromNavigator();
}
