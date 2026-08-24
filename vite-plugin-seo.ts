import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";
import { INDEXABLE_PATHS, SEO_ROUTES, type SeoRoute } from "./src/seo/routes";
import { normalizeSiteUrl } from "./src/seo/normalizeSiteUrl";

type Messages = Record<string, unknown>;

function lookup(messages: Messages, key: string): string {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) return (acc as Record<string, unknown>)[part];
    return undefined;
  }, messages);
  return typeof value === "string" ? value : key;
}

function upsertMeta(html: string, attr: "name" | "property", key: string, content: string): string {
  const pattern = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`, "i");
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertLink(html: string, rel: string, href: string): string {
  const pattern = new RegExp(`<link rel="${rel}" href="[^"]*"\\s*/?>`, "i");
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function applyRouteHead(html: string, route: SeoRoute, messages: Messages, siteUrl: string): string {
  const title = lookup(messages, route.titleKey);
  const description = lookup(messages, route.descriptionKey);
  const canonical = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  const image = `${siteUrl}/images/hero.webp`;
  const robots = route.index === false ? "noindex, nofollow" : "index, follow";

  let next = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  next = upsertMeta(next, "name", "description", description);
  next = upsertMeta(next, "name", "robots", robots);
  next = upsertMeta(next, "property", "og:title", title);
  next = upsertMeta(next, "property", "og:description", description);
  next = upsertMeta(next, "property", "og:type", route.ogType ?? "website");
  next = upsertMeta(next, "property", "og:url", canonical);
  next = upsertMeta(next, "property", "og:image", image);
  next = upsertMeta(next, "property", "og:locale", "cs_CZ");
  next = upsertMeta(next, "name", "twitter:card", "summary_large_image");
  next = upsertMeta(next, "name", "twitter:title", title);
  next = upsertMeta(next, "name", "twitter:description", description);
  next = upsertMeta(next, "name", "twitter:image", image);
  next = upsertLink(next, "canonical", canonical);
  next = injectJsonLd(next, {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": route.jsonLd === "service" ? "Service" : route.jsonLd === "home" ? "MedicalBusiness" : "WebPage",
        name: title,
        description,
        url: canonical,
      },
    ],
  });
  return next;
}

function injectJsonLd(html: string, json: object): string {
  const script = `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(json)}</script>`;
  if (html.includes('id="seo-jsonld"')) {
    return html.replace(/<script type="application\/ld\+json" id="seo-jsonld">[\s\S]*?<\/script>/, script);
  }
  return html.replace("</head>", `    ${script}\n  </head>`);
}

function writeRobots(distDir: string, siteUrl: string) {
  const sitemapLine = siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : "";
  const body = `User-agent: *\nAllow: /\n\nDisallow: /404\n\n${sitemapLine}`;
  fs.writeFileSync(path.join(distDir, "robots.txt"), body, "utf8");
}

function writeSitemap(distDir: string, siteUrl: string) {
  if (!siteUrl) return;
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = INDEXABLE_PATHS.map((routePath) => {
    const loc = `${siteUrl}${routePath === "/" ? "/" : routePath}`;
    const priority = routePath === "/" ? "1.0" : routePath.includes("zasady") ? "0.4" : "0.8";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml, "utf8");
}

export function seoPrerenderPlugin(siteUrl: string): Plugin {
  const origin = normalizeSiteUrl(siteUrl);

  return {
    name: "seo-prerender",
    closeBundle: {
      sequential: true,
      order: "post",
      handler() {
        const distDir = path.resolve("dist");
        const indexPath = path.join(distDir, "index.html");
        if (!fs.existsSync(indexPath)) return;

        const template = fs.readFileSync(indexPath, "utf8");
        const messages = JSON.parse(fs.readFileSync(path.resolve("src/i18n/locales/cs.json"), "utf8")) as Messages;

        for (const route of SEO_ROUTES) {
          const html = applyRouteHead(template, route, messages, origin || "");
          if (route.path === "/") {
            fs.writeFileSync(indexPath, html, "utf8");
            continue;
          }
          const outDir = path.join(distDir, route.path.replace(/^\//, ""));
          fs.mkdirSync(outDir, { recursive: true });
          fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
        }

        writeRobots(distDir, origin);
        writeSitemap(distDir, origin);

        const notFoundHtml = applyNotFoundHead(template, messages, origin);
        fs.writeFileSync(path.join(distDir, "404.html"), notFoundHtml, "utf8");
      },
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = (req.url ?? "/").split("?")[0];
        if (urlPath === "/" || path.extname(urlPath)) {
          next();
          return;
        }

        const distDir = path.resolve("dist");
        const normalized = urlPath.replace(/\/+$/, "");
        const prerendered = path.join(distDir, normalized.replace(/^\//, ""), "index.html");
        if (fs.existsSync(prerendered)) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(fs.readFileSync(prerendered));
          return;
        }

        const notFound = path.join(distDir, "404.html");
        if (fs.existsSync(notFound)) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(fs.readFileSync(notFound));
          return;
        }
        next();
      });
    },
  };
}

function applyNotFoundHead(html: string, messages: Messages, siteUrl: string): string {
  const title = lookup(messages, "notFound.metaTitle");
  const description = lookup(messages, "notFound.metaDescription");
  let next = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  next = upsertMeta(next, "name", "description", description);
  next = upsertMeta(next, "name", "robots", "noindex, nofollow");
  next = upsertMeta(next, "property", "og:title", title);
  next = upsertMeta(next, "property", "og:description", description);
  return next;
}
