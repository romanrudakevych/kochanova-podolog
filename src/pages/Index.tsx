import { lazy, Suspense } from "react";
import Navbar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const CertificatesSection = lazy(() => import("@/components/CertificatesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <StatsSection />
    <AboutSection />
    <Suspense fallback={null}>
      <CertificatesSection />
      <ContactSection />
    </Suspense>
    <Footer />
  </div>
);

export default Index;
