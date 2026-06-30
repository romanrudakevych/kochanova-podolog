import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Reservation = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24">
      <iframe
        src="https://noona.app/cs/podolog-kochanova/book?iframe=true&darkModeDisabled=true&showCancelButton=true"
        title="Reservation"
        frameBorder="0"
        width="100%"
        height="800"
        style={{ height: "80vh" }}
        className="w-full border-0"
        allow="fullscreen"
      />
    </main>
    {/* <Footer /> */}
  </div>
);

export default Reservation;
