import { Check } from 'lucide-react';

export const WhyChooseAlica = () => {
  const differentiators = [
    {
      title: 'Precision and Quality Control',
      highlighted: true,
    },
    {
      title: 'Advanced Machinery (SPI, AOI, X-Ray)',
      highlighted: false,
    },
    {
      title: 'Rapid Prototyping Expertise',
      highlighted: false,
    },
    {
      title: 'IPC-Recommended SOPs',
      highlighted: false,
    },
  ];

  return (
    <section id="capabilities" className="py-16 lg:py-20 bg-[#fcfdfe] bg-grid-lines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[10px] overflow-hidden shadow-2xl border border-gray-100 group">
              <img
                src="/2148925545.jpg"
                alt="High Precision Microchip Circuit Inspection at Alica Technologies"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-[10px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
            </div>
          </div>

          {/* Right Column Differentiators Text & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-s font-bold text-[#0d3b2e] block font-montserrat mb-3">
                Differentiators
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d3b2e] tracking-tight mb-4 font-montserrat">
                Why Choose Alica?
              </h2>

              <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed">
                End-to-end electronic manufacturing services from prototype to production
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-2">
              {differentiators.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-4 cursor-pointer transition-all duration-300 ease-out hover:translate-x-2"
                >
                  <div
                    className="
          w-7 h-7 rounded-full
          flex items-center justify-center shrink-0
          bg-[#eaf1f1] text-[#0d3b2e]
          transition-all duration-300 ease-out
          group-hover:bg-[#0d3b2e]
          group-hover:text-white
          group-hover:scale-110
          group-hover:rotate-[8deg]
          group-hover:shadow-md
        "
                  >
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <span
                    className="
          text-base font-semibold text-gray-700
          transition-colors duration-300
          group-hover:text-[#0d3b2e]
        "
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
