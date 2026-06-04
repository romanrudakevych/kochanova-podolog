import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const certificateImages = Object.entries(
  import.meta.glob<string>("@/assets/certificates/*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

const CertificatesSection = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedSrc = selectedIndex !== null ? certificateImages[selectedIndex] : null;

  return (
    <section id="certificates" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-primary/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">{t("certificates.eyebrow")}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 text-glow">{t("certificates.title")}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-row flex-wrap justify-center gap-4 overflow-x-auto pb-2"
          aria-label={t("certificates.listLabel")}
        >
          {certificateImages.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="glass-panel p-2 md:p-3 shrink-0 min-w-[160px] sm:min-w-[200px] flex-1 max-w-[240px] text-left cursor-pointer hover:ring-1 hover:ring-primary/30 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t("certificates.openCertificate", { number: index + 1 })}
            >
              <img
                src={src}
                alt=""
                aria-hidden
                className="w-full rounded-lg object-cover aspect-[3/4] bg-muted pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </motion.div>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-[95vw] w-max max-h-[95vh] gap-0 border-glass-border/40 p-2 sm:p-4 overflow-auto">
          {selectedSrc && selectedIndex !== null && (
            <>
              <DialogTitle className="sr-only">
                {t("certificates.itemLabel", { number: selectedIndex + 1 })}
              </DialogTitle>
              <img
                src={selectedSrc}
                alt={t("certificates.itemLabel", { number: selectedIndex + 1 })}
                className="block max-w-[90vw] max-h-[88vh] w-auto h-auto object-contain rounded-lg"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CertificatesSection;
