import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="flex min-h-[70vh] items-center justify-center px-6 pt-24">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">{t("notFound.title")}</h1>
          <p className="mb-4 text-xl text-muted-foreground">{t("notFound.message")}</p>
          <Link to="/" className="text-primary underline hover:text-primary/90">
            {t("notFound.homeLink")}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
