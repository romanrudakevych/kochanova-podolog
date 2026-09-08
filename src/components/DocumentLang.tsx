import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/** Syncs `<html lang>` with the active locale. Page titles and meta live in SeoHead. */
export function DocumentLang() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = (i18n.resolvedLanguage || i18n.language || "cs").split("-")[0];
    document.documentElement.lang = lang;
  }, [i18n.resolvedLanguage, i18n.language]);

  return null;
}
