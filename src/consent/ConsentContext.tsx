import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { applyConsentScripts } from "./scripts";
import { acceptAllConsent, readConsent, rejectAllConsent, writeConsent } from "./storage";
import { ConsentContext, type ConsentContextValue } from "./context";
import type { ConsentState } from "./types";

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored);
      applyConsentScripts(stored);
    } else {
      setBannerOpen(true);
      applyConsentScripts(null);
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: ConsentState) => {
    setConsent(next);
    setBannerOpen(false);
    setSettingsOpen(false);
    applyConsentScripts(next);
  }, []);

  const acceptAll = useCallback(() => {
    persist(acceptAllConsent());
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist(rejectAllConsent());
  }, [persist]);

  const saveCustom = useCallback(
    (next: Pick<ConsentState, "analytics" | "marketing" | "preferences">) => {
      persist(writeConsent(next));
    },
    [persist],
  );

  const openSettings = useCallback(() => {
    setSettingsOpen(true);
    setBannerOpen(false);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    if (!readConsent()) setBannerOpen(true);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      bannerOpen,
      settingsOpen,
      openSettings,
      closeSettings,
      acceptAll,
      rejectAll,
      saveCustom,
    }),
    [consent, ready, bannerOpen, settingsOpen, openSettings, closeSettings, acceptAll, rejectAll, saveCustom],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
