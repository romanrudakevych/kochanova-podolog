import { normalizeSiteUrl } from "./normalizeSiteUrl";

export const SITE_NAME = "Podolog Kochanova";
export const SITE_LOCALE = "cs_CZ";
export const SITE_LOCALE_ALT = "ru_RU";
export const DEFAULT_OG_IMAGE_PATH = "/images/hero.webp";
export const TWITTER_CARD = "summary_large_image";

export const BUSINESS = {
  legalName: "Podolog Kochanova",
  telephone: "+420777828296",
  telephoneDisplay: "+420 777 828 296",
  email: "podolog.kochanova@gmail.com",
  streetAddress: "Na Poříčí 1041/12, YMCA",
  addressLocality: "Praha",
  postalCode: "110 00",
  addressCountry: "CZ",
  instagram: "https://www.instagram.com/podolog_kochanova",
  openingHours: "Mo-Fr 09:00-20:00",
} as const;

export function getSiteUrl(): string {
  const fromEnv = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return "";
}

export function absoluteUrl(path: string, origin = getSiteUrl()): string {
  const normalized = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (!origin) return normalized;
  return `${origin}${normalized === "/" ? "/" : normalized}`;
}

export function absoluteAssetUrl(assetPath: string, origin = getSiteUrl()): string {
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) return assetPath;
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return origin ? `${origin}${path}` : path;
}
