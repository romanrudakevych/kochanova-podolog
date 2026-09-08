import { describe, expect, it } from "vitest";
import { normalizeSiteUrl } from "./normalizeSiteUrl";

describe("normalizeSiteUrl", () => {
  it("strips a trailing slash from the configured origin", () => {
    expect(normalizeSiteUrl("https://podolog-kochanova.cz/")).toBe("https://podolog-kochanova.cz");
  });

  it("keeps an origin that already has no trailing slash", () => {
    expect(normalizeSiteUrl("https://podolog-kochanova.cz")).toBe("https://podolog-kochanova.cz");
  });

  it("trims whitespace and repeated slashes", () => {
    expect(normalizeSiteUrl("  https://podolog-kochanova.cz///  ")).toBe("https://podolog-kochanova.cz");
  });
});
