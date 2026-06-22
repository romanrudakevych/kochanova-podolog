import { motion } from "framer-motion";
import { Award, GraduationCap, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import avatarImg from "@/assets/avatar.webp";
import cpsLogoImg from "@/assets/ceska-podologicka-spolecnost-logo.webp";
import cpdrsLogoImg from "@/assets/ceska-podiatricka-spolecnost-logo.webp";

const AboutSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Award,
      valueKey: "about.stats.experienceValue",
      labelKey: "about.stats.experienceLabel",
    },
    {
      icon: GraduationCap,
      valueKey: "about.stats.licenseValue",
      labelKey: "about.stats.licenseLabel",
    },
    {
      icon: Clock,
      valueKey: "about.stats.hoursValue",
      labelKey: "about.stats.hoursLabel",
    },
  ] as const;

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Stats side previous AI generated */}
          {/* <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.labelKey}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass-panel-hover flex items-center gap-5 p-6"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="h-7 w-7 text-primary" aria-hidden />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{t(s.valueKey)}</p>
                  <p className="text-sm text-muted-foreground">{t(s.labelKey)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div> */}

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-panel p-2">
              <img src={avatarImg} alt={t("hero.heroImageAlt")} className="w-full rounded-xl object-cover" />
            </div>
            {/* Floating stat card */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 glass-panel px-5 py-4 animate-float-slow"
            >
              <p className="text-2xl font-bold text-primary">+15</p>
              <p className="text-xs text-muted-foreground">{t("hero.statExperience")}</p>
            </motion.div> */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -top-4 -right-4 glass-panel px-5 py-4 animate-float-delayed"
            >
              <p className="text-2xl font-bold text-accent">+5000</p>
              <p className="text-xs text-muted-foreground">{t("hero.statPatients")}</p>
            </motion.div> */}
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">{t("about.eyebrow")}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6 text-glow">{t("about.title")}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
              <p>{t("about.p4")}</p>
              <div className="flex gap-4">
                <img
                  src={cpsLogoImg}
                  alt={t("about.cpsLogoAlt")}
                  className="h-24 w-24 object-contain"
                />
                <img
                  src={cpdrsLogoImg}
                  alt={t("about.cpdrsLogoAlt")}
                  className="h-24 w-24 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
