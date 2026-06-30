import { motion } from "framer-motion";
import { Bandage, CircleDot, Clock, Droplets, Dumbbell, Footprints, Layers, MessagesSquare, Microscope, Plus, Scissors, ScrollText, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import priceListImg from "@/assets/price-list.webp";
import consultationPhoto from "@/assets/consultation-photo-1.webp";
import ingrownPhoto from "@/assets/osetreni-zarostleho-nehtu.webp";
import bradavicePhoto from "@/assets/osetreni-bradavice.webp";
import kuriOkoPhoto from "@/assets/osetreni-kuriho-oka.webp";
import plisenNehtuPhoto from "@/assets/osetreni-plisne-nehtu.webp";
import nehtoveRovnatkoPhoto from "@/assets/nehtove-rovnatko.webp";
import podologickaPedikuraPhoto from "@/assets/podologicka-pedikura.webp";
import kartPedikuraPhoto from "@/assets/kart-pedikura.webp";
import okluzePhoto from "@/assets/okluze.webp";
import nadstavbaNehtuPhoto from "@/assets/nadstavba-nehtu-clip-flow.webp";
import tamponadaPhoto from "@/assets/tamponada.webp";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const serviceKeys = ["consultation", "ingrown", "chiropody", "diabetic", "biomechanical", "sports", "kart", "aesthetic", "okluze", "clipflow", "tamponada"] as const;

const serviceIcons: Record<(typeof serviceKeys)[number], LucideIcon> = {
  consultation: MessagesSquare,
  ingrown: Scissors,
  chiropody: CircleDot,
  diabetic: Footprints,
  biomechanical: Droplets,
  sports: Dumbbell,
  kart: Sparkles,
  aesthetic: Microscope,
  okluze: Layers,
  clipflow: Plus,
  tamponada: Bandage,
};

type FeaturedServiceKey = "consultation" | "ingrown" | "chiropody" | "diabetic" | "biomechanical" | "sports" | "kart" | "aesthetic" | "okluze" | "clipflow" | "tamponada";

const featuredServices: Record<
  FeaturedServiceKey,
  {
    href: string;
    image: string;
    imageAltKey: string;
    priceKey: string;
    durationKey: string;
  }
> = {
  consultation: {
    href: "/podologicka-konzultace-praha",
    image: consultationPhoto,
    imageAltKey: "consultationPage.photo1.alt",
    priceKey: "services.consultation.price",
    durationKey: "services.consultation.duration",
  },
  ingrown: {
    href: "/zarostly-nehet-praha",
    image: ingrownPhoto,
    imageAltKey: "ingrownPage.photo1.alt",
    priceKey: "services.ingrown.price",
    durationKey: "services.ingrown.duration",
  },
  chiropody: {
    href: "/bradavice-praha",
    image: bradavicePhoto,
    imageAltKey: "chiropodyPage.photo1.alt",
    priceKey: "services.chiropody.price",
    durationKey: "services.chiropody.duration",
  },
  diabetic: {
    href: "/kuri-oko-praha",
    image: kuriOkoPhoto,
    imageAltKey: "diabeticPage.photo1.alt",
    priceKey: "services.diabetic.price",
    durationKey: "services.diabetic.duration",
  },
  biomechanical: {
    href: "/nehtove-rovnatko-praha",
    image: nehtoveRovnatkoPhoto,
    imageAltKey: "biomechanicalPage.photo1.alt",
    priceKey: "services.biomechanical.price",
    durationKey: "services.biomechanical.duration",
  },
  sports: {
    href: "/podologicka-pedikura-praha",
    image: podologickaPedikuraPhoto,
    imageAltKey: "sportsPage.photo1.alt",
    priceKey: "services.sports.price",
    durationKey: "services.sports.duration",
  },
  kart: {
    href: "/kart-pedikura-praha",
    image: kartPedikuraPhoto,
    imageAltKey: "kartPage.photo1.alt",
    priceKey: "services.kart.price",
    durationKey: "services.kart.duration",
  },
  aesthetic: {
    href: "/plisen-nehtu-praha",
    image: plisenNehtuPhoto,
    imageAltKey: "aestheticPage.photo1.alt",
    priceKey: "services.aesthetic.price",
    durationKey: "services.aesthetic.duration",
  },
  okluze: {
    href: "/okluze",
    image: okluzePhoto,
    imageAltKey: "okluzePage.photo1.alt",
    priceKey: "services.okluze.price",
    durationKey: "services.okluze.duration",
  },
  clipflow: {
    href: "/nadstavba-nehtu",
    image: nadstavbaNehtuPhoto,
    imageAltKey: "clipflowPage.photo1.alt",
    priceKey: "services.clipflow.price",
    durationKey: "services.clipflow.duration",
  },
  tamponada: {
    href: "/tamponada",
    image: tamponadaPhoto,
    imageAltKey: "tamponadaPage.photo1.alt",
    priceKey: "services.tamponada.price",
    durationKey: "services.tamponada.duration",
  },
};

const viewport = { once: true, amount: 0.2 } as const;

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 liquid-gradient" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
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
            const featured = featuredServices[key as FeaturedServiceKey];
            const cardContent = (
              <>
                {featured ? (
                  <img
                    src={featured.image}
                    alt={t(featured.imageAltKey)}
                    className="w-full rounded-lg object-cover aspect-[4/3] bg-muted mb-5"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground mb-2">{t(`services.${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t(`services.${key}.desc`)}</p>
                {featured && (
                  <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between gap-3 px-1 shrink-0">
                    <span className="text-lg font-bold text-primary">{t(featured.priceKey)}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" aria-hidden />
                      {t(featured.durationKey)}
                    </span>
                  </div>
                )}
              </>
            );

            const cardClassName = featured
              ? "glass-panel-hover p-3 sm:p-4 group flex h-full flex-col cursor-pointer"
              : "glass-panel-hover p-6 sm:p-8 group flex h-full flex-col cursor-pointer";

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.18) }}
                className="h-full"
              >
                {featured ? (
                  <Link to={featured.href} className={cardClassName}>
                    {cardContent}
                  </Link>
                ) : (
                  <div className="glass-panel-hover p-6 sm:p-8 group flex h-full flex-col">
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>


      {/* Price list dialog */}
      {/* <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 mt-16 flex justify-center"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="glass"
              size="lg"
              className="h-16 sm:h-[5.5rem] w-full max-w-sm sm:max-w-none sm:w-auto rounded-2xl px-8 sm:px-16 text-lg sm:text-2xl gap-3 sm:gap-4 [&_svg]:!size-8 sm:[&_svg]:!size-10"
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
      </motion.div> */}
    </section>
  );
};

export default ServicesSection;
