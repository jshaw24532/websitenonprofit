export default function HeroBanner() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-city.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-city.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,25,41,0.82)_0%,rgba(30,58,95,0.72)_50%,rgba(45,90,135,0.6)_100%)]" />
      <div className="hero-cinematic-overlay absolute inset-0" aria-hidden="true" />
    </div>
  );
}
