const JSON_LD_ID = "seo-jsonld";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export type HeadPayload = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: string;
  ogImage: string;
  ogLocale: string;
  jsonLd: object | null;
};

export function applyHead(payload: HeadPayload) {
  document.title = payload.title;

  upsertMeta('meta[name="description"]', { name: "description", content: payload.description });
  upsertMeta('meta[name="robots"]', { name: "robots", content: payload.robots });
  upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: payload.robots });

  upsertLink("canonical", payload.canonical);

  upsertMeta('meta[property="og:title"]', { property: "og:title", content: payload.title });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: payload.description });
  upsertMeta('meta[property="og:type"]', { property: "og:type", content: payload.ogType });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: payload.canonical });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: payload.ogImage });
  upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: payload.ogLocale });
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Podolog Kochanova" });

  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: payload.title });
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: payload.description });
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: payload.ogImage });

  let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!payload.jsonLd) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.id = JSON_LD_ID;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(payload.jsonLd);
}
