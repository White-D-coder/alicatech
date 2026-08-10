export const Hero = () => {
  return (
    <section id="home" className="relative min-h-[calc(100vh-64px)] sm:min-h-[1000px] lg:min-h-[746px] flex items-center bg-[#062630] overflow-hidden group">
      {/* Background Image: Tall centered robotic arm background image matching reference mobile view */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Banner-Home.jpg"
          alt="EMS Manufacturing Robotic Arm Banner"
          className="w-full h-full object-cover object-center sm:object-top brightness-90 opacity-80"
        />
        {/* Dark Cyan/Teal Overlay matching reference site */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#062630]/85 via-[#062630]/70 to-[#062630]/90 md:bg-gradient-to-r md:from-[#062630]/90 md:via-[#062630]/65 md:to-transparent" /> */}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side: Typography & Action Row */}
          <div className="lg:col-span-7 text-white space-y-6">
            {/* Title H1 */}
            <h1 className="font-montserrat text-xl sm:text-5xl lg:text-[88px] font-extrabold tracking-tight leading-[1.08] text-white">
              <span className="block">Your EMS</span>
              <span className="relative inline-block mt-1">
                <span>Partner</span>

                {/* Animated Yellow Stroke SVG under Partner */}
                <svg
    className="absolute -bottom-3 -left-1 w-[108%] h-6 pointer-events-none z-0 overflow-visible"
    viewBox="0 0 500 50"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="
        M 4 30
        C 35 22, 61 25, 92 21
        C 123 17, 151 22, 183 18
        C 214 15, 244 20, 276 16
        C 307 13, 337 18, 369 14
        C 402 11, 435 16, 468 12
        C 480 10, 490 10, 497 8

        L 498 20
        C 484 22, 472 23, 458 23
        C 426 26, 396 23, 365 27
        C 333 30, 303 27, 272 31
        C 240 34, 211 30, 180 34
        C 149 37, 120 33, 90 38
        C 61 42, 33 37, 8 43
        C 4 41, 2 36, 4 30
        Z
      "
      fill="#FFC82E"
    />

    {/* rough dry-brush texture */}
    <path
      d="M8 31 C70 22 125 27 185 20 C250 15 310 22 370 16 C420 12 462 17 496 10"
      fill="none"
      stroke="#FFC82E"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.9"
    />

    <path
      d="M12 37 C70 30 125 34 190 27 C250 22 315 29 375 22 C425 19 465 22 492 17"
      fill="none"
      stroke="#FFC82E"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.75"
    />
  </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#ffffffb3] font-normal max-w-lg leading-relaxed pt-1">
              Reliable manufacturing backed by proven processes.
            </p>

            {/* Action Row: Stacked on Mobile, horizontal on Desktop */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {/* View Services CTA Button */}
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#ffc82e] hover:bg-[#ffd34f] text-gray-950 font-bold px-8 py-4 rounded-[6px] text-base shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none font-montserrat text-center"
              >
                View Services
              </a>

              <div className="flex flex-col text-left pt-2 sm:pt-0">
                <span className="text-xs text-gray-200 font-bold tracking-wider lowercase">
                  get a quote
                </span>
                <a
                  href="tel:+919727178787"
                  className="text-xl sm:text-2xl font-extrabold text-[#ffc82e] hover:text-yellow-300 transition-colors font-montserrat tracking-tight"
                >
                  +91 97271 78787
                </a>
              </div>
            </div>
          </div>

          {/* Right Side Spacer */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </div>
    </section>
  );
};