import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/30 py-8">
      <div className="container mx-auto px-6 flex justify-center">
        <p className="text-sm text-muted-foreground">
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
