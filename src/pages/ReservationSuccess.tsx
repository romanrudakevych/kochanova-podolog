import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CalendarDays, CheckCircle2, Home } from "lucide-react";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { RESERVATION_PATH } from "@/seo/routes";

const ReservationSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-24 pb-16">
        <PageBreadcrumb />
        <section className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 py-12">
          <div
            role="status"
            aria-live="polite"
            className="glass-panel w-full max-w-lg p-8 sm:p-10 text-center space-y-5"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-9 w-9 text-primary" aria-hidden />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-glow">
              {t("reservationSuccessPage.title")}
            </h1>
            <p className="text-muted-foreground leading-relaxed">{t("reservationSuccessPage.body")}</p>
            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-center pt-2">
              <Button variant="glass" size="lg" className="rounded-xl" asChild>
                <Link to={RESERVATION_PATH}>
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  {t("reservationSuccessPage.bookAnother")}
                </Link>
              </Button>
              <Button variant="hero" size="lg" className="rounded-xl" asChild>
                <Link to="/">
                  <Home className="h-4 w-4" aria-hidden />
                  {t("reservationSuccessPage.homeCta")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationSuccess;
