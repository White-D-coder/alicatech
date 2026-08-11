export const Hero = () => {
  return (
    <section className="relative bg-[#062b35] text-white pt-25 pb-16 sm:pt-16 sm:pb-24 lg:pt-35 lg:pb-32 overflow-visible">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Banner-Home.jpg"
          alt="PCB Electronics Manufacturing Background"
          className="w-full h-full object-cover object-top opacity-90 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6 pt-12 pb-12 sm:pb-16 lg:pb-20">
          {/* Main Title - Partner on its own line directly under Your EMS */}
          <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-bold font-montserrat tracking-tight leading-[1.1] text-white drop-shadow-md">
            <span className="block">Your EMS</span>
            <span className="relative inline-block text-white mt-1">
              Partner
              {/* Yellow Underline Stroke directly under Partner */}
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
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-lg sm:text-xl text-gray-200 font-normal leading-relaxed max-w-2xl pt-1">
            Reliable manufacturing backed by proven processes.
          </p>

          {/* Action Buttons Row */}
          <div className="pt-4 flex flex-wrap items-center gap-8">
            {/* View Services Yellow Button */}
            <a
              href="#services"
              className="bg-[#ffc82e] hover:bg-[#ffd34f] text-gray-950 font-bold px-8 py-3.5 rounded-[6px] text-base tracking-wide shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 font-montserrat cursor-pointer"
            >
              View Services
            </a>

            {/* Get a quote / Phone Number Text on Right */}
            <div className="space-y-0.5">
              <span className="text-xs text-gray-200 uppercase font-medium tracking-wider block">
                get a quote
              </span>
              <a
                href="tel:+919727178787"
                className="text-lg sm:text-xl font-bold text-[#ffc82e] hover:text-white transition-colors font-montserrat tracking-tight block"
              >
                +91 97271 78787
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};