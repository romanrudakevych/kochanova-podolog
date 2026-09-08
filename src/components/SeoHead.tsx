import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { applyHead } from "@/seo/head";
import { buildJsonLd } from "@/seo/jsonld";
import { matchSeoRoute, normalizePath } from "@/seo/routes";
import { absoluteAssetUrl, absoluteUrl, DEFAULT_OG_IMAGE_PATH } from "@/seo/site";

export function SeoHead() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const path = normalizePath(pathname);
    const route = matchSeoRoute(path);
    const language = (i18n.resolvedLanguage || i18n.language || "cs").split("-")[0];
    const title = route ? t(route.titleKey) : t("notFound.metaTitle");
    const description = route ? t(route.descriptionKey) : t("notFound.metaDescription");
    const indexable = route ? route.index !== false : false;

    applyHead({
      title,
      description,
      canonical: absoluteUrl(path),
      robots: indexable ? "index, follow" : "noindex, nofollow",
      ogType: route?.ogType ?? "website",
      ogImage: absoluteAssetUrl(DEFAULT_OG_IMAGE_PATH),
      ogLocale: language === "ru" ? "ru_RU" : "cs_CZ",
      jsonLd: route ? buildJsonLd(path, t) : null,
    });
  }, [pathname, t, i18n.resolvedLanguage, i18n.language]);

  return null;
}
