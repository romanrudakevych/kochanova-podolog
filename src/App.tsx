import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DocumentLang } from "@/components/DocumentLang";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Reservation from "./pages/Reservation.tsx";
import PodologicConsultation from "./pages/PodologicConsultation.tsx";
import IngrownNailTreatment from "./pages/IngrownNailTreatment.tsx";
import WartTreatment from "./pages/WartTreatment.tsx";
import CornTreatment from "./pages/CornTreatment.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DocumentLang />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rezervace" element={<Reservation />} />
          <Route path="/podologicka-konzultace-praha" element={<PodologicConsultation />} />
          <Route path="/zarostly-nehet-praha" element={<IngrownNailTreatment />} />
          <Route path="/bradavice-praha" element={<WartTreatment />} />
          <Route path="/kuri-oko-praha" element={<CornTreatment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;