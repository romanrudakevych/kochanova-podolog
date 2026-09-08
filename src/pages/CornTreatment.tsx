import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, CalendarDays } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import WhenToConsiderBlock from "@/components/WhenToConsiderBlock";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { RelatedServices } from "@/components/RelatedServices";
import kuriOkoPhoto from "@/assets/osetreni-kuriho-oka.webp";

const includeKeys = ["item1", "item2", "item3", "item4"] as const;

const viewport = { once: true, amount: 0.2 } as const;

const CornTreatment = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        <PageBreadcrumb />
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
                {t("diabeticPage.eyebrow")}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 text-glow">
                {t("diabeticPage.title")}
              </h1>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">{t("diabeticPage.subtitle")}</p>
              <div className="glass-panel p-2 md:p-3 mt-10 max-w-2xl mx-auto">
                <img
                  src={kuriOkoPhoto}
                  alt={t("diabeticPage.photo1.alt")}
                  width={640}
                  height={480}
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
              <p>{t("diabeticPage.p1")}</p>
              <p>{t("diabeticPage.p2")}</p>
              <WhenToConsiderBlock pageKey="diabeticPage" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6 }}
              className="glass-panel p-6 sm:p-8"
            >
              <h2 className="text-xl font-semibold text-foreground mb-5">{t("diabeticPage.includesTitle")}</h2>
              <ul className="space-y-4">
                {includeKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {t(`diabeticPage.includes.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-border/40">
                <span className="block text-sm text-muted-foreground mb-3">
                  <Trans
                    i18nKey="diabeticPage.priceLabelWithPedicure"
                    components={{ strong: <strong className="font-semibold text-foreground" /> }}
                  />
                </span>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">{t("diabeticPage.priceWithPedicure")}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" aria-hidden />
                    {t("services.diabetic.duration")}
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border/40">
                <span className="block text-sm text-muted-foreground mb-3">
                  <Trans
                    i18nKey="diabeticPage.priceLabel"
                    components={{ strong: <strong className="font-semibold text-foreground" /> }}
                  />
                </span>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">{t("diabeticPage.price")}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" aria-hidden />
                    {t("services.diabetic.duration")}
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
                <CalendarDays className="mr-2 h-4 w-4" aria-hidden />
                {t("diabeticPage.bookCta")}
              </Link>
            </Button>
          </motion.div>
        </section>
        <RelatedServices />
      </main>

      <Footer />
    </div>
  );
};

export default CornTreatment;
