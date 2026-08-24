import { describe, expect, it } from "vitest";
import { applyHead } from "./head";

describe("applyHead", () => {
  it("updates existing tags instead of duplicating them", () => {
    document.head.innerHTML = `
      <title>Old</title>
      <meta name="description" content="old" />
      <meta property="og:title" content="old" />
    `;

    applyHead({
      title: "New title",
      description: "New description",
      canonical: "https://example.cz/sluzba",
      robots: "index, follow",
      ogType: "website",
      ogImage: "https://example.cz/images/hero.webp",
      ogLocale: "cs_CZ",
      jsonLd: { "@context": "https://schema.org", "@type": "WebPage", name: "New title" },
    });

    applyHead({
      title: "Second title",
      description: "Second description",
      canonical: "https://example.cz/sluzba",
      robots: "index, follow",
      ogType: "website",
      ogImage: "https://example.cz/images/hero.webp",
      ogLocale: "cs_CZ",
      jsonLd: { "@context": "https://schema.org", "@type": "WebPage", name: "Second title" },
    });

    expect(document.title).toBe("Second title");
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelectorAll("#seo-jsonld")).toHaveLength(1);
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe("Second description");
  });
});
