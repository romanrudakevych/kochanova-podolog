import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImg from "@/assets/hero-podology.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const remoteBySlide: Record<"slide2" | "slide3", string> = {
  slide2: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
  slide3: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1600&q=80",
};

const slideKeys = ["slide1", "slide2", "slide3"] as const;

const CarouselSection = () => {
  const { t } = useTranslation();

  const slides = slideKeys.map((key) => {
    const src = key === "slide1" ? heroImg : remoteBySlide[key];
    return { key, src, alt: t(`gallery.${key}.alt`), caption: t(`gallery.${key}.caption`) };
  });

  const prevLabel = t("gallery.prevSlide");
  const nextLabel = t("gallery.nextSlide");

  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-cyan-glow/10 blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">{t("gallery.eyebrow")}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 text-glow">{t("gallery.title")}</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{t("gallery.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl mx-auto px-10 sm:px-14 md:px-16"
        >
          <Carousel opts={{ loop: true, align: "start" }} className="w-full" aria-label={t("gallery.carouselLabel")}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {slides.map((slide) => (
                <CarouselItem key={slide.key} className="pl-2 md:pl-4 basis-full">
                  <figure className="glass-panel p-2 md:p-3">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full rounded-lg object-cover aspect-[16/10] bg-muted"
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className="mt-3 px-1 text-sm text-muted-foreground text-center">{slide.caption}</figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="outline"
              className="left-0 sm:left-1 md:-left-2 border-border/60 bg-background/90 backdrop-blur-sm shadow-md"
              aria-label={prevLabel}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <span className="sr-only">{prevLabel}</span>
            </CarouselPrevious>
            <CarouselNext
              variant="outline"
              className="right-0 sm:right-1 md:-right-2 border-border/60 bg-background/90 backdrop-blur-sm shadow-md"
              aria-label={nextLabel}
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
              <span className="sr-only">{nextLabel}</span>
            </CarouselNext>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default CarouselSection;
