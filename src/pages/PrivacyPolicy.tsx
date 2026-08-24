import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";
import { COOKIE_POLICY_PATH } from "@/seo/routes";

const sections = ["controller", "data", "purposes", "recipients", "retention", "rights", "cookies"] as const;

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <LegalLayout>
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-glow">{t("privacyPolicy.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("privacyPolicy.updated")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("privacyPolicy.intro")}</p>
      </header>

      {sections.map((key) => (
        <section key={key} className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">{t(`privacyPolicy.${key}Title`)}</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{t(`privacyPolicy.${key}Body`)}</p>
        </section>
      ))}

      <p className="text-muted-foreground leading-relaxed">
        <Trans
          i18nKey="privacyPolicy.cookiesLink"
          components={{
            cookies: <Link to={COOKIE_POLICY_PATH} className="text-primary underline-offset-4 hover:underline" />,
          }}
        />
      </p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
