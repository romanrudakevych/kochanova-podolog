export const LOCALE_STORAGE_KEY = "podolog-locale";

export const SUPPORTED_LOCALES = ["cs", "ru"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
