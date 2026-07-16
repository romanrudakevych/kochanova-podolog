import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DocumentLang } from "@/components/DocumentLang";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";

const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Reservation = lazy(() => import("./pages/Reservation.tsx"));
const PodologicConsultation = lazy(() => import("./pages/PodologicConsultation.tsx"));
const IngrownNailTreatment = lazy(() => import("./pages/IngrownNailTreatment.tsx"));
const WartTreatment = lazy(() => import("./pages/WartTreatment.tsx"));
const CornTreatment = lazy(() => import("./pages/CornTreatment.tsx"));
const NailFungusTreatment = lazy(() => import("./pages/NailFungusTreatment.tsx"));
const NailBraceTreatment = lazy(() => import("./pages/NailBraceTreatment.tsx"));
const PodologicPedicure = lazy(() => import("./pages/PodologicPedicure.tsx"));
const KartPedicure = lazy(() => import("./pages/KartPedicure.tsx"));
const OkluzeTreatment = lazy(() => import("./pages/OkluzeTreatment.tsx"));
const NailExtensionClipFlow = lazy(() => import("./pages/NailExtensionClipFlow.tsx"));
const TamponadeTreatment = lazy(() => import("./pages/TamponadeTreatment.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DocumentLang />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rezervace" element={<Reservation />} />
            <Route path="/podologicka-konzultace-praha" element={<PodologicConsultation />} />
            <Route path="/zarostly-nehet-praha" element={<IngrownNailTreatment />} />
            <Route path="/bradavice-praha" element={<WartTreatment />} />
            <Route path="/kuri-oko-praha" element={<CornTreatment />} />
            <Route path="/plisen-nehtu-praha" element={<NailFungusTreatment />} />
            <Route path="/nehtove-rovnatko-praha" element={<NailBraceTreatment />} />
            <Route path="/podologicka-pedikura-praha" element={<PodologicPedicure />} />
            <Route path="/kart-pedikura-praha" element={<KartPedicure />} />
            <Route path="/okluze" element={<OkluzeTreatment />} />
            <Route path="/nadstavba-nehtu" element={<NailExtensionClipFlow />} />
            <Route path="/tamponada" element={<TamponadeTreatment />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
