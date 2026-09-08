import { LOCALE_STORAGE_KEY } from "@/i18n/constants";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_DENIED_CONSENT,
  DEFAULT_GRANTED_CONSENT,
  type ConsentCategory,
  type ConsentState,
} from "./types";

function nowIso() {
  return new Date().toISOString();
}

function isExpired(updatedAt: string): boolean {
  const then = Date.parse(updatedAt);
  if (Number.isNaN(then)) return true;
  const maxAgeMs = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - then > maxAgeMs;
}

function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (typeof parsed.updatedAt !== "string" || isExpired(parsed.updatedAt)) return null;
    if (parsed.necessary !== true) return null;
    if (typeof parsed.analytics !== "boolean") return null;
    if (typeof parsed.marketing !== "boolean") return null;
    if (typeof parsed.preferences !== "boolean") return null;
    return {
      version: CONSENT_VERSION,
      updatedAt: parsed.updatedAt,
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      preferences: parsed.preferences,
    };
  } catch {
    return null;
  }
}

function writeCookie(value: string) {
  if (typeof document === "undefined") return;
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function readCookie(): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${CONSENT_COOKIE_NAME}=`;
  const match = document.cookie.split("; ").find((part) => part.startsWith(prefix));
  if (!match) return null;
  try {
    return decodeURIComponent(match.slice(prefix.length));
  } catch {
    return null;
  }
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const fromStorage = parseConsent(localStorage.getItem(CONSENT_STORAGE_KEY));
    if (fromStorage) return fromStorage;
  } catch {
    /* private mode */
  }
  return parseConsent(readCookie());
}

export function writeConsent(partial: Omit<ConsentState, "updatedAt" | "version" | "necessary">): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    updatedAt: nowIso(),
    necessary: true,
    analytics: partial.analytics,
    marketing: partial.marketing,
    preferences: partial.preferences,
  };
  const serialized = JSON.stringify(state);
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
  } catch {
    /* ignore quota / private mode */
  }
  writeCookie(serialized);
  if (!state.preferences) {
    try {
      localStorage.removeItem(LOCALE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
  return state;
}

export function acceptAllConsent(): ConsentState {
  return writeConsent(DEFAULT_GRANTED_CONSENT);
}

export function rejectAllConsent(): ConsentState {
  return writeConsent(DEFAULT_DENIED_CONSENT);
}

export function hasConsentCategory(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const consent = readConsent();
  return consent?.[category] === true;
}
