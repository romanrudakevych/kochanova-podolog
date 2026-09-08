import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCountUp } from "@/hooks/useCountUp";

type StatItem = {
  value: number;
  prefix?: string;
  suffix?: string;
  labelKey: string;
  duration?: number;
};

const CountUpNumber = ({ value, prefix = "", suffix = "", duration }: Omit<StatItem, "labelKey">) => {
  const { ref, display } = useCountUp(value, { duration });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

const statItems: StatItem[] = [
  { value: 5, prefix: "+", labelKey: "stats.experience", duration: 1.8 },
  { value: 2500, prefix: "+", labelKey: "stats.patients", duration: 2.2 },
  { value: 11, labelKey: "stats.services", duration: 1.5 },
  { value: 100, suffix: "%", labelKey: "stats.satisfaction", duration: 2 },
];

const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="stats" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 liquid-gradient opacity-60" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {statItems.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel-hover text-center px-6 py-10"
            >
              <p className="text-4xl sm:text-5xl font-bold text-primary text-glow">
                <CountUpNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={stat.duration}
                />
              </p>
              <p className="text-sm text-muted-foreground mt-3 font-medium">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
