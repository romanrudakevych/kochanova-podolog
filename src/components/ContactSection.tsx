import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactItems = [
    { icon: Phone, labelKey: "contact.phoneLabel", valueKey: "contact.phoneValue" },
    { icon: Mail, labelKey: "contact.emailLabel", valueKey: "contact.emailValue" },
    { icon: MapPin, labelKey: "contact.addressLabel", valueKey: "contact.addressValue" },
  ] as const;

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 liquid-gradient opacity-50" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">{t("contact.eyebrow")}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 text-glow">{t("contact.title")}</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactItems.map((item) => (
              <div key={item.labelKey} className="glass-panel-hover flex items-center gap-5 p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t(item.labelKey)}</p>
                  <p className="text-foreground font-medium">{t(item.valueKey)}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
            aria-label={t("contact.title")}
          >
            <div>
              <label htmlFor="contact-name" className="text-sm text-muted-foreground mb-1.5 block">
                {t("contact.fieldName")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-secondary/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                placeholder={t("contact.placeholderName")}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-sm text-muted-foreground mb-1.5 block">
                {t("contact.fieldEmail")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-secondary/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                placeholder={t("contact.placeholderEmail")}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-sm text-muted-foreground mb-1.5 block">
                {t("contact.fieldMessage")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-xl bg-secondary/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                placeholder={t("contact.placeholderMessage")}
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full rounded-xl text-base">
              <Send className="mr-2 h-4 w-4" aria-hidden />
              {t("contact.submit")}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
