export const LocationBanner = () => {
  return (
    <section className="relative bg-[#3B6932D4] text-white py-16 lg:py-20 overflow-hidden">
      {/* Background Circuit Overlay Artwork */}
      <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay">
        <img
          src="/hero-robotic-arm.png"
          alt="Circuit schematic background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug max-w-4xl mx-auto">
          Electronic Manufacturing & PCB Assembly Services in{' '}
          <span className="text-[#ffc82e] relative inline-block underline decoration-[#ffc82e] decoration-4 underline-offset-8">
            Ahmedabad
          </span>
        </h2>
      </div>
    </section>
  );
};
