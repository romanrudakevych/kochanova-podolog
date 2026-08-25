import type { ConsentState } from "./types";

const GA_SCRIPT_ID = "consent-ga4";
const PIXEL_SCRIPT_ID = "consent-meta-pixel";

function gaMeasurementId(): string | undefined {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  return id?.trim() || undefined;
}

function metaPixelId(): string | undefined {
  const id = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
  return id?.trim() || undefined;
}

export function getConfiguredTrackers() {
  return {
    analytics: Boolean(gaMeasurementId()),
    marketing: Boolean(metaPixelId()),
  };
}

function injectScript(id: string, src: string, async = true) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = async;
  document.head.appendChild(script);
}

function loadGoogleAnalytics() {
  const id = gaMeasurementId();
  if (!id || typeof window === "undefined") return;

  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer ?? [];
  w.gtag =
    w.gtag ??
    function gtag(...args: unknown[]) {
      w.dataLayer!.push(args);
    };

  injectScript(GA_SCRIPT_ID, `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true, send_page_view: false });
}

function disableGoogleAnalytics() {
  const id = gaMeasurementId();
  if (!id || typeof window === "undefined") return;
  const w = window as Window & { [`ga-disable-${string}`]?: boolean; gtag?: (...args: unknown[]) => void };
  w[`ga-disable-${id}`] = true;
  w.gtag?.("consent", "update", { analytics_storage: "denied" });
}

function loadMetaPixel() {
  const id = metaPixelId();
  if (!id || typeof window === "undefined") return;
  if (document.getElementById(PIXEL_SCRIPT_ID)) return;

  const w = window as Window & { fbq?: (...args: unknown[]) => void; _fbq?: unknown };
  if (!w.fbq) {
    const fbq = (...args: unknown[]) => {
      (fbq as { q?: unknown[] }).q = (fbq as { q?: unknown[] }).q ?? [];
      (fbq as { q: unknown[] }).q.push(args);
    };
    w.fbq = fbq;
    w._fbq = fbq;
  }

  injectScript(PIXEL_SCRIPT_ID, "https://connect.facebook.net/en_US/fbevents.js");
  w.fbq?.("init", id);
  w.fbq?.("track", "PageView");
}

function disableMetaPixel() {
  const w = window as Window & { fbq?: (...args: unknown[]) => void };
  w.fbq?.("consent", "revoke");
}

/**
 * Loads or suppresses third-party trackers according to stored consent.
 * Scripts are never injected before the matching category is granted.
 */
export function applyConsentScripts(consent: ConsentState | null) {
  if (typeof document === "undefined") return;

  if (consent?.analytics) {
    loadGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }

  if (consent?.marketing) {
    loadMetaPixel();
  } else {
    disableMetaPixel();
  }
}

export function trackPageView(pathWithSearch: string) {
  if (!gaMeasurementId() || typeof window === "undefined") return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;

  w.gtag("event", "page_view", {
    page_path: pathWithSearch || "/",
    page_location: window.location.href,
    page_title: document.title,
  });
}
