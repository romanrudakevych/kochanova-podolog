import { afterEach, describe, expect, it, vi } from "vitest";
import { applyConsentScripts, trackPageView } from "./scripts";

describe("consent-gated scripts", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    delete (window as Window & { gtag?: unknown }).gtag;
  });

  it("does not inject analytics or marketing scripts before consent", () => {
    applyConsentScripts(null);
    expect(document.getElementById("consent-ga4")).toBeNull();
    expect(document.getElementById("consent-meta-pixel")).toBeNull();
  });

  it("does not inject scripts when optional categories are refused", () => {
    applyConsentScripts({
      version: 1,
      updatedAt: new Date().toISOString(),
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
    expect(document.getElementById("consent-ga4")).toBeNull();
    expect(document.getElementById("consent-meta-pixel")).toBeNull();
  });

  it("does not send page views when no measurement ID is configured", () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
    const gtag = vi.fn();
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag = gtag;
    trackPageView("/rezervace");
    expect(gtag).not.toHaveBeenCalled();
  });
});
