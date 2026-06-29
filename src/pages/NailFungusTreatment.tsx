import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import aestheticPhoto1 from "@/assets/aesthetic-photo-1.webp";

const includeKeys = ["item1", "item2", "item3", "item4"] as const;

const viewport = { once: true, amount: 0.2 } as const;

const NailFungusTreatment = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("aestheticPage.metaTitle");
    const desc = document.querySelector('meta[name="description"]');
    desc?.setAttribute("content", t("aestheticPage.metaDescription"));

    return () => {
      document.title = t("meta.title");
      desc?.setAttribute("content", t("meta.description"));
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 liquid-gradient" />
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] -z-10 animate-float" />

          <div className="container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {t("aestheticPage.eyebrow")}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 text-glow">
                {t("aestheticPage.title")}
              </h1>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">{t("aestheticPage.subtitle")}</p>
              <div className="glass-panel p-2 md:p-3 mt-10 max-w-2xl mx-auto">
                <img
                  src={aestheticPhoto1}
                  alt={t("aestheticPage.photo1.alt")}
                  className="w-full rounded-lg object-cover aspect-[4/3] bg-muted"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6 }}
              className="space-y-5 text-muted-foreground leading-relaxed"
            >
              <p>{t("aestheticPage.p1")}</p>
              <p>{t("aestheticPage.p2")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6 }}
              className="glass-panel p-6 sm:p-8"
            >
              <h2 className="text-xl font-semibold text-foreground mb-5">{t("aestheticPage.includesTitle")}</h2>
              <ul className="space-y-4">
                {includeKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {t(`aestheticPage.includes.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-border/40">
                <span className="block text-sm text-muted-foreground mb-3">{t("aestheticPage.priceLabel")}</span>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">{t("aestheticPage.price")}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" aria-hidden />
                    {t("services.aesthetic.duration")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6 }}
          >
            <Button variant="hero" size="lg" className="rounded-xl text-base" asChild>
              <Link to="/rezervace">
                <Phone className="mr-2 h-4 w-4" aria-hidden />
                {t("aestheticPage.bookCta")}
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NailFungusTreatment;
