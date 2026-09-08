import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "@/consent/useCookieConsent";
import { COOKIE_POLICY_PATH, PRIVACY_POLICY_PATH, getServiceRoutes } from "@/seo/routes";

const Footer = () => {
  const { t } = useTranslation();
  const { openSettings } = useCookieConsent();
  const services = getServiceRoutes();

  return (
    <footer className="border-t border-border/30 py-10">
      <div className="container mx-auto px-6 space-y-8">
        <nav aria-label={t("footer.servicesLabel")} className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {services.map((service) => (
            <Link
              key={service.path}
              to={service.path}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t(service.navLabelKey ?? service.breadcrumbKey ?? service.titleKey)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <Link to={PRIVACY_POLICY_PATH} className="hover:text-primary transition-colors">
            {t("cookies.privacyPolicyLink")}
          </Link>
          <Link to={COOKIE_POLICY_PATH} className="hover:text-primary transition-colors">
            {t("cookies.cookiePolicyLink")}
          </Link>
          <button type="button" onClick={openSettings} className="hover:text-primary transition-colors">
            {t("cookies.settings")}
          </button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {t("footer.copyright")}{" "}
          <span className="text-primary font-semibold">
            {t("footer.brandAccent")}
            {t("footer.brandRest")}
          </span>{" "}
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
