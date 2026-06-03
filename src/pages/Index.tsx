import Navbar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import HeroVideoSection from "@/components/HeroVideoSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CarouselSection from "@/components/CarouselSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    {/* <HeroVideoSection /> */}
    <ServicesSection />
    <CarouselSection />
    <AboutSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;