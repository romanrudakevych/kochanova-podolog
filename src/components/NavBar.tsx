import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Menu, PhoneCall, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { labelKey: "nav.home", href: "/#hero" },
    { labelKey: "nav.services", href: "/#services" },
    // { labelKey: "nav.gallery", href: "/#gallery" },
    { labelKey: "nav.about", href: "/#about" },
    { labelKey: "nav.contact", href: "/#contact" },
  ];

  const phoneButton = (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 w-9 shrink-0 px-0 text-muted-foreground"
      asChild
    >
      <a href="tel:420777828296" aria-label={t("contact.phoneLabel")}>
        <PhoneCall className="h-4 w-4" aria-hidden />
      </a>
    </Button>
  );

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel rounded-none border-x-0 border-t-0"
      aria-label={t("nav.landmark")}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-foreground">
          <span className="text-primary">{t("brand.accent")}</span>
          <span className="sr-only">{t("brand.homeLabel")}</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {t(l.labelKey)}
            </a>
          ))}
          <LanguageSwitcher />
          {phoneButton}
          <Link
            to="/rezervace"
            className="inline-flex h-9 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_-4px_hsl(var(--glass-glow)/0.5)] hover:shadow-[0_0_30px_-4px_hsl(var(--glass-glow)/0.7)] transition-all duration-300"
          >
            <CalendarDays className="mr-2 h-4 w-4" aria-hidden />
            {t("nav.bookNow")}
          </Link>
        </div>

        {/* Mobile: language + menu */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageSwitcher />
          {phoneButton}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-foreground p-2 rounded-md hover:bg-accent/50 transition-colors"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/30"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(l.labelKey)}
                </a>
              ))}
              <Link
                to="/rezervace"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground w-fit"
              >
                <CalendarDays className="mr-2 h-4 w-4" aria-hidden />
                {t("nav.bookNow")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
