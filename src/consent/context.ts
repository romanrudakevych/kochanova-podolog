import { createContext } from "react";
import type { ConsentState } from "./types";

export type ConsentContextValue = {
  consent: ConsentState | null;
  ready: boolean;
  bannerOpen: boolean;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustom: (next: Pick<ConsentState, "analytics" | "marketing" | "preferences">) => void;
};

export const ConsentContext = createContext<ConsentContextValue | null>(null);
