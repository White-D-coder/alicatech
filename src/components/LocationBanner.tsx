export const LocationBanner = () => {
  return (
    <section className="relative bg-[#3B6932D4] text-white py-10 lg:py-20 overflow-hidden">
      {/* Background Circuit Overlay Artwork */}
      <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay">
        <img
          src="/hero-robotic-arm.png"
          alt="Circuit schematic background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug max-w-4xl mx-auto">
          Electronic Manufacturing & PCB Assembly Services in{' '}
          <span className="text-[#ffc82e] relative inline-block">
            Ahmedabad
            <svg
              className="absolute -bottom-2.5 left-0 w-full h-4 text-[#ffc82e]"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9C50 3 150 3 198 9"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-yellow-stroke"
              />
            </svg>
          </span>
        </h2>
      </div>
    </section>
  );
};
