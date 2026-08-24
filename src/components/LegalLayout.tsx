import type { ReactNode } from "react";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";

export function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-24 pb-16">
        <PageBreadcrumb />
        <article className="container mx-auto px-6 py-10 max-w-3xl space-y-8">{children}</article>
      </main>
      <Footer />
    </div>
  );
}
