import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";
import { useCookieConsent } from "@/consent/useCookieConsent";
import { PRIVACY_POLICY_PATH } from "@/seo/routes";
import { Button } from "@/components/ui/button";

const sections = ["necessary", "analytics", "marketing", "preferences", "thirdParty", "manage", "contact"] as const;

const CookiePolicy = () => {
  const { t } = useTranslation();
  const { openSettings } = useCookieConsent();

  return (
    <LegalLayout>
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-glow">{t("cookiePolicy.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("cookiePolicy.updated")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("cookiePolicy.intro")}</p>
      </header>

      {sections.map((key) => (
        <section key={key} className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">{t(`cookiePolicy.${key}Title`)}</h2>
          <p className="text-muted-foreground leading-relaxed">{t(`cookiePolicy.${key}Body`)}</p>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">{t("cookiePolicy.privacyTitle")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          <Trans
            i18nKey="cookiePolicy.privacyBody"
            components={{
              privacy: <Link to={PRIVACY_POLICY_PATH} className="text-primary underline-offset-4 hover:underline" />,
            }}
          />
        </p>
      </section>

      <Button type="button" variant="hero" onClick={openSettings}>
        {t("cookies.settings")}
      </Button>
    </LegalLayout>
  );
};

export default CookiePolicy;
