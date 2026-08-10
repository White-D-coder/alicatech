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
    <section id="capabilities" className="py-20 lg:py-28 bg-[#fcfdfe] bg-grid-lines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Image - Authentic media library asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[10px] overflow-hidden shadow-2xl border border-gray-100 group">
              <img
                src="/media-library-download-1786351951/2148925545.jpg"
                alt="High Precision Microchip Circuit Inspection at Alica Technologies"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-[10px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
            </div>
          </div>

          {/* Right Column Differentiators Text & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block bg-[#e8eff1] text-[#0d3b2e] text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                DIFFERENTIATORS
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d3b2e] tracking-tight mb-4 font-montserrat">
                Why choose Alica?
              </h2>

              <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed">
                End-to-end electronic manufacturing services from prototype to production
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-4">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      item.highlighted
                        ? 'bg-[#0d3b2e] text-white shadow-md'
                        : 'bg-[#eaf1f1] text-[#0d3b2e]'
                    }`}
                  >
                    <Check size={16} strokeWidth={item.highlighted ? 3 : 2.5} />
                  </div>
                  <span
                    className={`text-base font-semibold ${
                      item.highlighted ? 'text-[#0d3b2e] font-bold' : 'text-gray-700'
                    }`}
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
