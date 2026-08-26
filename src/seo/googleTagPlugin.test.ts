import { describe, expect, it } from "vitest";
import { googleTagPlugin } from "../../vite-plugin-seo";

function transform(measurementId: string, html: string) {
  const plugin = googleTagPlugin(measurementId);
  const fn = plugin.transformIndexHtml;
  if (typeof fn !== "function") throw new Error("expected transformIndexHtml function");
  return fn.call(plugin, html);
}

describe("googleTagPlugin", () => {
  const source = "<html><head>\n  </head><body></body></html>";

  it("injects the Google tag before </head> with Consent Mode denied by default", () => {
    const html = transform("G-514HWMCPQK", source);
    expect(html).toContain('src="https://www.googletagmanager.com/gtag/js?id=G-514HWMCPQK"');
    expect(html).toContain("gtag('config', 'G-514HWMCPQK'");
    expect(html).toContain("analytics_storage: 'denied'");
    expect(html).toContain("ad_storage: 'denied'");
  });

  it("does not inject an invalid or empty measurement id", () => {
    expect(transform("", source)).toBe(source);
    expect(transform("not-a-ga-id", source)).toBe(source);
  });

  it("does not duplicate an existing gtag snippet", () => {
    const existing = '<html><head><script src="https://www.googletagmanager.com/gtag/js?id=G-514HWMCPQK"></script></head></html>';
    expect(transform("G-514HWMCPQK", existing)).toBe(existing);
  });
});
