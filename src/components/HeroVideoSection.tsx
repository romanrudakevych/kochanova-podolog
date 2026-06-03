import { useTranslation } from "react-i18next";

const ambientVideoSrc = `${import.meta.env.BASE_URL}media/ambient.mp4`;

const HeroVideoSection = () => {
  const { t } = useTranslation();

  return (
    <section aria-label={t("ambientVideo.sectionLabel")} className="relative w-full overflow-hidden">
      <span className="sr-only">{t("ambientVideo.description")}</span>
      <div className="aspect-[21/9] max-h-[min(42vh,28rem)] w-full bg-muted">
        <video
          className="h-full w-full object-cover pointer-events-none select-none"
          src={ambientVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          controls={false}
          aria-hidden
        />
      </div>
    </section>
  );
};

export default HeroVideoSection;
