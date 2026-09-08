import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { useTranslation } from "react-i18next";

const Reservation = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-24">
        <PageBreadcrumb />
        <h1 className="sr-only">{t("reservationPage.title")}</h1>
        <iframe
          src="https://noona.app/cs/podolog-kochanova/book?iframe=true&darkModeDisabled=true&showCancelButton=true"
          title={t("reservationPage.iframeTitle")}
          width="100%"
          height="800"
          style={{ height: "80vh" }}
          className="w-full border-0"
          allow="fullscreen"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;
