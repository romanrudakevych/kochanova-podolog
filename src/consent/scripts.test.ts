import { describe, expect, it } from "vitest";
import { applyConsentScripts } from "./scripts";

describe("consent-gated scripts", () => {
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
});
