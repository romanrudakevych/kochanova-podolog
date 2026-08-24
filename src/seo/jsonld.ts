import { BUSINESS, SITE_NAME, absoluteAssetUrl, absoluteUrl, DEFAULT_OG_IMAGE_PATH, getSiteUrl } from "./site";
import type { SeoRoute } from "./routes";
import { HOME_PATH, matchSeoRoute } from "./routes";

type Translate = (key: string) => string;

function localBusinessNode(origin: string) {
  return {
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "@id": `${absoluteUrl(HOME_PATH, origin)}#business`,
    name: SITE_NAME,
    image: absoluteAssetUrl(DEFAULT_OG_IMAGE_PATH, origin),
    url: absoluteUrl(HOME_PATH, origin),
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    openingHours: BUSINESS.openingHours,
    sameAs: [BUSINESS.instagram],
    areaServed: {
      "@type": "City",
      name: "Praha",
    },
  };
}

function breadcrumbList(pathname: string, t: Translate, origin: string) {
  const route = matchSeoRoute(pathname);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: t("nav.home"),
      item: absoluteUrl(HOME_PATH, origin),
    },
  ];

  if (route && route.path !== HOME_PATH) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: t(route.breadcrumbKey ?? route.titleKey),
      item: absoluteUrl(route.path, origin),
    });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export function buildJsonLd(pathname: string, t: Translate, origin = getSiteUrl()): object | null {
  const route = matchSeoRoute(pathname);
  if (!route) return null;

  const graph: object[] = [breadcrumbList(pathname, t, origin)];

  if (route.jsonLd === "home") {
    graph.unshift(localBusinessNode(origin), {
      "@type": "WebSite",
      "@id": `${absoluteUrl(HOME_PATH, origin)}#website`,
      name: SITE_NAME,
      url: absoluteUrl(HOME_PATH, origin),
      inLanguage: "cs",
      publisher: { "@id": `${absoluteUrl(HOME_PATH, origin)}#business` },
    });
  }

  if (route.jsonLd === "service") {
    graph.unshift({
      "@type": "Service",
      name: t(route.breadcrumbKey ?? route.titleKey),
      description: t(route.descriptionKey),
      url: absoluteUrl(route.path, origin),
      provider: { "@id": `${absoluteUrl(HOME_PATH, origin)}#business` },
      areaServed: { "@type": "City", name: "Praha" },
      ...(route.servicePrice
        ? {
            offers: {
              "@type": "Offer",
              price: route.servicePrice,
              priceCurrency: route.servicePriceCurrency ?? "CZK",
            },
          }
        : {}),
    });
    graph.push(localBusinessNode(origin));
  }

  if (route.jsonLd === "webPage" || route.jsonLd === "reservation") {
    graph.unshift({
      "@type": "WebPage",
      name: t(route.titleKey),
      description: t(route.descriptionKey),
      url: absoluteUrl(route.path, origin),
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: absoluteUrl(HOME_PATH, origin) },
      inLanguage: "cs",
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
