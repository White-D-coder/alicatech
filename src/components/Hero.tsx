import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative bg-[#062b35] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 overflow-visible">
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
        <div className="max-w-3xl space-y-6 pt-4 pb-12 sm:pb-16 lg:pb-20">
          {/* Subtitle Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2"
          >
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#ffc82e] uppercase">
              ELECTRONIC MANUFACTURING SERVICES
            </span>
          </motion.div>

          {/* Main Title (40px Montserrat as requested) */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.88, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[40px] font-extrabold font-montserrat tracking-tight leading-[1.15] text-white drop-shadow-md"
          >
            Your EMS Partner For{' '}
            <span className="relative inline-block text-white">
              End-to-End
              {/* Yellow Underline Stroke */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#ffc82e]"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C50 3 150 3 198 9"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="animate-yellow-stroke"
                />
              </svg>
            </span>{' '}
            Electronic Manufacturing
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, scale: 0.9, y: 25, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl pt-1"
          >
            Alica Technologies LLP provides structured, reliable, and high-precision SMT & THT PCB assembly, testing, inspection, and turnkey manufacturing solutions across industries.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 flex flex-wrap items-center gap-4"
          >
            <a
              href="#services"
              className="bg-[#ffc82e] hover:bg-[#ffd34f] text-gray-950 font-bold px-8 py-3.5 rounded-[6px] text-sm tracking-wider uppercase shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Our Capabilities
            </a>
            <a
              href="#about"
              className="border-2 border-white/80 hover:border-white text-white hover:bg-white/10 font-bold px-8 py-3 rounded-[6px] text-sm tracking-wider uppercase transition-all"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};