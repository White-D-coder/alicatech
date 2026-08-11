import { ChevronDown } from 'lucide-react';

export const IndustriesPage = () => {
  const industries = [
    {
      id: 1,
      title: 'Industrial Technology',
      image: '/Alica-Capabilities-IT.jpg',
      description: 'Reliable electronic manufacturing solutions for demanding industrial applications.',
    },
    {
      id: 2,
      title: 'Automotive',
      image: '/Alica-Capabilities-Automotive.jpg',
      description: 'Precision electronic manufacturing for safety-critical and performance-driven automotive systems.',
    },
    {
      id: 3,
      title: 'Medical Technology',
      image: '/Alica-Capabilities-Medical-Industry-Cropped.jpg',
      description: 'High-quality electronic manufacturing for medical and healthcare devices.',
    },
    {
      id: 4,
      title: 'Communication',
      image: '/alica-technologies-capabilities-communications.jpg',
      description: 'High-frequency, durable, and miniaturized components for 5G, telecom, and networking.',
    },
    {
      id: 5,
      title: 'Consumer Electronics',
      image: '/alicatechnologies-capabilities-consumer-electronics.jpg',
      description: 'Efficient and scalable manufacturing for modern electronic products.',
    },
    {
      id: 6,
      title: 'IoT & Embedded Systems',
      image: '/alica-technologies-capabilities-IoT-Embedded-Systems.jpg',
      description: 'Precision manufacturing for connected and intelligent electronic systems.',
    },
    {
      id: 7,
      title: 'Power & Energy',
      image: '/power_energy.jpg',
      description: 'Reliable electronic manufacturing for power management and energy systems.',
    },
    {
      id: 8,
      title: 'Aerospace & Defense',
      image: '/Aerospace-defense.jpg',
      description: 'Our assemblies are designed to withstand severe thermal shock, vibration, and radiation using advanced materials.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Top Industrial Hero Banner */}
      <section className="relative bg-[#062630] text-white pt-28 sm:pt-36 pb-20 lg:pb-24 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="media-library-download-1786351951/2151995237.jpg"
            alt="Industrial Skyline Sunset"
            className="w-full h-full object-cover brightness-90 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/80 via-amber-950/60 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white font-montserrat tracking-tight leading-tight">
            Industries We Serve
          </h1>
          <p className="text-gray-200 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Our manufacturing approach focuses on durability, accuracy, and compliance to meet the operational demands of industrial applications.
          </p>

          <div className="pt-6">
            <ChevronDown size={24} className="opacity-85 animate-bounce mx-auto text-white" />
          </div>
        </div>
      </section>

      {/* 2. 8 Industry Cards Grid */}
      <section className="py-16 lg:py-20 bg-[#fcfdfe] bg-grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((item) => (
              <div key={item.id} className="bg-white rounded-[10px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full">
                <div className="space-y-4">
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100 rounded-t-[10px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-t-[10px]"
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-bold text-[#0d3b2e] font-montserrat group-hover:text-[#006828] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
