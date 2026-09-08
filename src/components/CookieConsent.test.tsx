import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentProvider } from "@/consent/ConsentContext";
import { initI18n } from "@/i18n/i18n";

async function renderBanner() {
  return render(
    <MemoryRouter>
      <ConsentProvider>
        <CookieConsent />
      </ConsentProvider>
    </MemoryRouter>,
  );
}

describe("cookie consent banner", () => {
  beforeAll(async () => {
    await initI18n();
  });

  beforeEach(() => {
    localStorage.clear();
    document.cookie = "podolog_consent=; Max-Age=0; Path=/";
  });

  afterEach(() => {
    localStorage.clear();
    document.body.style.paddingBottom = "";
  });

  it("shows the Czech banner on a first visit", async () => {
    await renderBanner();
    expect(await screen.findByRole("heading", { name: "Používáme cookies" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Povolit vše" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Odmítnout vše" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Nastavení cookies" })).toBeInTheDocument();
  });

  it("hides the banner after rejecting cookies and keeps a way to reopen settings", async () => {
    await renderBanner();
    fireEvent.click(await screen.findByRole("button", { name: "Odmítnout vše" }));

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Používáme cookies" })).not.toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "Nastavení cookies" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("podolog-cookie-consent")!).analytics).toBe(false);
  });

  it("stores an accept-all choice", async () => {
    await renderBanner();
    fireEvent.click(await screen.findByRole("button", { name: "Povolit vše" }));
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("podolog-cookie-consent")!).analytics).toBe(true);
    });
  });

  it("lets the visitor save individual categories", async () => {
    await renderBanner();
    fireEvent.click(await screen.findByRole("button", { name: "Nastavení cookies" }));
    expect(await screen.findByText("Analytické cookies")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("switch", { name: "Analytické cookies" }));
    fireEvent.click(screen.getByRole("button", { name: "Uložit nastavení" }));

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem("podolog-cookie-consent")!);
      expect(stored.analytics).toBe(true);
      expect(stored.marketing).toBe(false);
    });
  });
});
