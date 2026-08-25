export type SeoJsonLdKind = "home" | "service" | "webPage" | "reservation";

export type SeoRoute = {
  path: string;
  titleKey: string;
  descriptionKey: string;
  ogType?: "website" | "article";
  /** When false, the page is served with noindex, nofollow. */
  index?: boolean;
  jsonLd?: SeoJsonLdKind;
  breadcrumbKey?: string;
  navLabelKey?: string;
  relatedPaths?: string[];
  servicePrice?: string;
  servicePriceCurrency?: string;
};

export const HOME_PATH = "/";
export const COOKIE_POLICY_PATH = "/zasady-pouzivani-cookies";
export const PRIVACY_POLICY_PATH = "/zasady-ochrany-osobnich-udaju";
export const RESERVATION_PATH = "/rezervace";
export const RESERVATION_SUCCESS_PATH = "/reservation-success";

export const SEO_ROUTES: SeoRoute[] = [
  {
    path: HOME_PATH,
    titleKey: "meta.title",
    descriptionKey: "meta.description",
    ogType: "website",
    jsonLd: "home",
  },
  {
    path: RESERVATION_PATH,
    titleKey: "reservationPage.metaTitle",
    descriptionKey: "reservationPage.metaDescription",
    jsonLd: "reservation",
    breadcrumbKey: "reservationPage.breadcrumb",
  },
  {
    path: RESERVATION_SUCCESS_PATH,
    titleKey: "reservationSuccessPage.metaTitle",
    descriptionKey: "reservationSuccessPage.metaDescription",
    jsonLd: "webPage",
    breadcrumbKey: "reservationSuccessPage.breadcrumb",
    index: false,
  },
  {
    path: "/podologicka-konzultace-praha",
    titleKey: "consultationPage.metaTitle",
    descriptionKey: "consultationPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "consultationPage.title",
    navLabelKey: "services.consultation.title",
    relatedPaths: ["/zarostly-nehet-praha", "/podologicka-pedikura-praha", "/plisen-nehtu-praha"],
    servicePrice: "500",
  },
  {
    path: "/zarostly-nehet-praha",
    titleKey: "ingrownPage.metaTitle",
    descriptionKey: "ingrownPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "ingrownPage.title",
    navLabelKey: "services.ingrown.title",
    relatedPaths: ["/tamponada", "/nehtove-rovnatko-praha", "/podologicka-konzultace-praha"],
    servicePrice: "500",
  },
  {
    path: "/bradavice-praha",
    titleKey: "chiropodyPage.metaTitle",
    descriptionKey: "chiropodyPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "chiropodyPage.title",
    navLabelKey: "services.chiropody.title",
    relatedPaths: ["/kuri-oko-praha", "/plisen-nehtu-praha", "/podologicka-konzultace-praha"],
    servicePrice: "600",
  },
  {
    path: "/kuri-oko-praha",
    titleKey: "diabeticPage.metaTitle",
    descriptionKey: "diabeticPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "diabeticPage.title",
    navLabelKey: "services.diabetic.title",
    relatedPaths: ["/bradavice-praha", "/podologicka-pedikura-praha", "/podologicka-konzultace-praha"],
    servicePrice: "350",
  },
  {
    path: "/plisen-nehtu-praha",
    titleKey: "aestheticPage.metaTitle",
    descriptionKey: "aestheticPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "aestheticPage.title",
    navLabelKey: "services.aesthetic.title",
    relatedPaths: ["/bradavice-praha", "/podologicka-pedikura-praha", "/podologicka-konzultace-praha"],
    servicePrice: "350",
  },
  {
    path: "/nehtove-rovnatko-praha",
    titleKey: "biomechanicalPage.metaTitle",
    descriptionKey: "biomechanicalPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "biomechanicalPage.title",
    navLabelKey: "services.biomechanical.title",
    relatedPaths: ["/zarostly-nehet-praha", "/tamponada", "/podologicka-konzultace-praha"],
    servicePrice: "1200",
  },
  {
    path: "/podologicka-pedikura-praha",
    titleKey: "sportsPage.metaTitle",
    descriptionKey: "sportsPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "sportsPage.title",
    navLabelKey: "services.sports.title",
    relatedPaths: ["/kart-pedikura-praha", "/plisen-nehtu-praha", "/podologicka-konzultace-praha"],
    servicePrice: "1000",
  },
  {
    path: "/kart-pedikura-praha",
    titleKey: "kartPage.metaTitle",
    descriptionKey: "kartPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "kartPage.title",
    navLabelKey: "services.kart.title",
    relatedPaths: ["/podologicka-pedikura-praha", "/kuri-oko-praha", "/podologicka-konzultace-praha"],
    servicePrice: "1500",
  },
  {
    path: "/okluze",
    titleKey: "okluzePage.metaTitle",
    descriptionKey: "okluzePage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "okluzePage.title",
    navLabelKey: "services.okluze.title",
    relatedPaths: ["/plisen-nehtu-praha", "/bradavice-praha", "/podologicka-konzultace-praha"],
    servicePrice: "350",
  },
  {
    path: "/nadstavba-nehtu",
    titleKey: "clipflowPage.metaTitle",
    descriptionKey: "clipflowPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "clipflowPage.title",
    navLabelKey: "services.clipflow.title",
    relatedPaths: ["/nehtove-rovnatko-praha", "/zarostly-nehet-praha", "/podologicka-konzultace-praha"],
    servicePrice: "120",
  },
  {
    path: "/tamponada",
    titleKey: "tamponadaPage.metaTitle",
    descriptionKey: "tamponadaPage.metaDescription",
    jsonLd: "service",
    breadcrumbKey: "tamponadaPage.title",
    navLabelKey: "services.tamponada.title",
    relatedPaths: ["/zarostly-nehet-praha", "/nehtove-rovnatko-praha", "/podologicka-konzultace-praha"],
    servicePrice: "60",
  },
  {
    path: COOKIE_POLICY_PATH,
    titleKey: "cookiePolicy.metaTitle",
    descriptionKey: "cookiePolicy.metaDescription",
    jsonLd: "webPage",
    breadcrumbKey: "cookiePolicy.title",
  },
  {
    path: PRIVACY_POLICY_PATH,
    titleKey: "privacyPolicy.metaTitle",
    descriptionKey: "privacyPolicy.metaDescription",
    jsonLd: "webPage",
    breadcrumbKey: "privacyPolicy.title",
  },
];

export const INDEXABLE_PATHS = SEO_ROUTES.filter((route) => route.index !== false).map((route) => route.path);

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

export function matchSeoRoute(pathname: string): SeoRoute | undefined {
  const path = normalizePath(pathname);
  return SEO_ROUTES.find((route) => route.path === path);
}

export function getServiceRoutes(): SeoRoute[] {
  return SEO_ROUTES.filter((route) => route.jsonLd === "service");
}
