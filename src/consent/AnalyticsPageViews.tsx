import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookieConsent } from "@/consent/useCookieConsent";
import { trackPageView } from "@/consent/scripts";

/** Sends a GA4 page_view on the first allowed visit and on every client-side route change. */
export function AnalyticsPageViews() {
  const { pathname, search } = useLocation();
  const { consent, ready } = useCookieConsent();

  useEffect(() => {
    if (!ready || !consent?.analytics) return;
    trackPageView(`${pathname}${search}`);
  }, [pathname, search, ready, consent?.analytics]);

  return null;
}
