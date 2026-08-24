import { useContext } from "react";
import { ConsentContext } from "./context";

export function useCookieConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within ConsentProvider");
  }
  return ctx;
}
