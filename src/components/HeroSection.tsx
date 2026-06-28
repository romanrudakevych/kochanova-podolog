import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImg from "@/assets/hero2.webp";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Liquid background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-glow/8 blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] animate-float-slow" />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block glass-panel px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase mb-6">
              {t("hero.eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground text-glow mb-6">
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2For")}
              <br />
               <span className="text-primary">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="rounded-xl text-base" asChild>
                <Link to="/rezervace">
                  <Phone className="mr-2 h-4 w-4" aria-hidden />
                  {t("hero.bookAppointment")}
                </Link>
              </Button>
              <Button variant="glass" size="lg" className="rounded-xl text-base" asChild>
                <a href="#services">
                  {t("hero.viewServices")}
                  <ArrowDown className="ml-2 h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-panel p-2">
              <img src={heroImg} alt={t("hero.heroImageAlt")} className="w-full rounded-xl object-cover" />
            </div>
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 glass-panel px-5 py-4 animate-float-slow"
            >
              <p className="text-2xl font-bold text-primary">+5</p>
              <p className="text-xs text-muted-foreground">{t("hero.statExperience")}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -top-4 -right-4 glass-panel px-5 py-4 animate-float-delayed"
            >
              <p className="text-2xl font-bold text-accent">+2500</p>
              <p className="text-xs text-muted-foreground">{t("hero.statPatients")}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
