import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from "./types";
import { acceptAllConsent, hasConsentCategory, readConsent, rejectAllConsent, writeConsent } from "./storage";
import { LOCALE_STORAGE_KEY } from "@/i18n/constants";

describe("cookie consent storage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "podolog_consent=; Max-Age=0; Path=/";
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("returns null when the visitor has not chosen yet", () => {
    expect(readConsent()).toBeNull();
    expect(hasConsentCategory("analytics")).toBe(false);
    expect(hasConsentCategory("necessary")).toBe(true);
  });

  it("stores an accept-all choice and does not prompt again", () => {
    const state = acceptAllConsent();
    expect(state.analytics).toBe(true);
    expect(state.marketing).toBe(true);
    expect(state.preferences).toBe(true);
    expect(readConsent()?.analytics).toBe(true);
    expect(hasConsentCategory("analytics")).toBe(true);
  });

  it("stores a reject-all choice while keeping necessary cookies", () => {
    const state = rejectAllConsent();
    expect(state.necessary).toBe(true);
    expect(state.analytics).toBe(false);
    expect(state.marketing).toBe(false);
    expect(state.preferences).toBe(false);
    expect(readConsent()?.analytics).toBe(false);
  });

  it("clears the stored language when preference cookies are refused", () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, "ru");
    rejectAllConsent();
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull();
  });

  it("ignores an outdated consent version", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        version: CONSENT_VERSION - 1,
        updatedAt: new Date().toISOString(),
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true,
      }),
    );
    expect(readConsent()).toBeNull();
  });

  it("ignores expired consent", () => {
    writeConsent({ analytics: true, marketing: false, preferences: true });
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!);
    stored.updatedAt = new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString();
    const serialized = JSON.stringify(stored);
    localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
    document.cookie = `podolog_consent=${encodeURIComponent(serialized)}; Path=/`;
    expect(readConsent()).toBeNull();
  });
});
