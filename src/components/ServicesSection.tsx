import { motion } from "framer-motion";
import { CircleDot, Droplets, Dumbbell, Footprints, Microscope, Scissors, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import priceListImg from "@/assets/price-list.jpg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const serviceKeys = ["ingrown", "chiropody", "diabetic", "biomechanical", "sports", "aesthetic"] as const;

const serviceIcons: Record<(typeof serviceKeys)[number], LucideIcon> = {
  ingrown: Scissors,
  chiropody: CircleDot,
  diabetic: Footprints,
  biomechanical: Droplets,
  sports: Dumbbell,
  aesthetic: Microscope,
};

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 liquid-gradient" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">{t("services.eyebrow")}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 text-glow">{t("services.title")}</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{t("services.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel-hover p-8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{t(`services.${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`services.${key}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-6 mt-16 flex justify-center"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="glass"
              size="lg"
              className="h-[5.5rem] rounded-2xl px-16 text-2xl gap-4 [&_svg]:!size-10"
            >
              <ScrollText aria-hidden />
              {t("services.viewPriceList")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl gap-0 border-glass-border/40 p-2 sm:p-4">
            <img
              src={priceListImg}
              alt={t("services.priceListAlt")}
              className="w-full rounded-lg object-contain max-h-[85vh]"
            />
          </DialogContent>
        </Dialog>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
