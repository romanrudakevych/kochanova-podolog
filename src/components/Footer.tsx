import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { key: "legalNotice", href: "#" },
    { key: "privacy", href: "#" },
    { key: "cookies", href: "#" },
  ] as const;

  return (
    <footer className="border-t border-border/30 py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {t("footer.copyright")}{" "}
          <span className="text-primary font-semibold">
            {t("footer.brandAccent")}
            {t("footer.brandRest")}
          </span>{" "}
          {t("footer.rights")}
        </p>
        <nav className="flex gap-6" aria-label={t("footer.legalNav")}>
          {links.map((l) => (
            <a key={l.key} href={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {t(`footer.${l.key}`)}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
