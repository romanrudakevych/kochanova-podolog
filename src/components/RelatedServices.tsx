import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { matchSeoRoute } from "@/seo/routes";

export function RelatedServices() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const route = matchSeoRoute(pathname);
  const related = route?.relatedPaths ?? [];

  if (related.length === 0) return null;

  return (
    <section className="container mx-auto px-6 py-8 max-w-6xl" aria-labelledby="related-services-heading">
      <h2 id="related-services-heading" className="text-xl font-semibold text-foreground mb-4">
        {t("relatedServices.title")}
      </h2>
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        {related.map((path) => {
          const item = matchSeoRoute(path);
          if (!item) return null;
          return (
            <li key={path}>
              <Link
                to={path}
                className="inline-flex rounded-xl border border-border/50 bg-secondary/40 px-4 py-2 text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                {t(item.breadcrumbKey ?? item.titleKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
