import { useEffect } from 'react';
import { ChevronDown, Compass, MessageSquare, ShoppingCart, Route } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';


export const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us | Alica Technologies LLP";
  }, []);
  const reviews = [
    {
      author: 'Kishan Changela',
      role: 'Founder & Business Partner',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRii46i32zUdQ107Pxw8d-tldnquyu7_ehXe0rDUtmdJQ&s=10',
      text: 'By enrolling in the Four Bear Program, UM guarantees you will graduate in four years with a bachelor\'s degree. Discover the global city—filled with inspiration, opportunities to explore.',
    },
    {
      author: 'Shane Dore',
      role: 'PayPal',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEPZNI-M7HvOsJJZvsoUaGNcZIhGk_6abOVOWw-NcUpQ&s=10',
      text: 'By enrolling in the Four Bear Program, UM guarantees you will graduate in four years with a bachelor\'s degree. Discover the global city—filled with inspiration, opportunities to explore.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section
        className="text-white pt-12 sm:pt-16 pb-16 px-4 flex flex-col items-center justify-between relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/SMT-PCB-Assembly-1.jpg')" }}
      >
        <div className="flex-1 flex items-center justify-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold font-montserrat tracking-wider text-white text-center text-shadow-lg">
            About
          </h1>
        </div>

        <div className="pb-2 relative z-10">
          <button
            onClick={() => {
              const section = document.getElementById('about-content');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Scroll down to content"
            className="focus:outline-none cursor-pointer group p-2 inline-block"
          >
            <ChevronDown
              size={22}
              className="opacity-80 animate-bounce text-white group-hover:scale-125 transition-transform"
            />
          </button>
        </div>
      </section>

      {/* 2. Arch Philosophy & Headquarters Section */}
      <section id="about-content" className="py-16 lg:py-20 bg-white bg-grid-lines">
  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
    <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

      {/* Left Image: Global Headquarters */}
      <div className="lg:col-span-6 space-y-3">
        <div className="rounded-[10px] overflow-hidden shadow-2xl border border-gray-100">
          <img
            src="/O1.jpg"
            alt="Alica Technologies Global Headquarters Ahmedabad"
            className="w-full h-auto object-cover"
          />
        </div>

        <p className="text-sm font-bold text-[#0d3b2e] pt-1">
          Global Headquarters (Ahmedabad, Gujarat)
        </p>
      </div>

      {/* Right Text Content */}
      <div className="lg:col-span-6 space-y-6">
        <span className="text-s font-bold text-[#0d3b2e] block font-montserrat">
          Arch Philosophy
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d3b2e] tracking-tight font-montserrat leading-tight">
          About{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Alica Technologies</span>
            <span className="absolute left-0 right-0 bottom-[8%] h-[32%] bg-[#dce7f8] -z-0" />
          </span>
        </h2>

        <p className="text-gray-700 font-medium text-base sm:text-lg leading-relaxed">
          A pure Electronic Manufacturing Services (EMS) company focused on precision, quality, and reliable execution.
        </p>

        <div className="space-y-4 text-gray-600 text-base leading-relaxed font-normal">
          <p>
            Alica Technologies LLP is a dedicated Electronic Manufacturing Services (EMS) company specializing in PCB assembly, testing, inspection, and turnkey project delivery. We are committed to providing structured, process-driven manufacturing solutions that meet defined technical and quality standards.
          </p>

          <p>
            Our focus is on building long-term partnerships by delivering consistent results, transparent communication, and dependable manufacturing support.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* 3. Our Approach Section */}
      <section className="py-5 lg:py-20 bg-[#ffffff] bg-grid-lines">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-6 sm:mb-12">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d3b2e] tracking-tight font-montserrat leading-tight">
                Our{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Approach</span>
                  <span className="absolute left-0 right-0 bottom-[8%] h-[32%] bg-[#dce7f8] -z-0" />
                </span>
              </h2>

              <p className="text-gray-700 text-base font-medium leading-relaxed">
                At Alica Technologies, quality is integrated into every stage of manufacturing.
              </p>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                From solder paste inspection to final testing, our processes are designed to detect defects early, ensure consistency, and maintain reliability across production runs.
              </p>
            </div>

            {/* Right Image: Team Photo */}
            <div className="lg:col-span-7">
              <div className="rounded-[10px] overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/FZL_7706-3.jpg"
                  alt="Alica Technologies Engineering Team"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3 Steps Bar - Mobile Marquee View */}
          <div className="block sm:hidden overflow-hidden max-w-4xl mx-auto">
            <div className="animate-marquee flex items-center space-x-6 whitespace-nowrap">
              <div className="flex items-center space-x-3 shrink-0">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 font-bold text-gray-800 flex items-center justify-center text-xs shrink-0">
                  1
                </div>
                <span className="text-xs font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                  MAKE AN APPOINTMENT
                </span>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 font-bold text-gray-800 flex items-center justify-center text-xs shrink-0">
                  2
                </div>
                <span className="text-xs font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                  BUSINESS CONSULTATION
                </span>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 font-bold text-gray-800 flex items-center justify-center text-xs shrink-0">
                  3
                </div>
                <span className="text-xs font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                  BUSINESS ANALYTICS
                </span>
              </div>

              {/* Duplicate set for continuous seamless marquee loop */}
              <div className="flex items-center space-x-3 shrink-0">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 font-bold text-gray-800 flex items-center justify-center text-xs shrink-0">
                  1
                </div>
                <span className="text-xs font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                  MAKE AN APPOINTMENT
                </span>
              </div>
              <span className="text-gray-300 font-light">|</span>
              <div className="flex items-center space-x-3 shrink-0">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 font-bold text-gray-800 flex items-center justify-center text-xs shrink-0">
                  2
                </div>
                <span className="text-xs font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                  BUSINESS CONSULTATION
                </span>
              </div>
              <span className="text-gray-300 font-light">|</span>
              <div className="flex items-center space-x-3 shrink-0">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 font-bold text-gray-800 flex items-center justify-center text-xs shrink-0">
                  3
                </div>
                <span className="text-xs font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                  BUSINESS ANALYTICS
                </span>
              </div>
              <span className="text-gray-300 font-light">|</span>
            </div>
          </div>

          {/* 3 Steps Bar - Desktop Grid View */}
          <div className="hidden sm:grid sm:grid-cols-3 bg-white shadow-md p-4 sm:p-6 gap-6 text-center max-w-4xl mx-auto rounded-full border border-gray-200 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center justify-center space-x-3 group">
              <div className="w-9 h-9 rounded-full border-2 border-gray-300 group-hover:border-[#006828] group-hover:bg-[#006828] group-hover:text-white font-bold text-gray-800 flex items-center justify-center text-sm shrink-0 transition-colors">
                1
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                MAKE AN APPOINTMENT
              </span>
            </div>

            <div className="flex items-center justify-center space-x-3 sm:border-l sm:border-gray-200 group">
              <div className="w-9 h-9 rounded-full border-2 border-gray-300 group-hover:border-[#006828] group-hover:bg-[#006828] group-hover:text-white font-bold text-gray-800 flex items-center justify-center text-sm shrink-0 transition-colors">
                2
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                BUSINESS CONSULTATION
              </span>
            </div>

            <div className="flex items-center justify-center space-x-3 sm:border-l sm:border-gray-200 group">
              <div className="w-9 h-9 rounded-full border-2 border-gray-300 group-hover:border-[#006828] group-hover:bg-[#006828] group-hover:text-white font-bold text-gray-800 flex items-center justify-center text-sm shrink-0 transition-colors">
                3
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                BUSINESS ANALYTICS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Green Stats Counter Banner Section */}
      <section className="relative bg-[#355c31] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 bg-cover bg-center mix-blend-overlay">
          <img
            src="/hero-robotic-arm.png"
            alt="Circuit artwork"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-3 p-4">
              <div className="w-14 h-14 flex items-center justify-center text-white mb-1">
                <Compass size={38} strokeWidth={1} />
              </div>
              <span className="text-4xl sm:text-5xl font-bold font-montserrat tracking-tight text-white">
                <AnimatedCounter end={10} suffix="+" />
              </span>
              <span className="text-sm font-medium text-emerald-100">
                Global Coverage
              </span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3 p-4">
              <div className="w-14 h-14 flex items-center justify-center text-white mb-1">
                <MessageSquare size={38} strokeWidth={1} />
              </div>
              <span className="text-4xl sm:text-5xl font-bold font-montserrat tracking-tight text-white">
                <AnimatedCounter end={12} suffix="+" />
              </span>
              <span className="text-sm font-medium text-emerald-100">
                Years of Experience
              </span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3 p-4">
              <div className="w-14 h-14 flex items-center justify-center text-white mb-1">
                <ShoppingCart size={38} strokeWidth={1} />
              </div>
              <span className="text-4xl sm:text-5xl font-bold font-montserrat tracking-tight text-white">
                <AnimatedCounter end={700} suffix="+" />
              </span>
              <span className="text-sm font-medium text-emerald-100">
                Products
              </span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3 p-4">
              <div className="w-14 h-14 flex items-center justify-center text-white mb-1">
                <Route size={38} strokeWidth={1} />
              </div>
              <span className="text-4xl sm:text-5xl font-bold font-montserrat tracking-tight text-white">
                <AnimatedCounter end={30} suffix="k" />
              </span>
              <span className="text-sm font-medium text-emerald-100">
                Sqft+ Facility
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Business Partners Section */}
      <section className="py-16 lg:py-20 bg-white bg-grid-lines">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-4 space-y-6 text-center">
            <span className="text-s font-bold text-[#0d3b2e] inline-block font-montserrat">
              A Deep Commitment to Diversity
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0d3b2e] font-montserrat">
              Business Partners
            </h2>
          </div>

          {/* Testimonial Cards Grid with Full-Height Rectangular Left Image Frames */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200/80 rounded-[10px] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 min-h-[220px]"
              >
                {/* Left 5 cols: Full Height Rectangular Founder Image Frame */}
                <div className="sm:col-span-5 relative bg-gray-100 min-h-[200px] sm:min-h-full">
                  <img
                    src={review.image}
                    alt={review.author}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>

                {/* Right 7 cols: Testimonial Text & Founder Info */}
                <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {review.text}
                  </p>

                  <div className="pt-3 border-t border-gray-100 space-y-0.5">
                    <h4 className="text-base font-bold text-[#0d3b2e] font-montserrat leading-snug">
                      {review.author}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Counter Stats Row */}
          <div className="text-center pt-16">
            <p className="text-gray-500 text-sm font-medium">
              Our nearly{' '}
              <span className="text-[#0d3b2e] font-bold text-base">
                <AnimatedCounter end={400} suffix="+" />
              </span>{' '}
              committed staff members are ready to help.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
