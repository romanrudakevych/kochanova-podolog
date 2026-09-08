import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCookieConsent } from "@/consent/useCookieConsent";
import { COOKIE_POLICY_PATH, PRIVACY_POLICY_PATH } from "@/seo/routes";
import type { ConsentState } from "@/consent/types";

type OptionalCategory = "analytics" | "marketing" | "preferences";

export function CookieConsent() {
  const { t } = useTranslation();
  const { bannerOpen, settingsOpen, consent, ready, acceptAll, rejectAll, saveCustom, openSettings, closeSettings } =
    useCookieConsent();
  const titleId = useId();
  const [draft, setDraft] = useState<Pick<ConsentState, OptionalCategory>>({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    if (settingsOpen) {
      setDraft({
        analytics: consent?.analytics ?? false,
        marketing: consent?.marketing ?? false,
        preferences: consent?.preferences ?? false,
      });
    }
  }, [settingsOpen, consent]);

  useEffect(() => {
    document.body.style.paddingBottom = bannerOpen ? "13rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [bannerOpen]);

  if (!ready) return null;

  return (
    <>
      {bannerOpen && (
        <div
          role="region"
          aria-labelledby={titleId}
          className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4"
        >
          <div className="glass-panel mx-auto max-w-4xl border-glass-border/50 p-4 sm:p-6 shadow-[0_-8px_40px_-12px_hsl(var(--glass-glow)/0.25)]">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0 space-y-3">
                <h2 id={titleId} className="text-base font-semibold text-foreground">
                  {t("cookies.bannerTitle")}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{t("cookies.bannerBody")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("cookies.bannerLegalPrefix")}{" "}
                  <Link to={COOKIE_POLICY_PATH} className="text-primary underline-offset-4 hover:underline">
                    {t("cookies.cookiePolicyLink")}
                  </Link>{" "}
                  {t("cookies.bannerLegalJoin")}{" "}
                  <Link to={PRIVACY_POLICY_PATH} className="text-primary underline-offset-4 hover:underline">
                    {t("cookies.privacyPolicyLink")}
                  </Link>
                  .
                </p>
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
                  <Button type="button" variant="outline" className="sm:min-w-[10rem]" onClick={openSettings}>
                    {t("cookies.settings")}
                  </Button>
                  <Button type="button" variant="secondary" className="sm:min-w-[10rem]" onClick={rejectAll}>
                    {t("cookies.rejectAll")}
                  </Button>
                  <Button type="button" variant="hero" className="sm:min-w-[10rem]" onClick={acceptAll}>
                    {t("cookies.acceptAll")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!bannerOpen && !settingsOpen && consent && (
        <button
          type="button"
          onClick={openSettings}
          className="fixed bottom-4 left-4 z-30 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/90 px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Cookie className="h-3.5 w-3.5" aria-hidden />
          {t("cookies.reopen")}
        </button>
      )}

      <Dialog open={settingsOpen} onOpenChange={(open) => (open ? openSettings() : closeSettings())}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("cookies.settingsTitle")}</DialogTitle>
            <DialogDescription>{t("cookies.settingsBody")}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <CategoryRow
              title={t("cookies.necessaryTitle")}
              description={t("cookies.necessaryBody")}
              checked
              disabled
            />
            <CategoryRow
              title={t("cookies.analyticsTitle")}
              description={t("cookies.analyticsBody")}
              checked={draft.analytics}
              onCheckedChange={(analytics) => setDraft((prev) => ({ ...prev, analytics }))}
            />
            <CategoryRow
              title={t("cookies.marketingTitle")}
              description={t("cookies.marketingBody")}
              checked={draft.marketing}
              onCheckedChange={(marketing) => setDraft((prev) => ({ ...prev, marketing }))}
            />
            <CategoryRow
              title={t("cookies.preferencesTitle")}
              description={t("cookies.preferencesBody")}
              checked={draft.preferences}
              onCheckedChange={(preferences) => setDraft((prev) => ({ ...prev, preferences }))}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            <Link to={COOKIE_POLICY_PATH} className="text-primary underline-offset-4 hover:underline" onClick={closeSettings}>
              {t("cookies.cookiePolicyLink")}
            </Link>
            {" · "}
            <Link to={PRIVACY_POLICY_PATH} className="text-primary underline-offset-4 hover:underline" onClick={closeSettings}>
              {t("cookies.privacyPolicyLink")}
            </Link>
          </p>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={rejectAll}>
              {t("cookies.rejectAll")}
            </Button>
            <Button type="button" variant="secondary" onClick={() => saveCustom(draft)}>
              {t("cookies.saveSettings")}
            </Button>
            <Button type="button" variant="hero" onClick={acceptAll}>
              {t("cookies.acceptAll")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const id = useId();

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border/50 bg-secondary/40 p-4">
      <div className="min-w-0 space-y-1">
        <Label htmlFor={id} className="text-sm font-semibold text-foreground">
          {title}
        </Label>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} disabled={disabled} onCheckedChange={onCheckedChange} />
    </div>
  );
}
