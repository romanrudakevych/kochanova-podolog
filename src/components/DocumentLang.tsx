import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/** Syncs `<html lang>`, document title, and primary meta tags with the active locale. */
export function DocumentLang() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const lang = (i18n.resolvedLanguage || i18n.language || "cs").split("-")[0];
    document.documentElement.lang = lang;
    document.title = t("meta.title");

    const desc = document.querySelector('meta[name="description"]');
    desc?.setAttribute("content", t("meta.description"));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute("content", t("meta.ogTitle"));

    const ogDesc = document.querySelector('meta[property="og:description"]');
    ogDesc?.setAttribute("content", t("meta.ogDescription"));
  }, [i18n.resolvedLanguage, i18n.language, t]);

  return null;
}
