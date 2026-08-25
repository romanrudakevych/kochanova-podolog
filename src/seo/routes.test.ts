import { describe, expect, it } from "vitest";
import { INDEXABLE_PATHS, matchSeoRoute, normalizePath, SEO_ROUTES } from "./routes";

describe("SEO routes", () => {
  it("has unique paths", () => {
    const paths = SEO_ROUTES.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("indexes public pages and excludes unknown URLs", () => {
    expect(INDEXABLE_PATHS).toContain("/");
    expect(INDEXABLE_PATHS).toContain("/zarostly-nehet-praha");
    expect(INDEXABLE_PATHS).toContain("/zasady-pouzivani-cookies");
    expect(INDEXABLE_PATHS).not.toContain("/reservation-success");
    expect(matchSeoRoute("/reservation-success")?.index).toBe(false);
    expect(matchSeoRoute("/neexistuje")).toBeUndefined();
  });

  it("normalizes trailing slashes", () => {
    expect(normalizePath("/okluze/")).toBe("/okluze");
    expect(normalizePath("/")).toBe("/");
    expect(matchSeoRoute("/okluze/")).toEqual(matchSeoRoute("/okluze"));
  });

  it("gives service pages related internal links", () => {
    const ingrown = matchSeoRoute("/zarostly-nehet-praha");
    expect(ingrown?.relatedPaths?.length).toBeGreaterThan(0);
    expect(ingrown?.jsonLd).toBe("service");
  });
});
