const embedUrl = import.meta.env.VITE_RESERVATION_EMBED_URL?.trim();

const Reservation = () => (
  <div className="fixed inset-0 m-0 h-dvh w-full bg-background">
    <h1>Reservation is here</h1>
    {/* <iframe
      src={embedUrl || "about:blank"}
      title="Reservation"
      className="h-full w-full border-0"
      allow="fullscreen; payment"
      referrerPolicy="no-referrer-when-downgrade"
    /> */}
  </div>
);

export default Reservation;
