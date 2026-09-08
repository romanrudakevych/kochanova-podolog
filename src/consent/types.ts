export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "podolog-cookie-consent";
export const CONSENT_COOKIE_NAME = "podolog_consent";
export const CONSENT_MAX_AGE_DAYS = 180;

export const CONSENT_CATEGORIES = ["necessary", "analytics", "marketing", "preferences"] as const;

export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];

export type ConsentState = {
  version: number;
  updatedAt: string;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export const DEFAULT_DENIED_CONSENT: Omit<ConsentState, "updatedAt"> = {
  version: CONSENT_VERSION,
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

export const DEFAULT_GRANTED_CONSENT: Omit<ConsentState, "updatedAt"> = {
  version: CONSENT_VERSION,
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
};
