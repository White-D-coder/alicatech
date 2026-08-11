import { Check } from 'lucide-react';

export const CapabilitiesPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section with Big Yellow Overlapping Title "Manufacturing Capabilities" */}
      <section className="bg-white pt-20 sm:pt-28 pb-16 lg:pb-24 text-center relative overflow-hidden bg-grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Huge Yellow 2-Line Overlapping Title */}
          <div className="relative z-20 space-y-0">
            <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-bold text-[#ffc82e] font-montserrat tracking-tight leading-[0.95] text-center drop-shadow-xs">
              <span className="block">Manufacturing</span>
              <span className="block mt-1">Capabilities</span>
            </h1>
          </div>

          {/* Centered Image overlapping with top text */}
          <div className="group relative z-10 -mt-8 sm:-mt-12 lg:-mt-16 rounded-[4px] overflow-hidden shadow-2xl max-w-5xl mx-auto border border-gray-100 cursor-pointer">
  <img
    src="/37264.jpg"
    alt="Alica Technologies Manufacturing Robotic Line"
    className="
      w-full h-auto object-cover max-h-[580px]
      transition-transform duration-700 ease-out
      group-hover:scale-[1.04]
    "
  />

  {/* Subtle dark overlay */}
  <div
    className="
      absolute inset-0
      bg-[#0d3b2e]/0
      group-hover:bg-[#0d3b2e]/10
      transition-all duration-500
      pointer-events-none
    "
  />

  {/* Light sweep */}
  <div
    className="
      absolute top-0 -left-[120%]
      w-[60%] h-full
      bg-gradient-to-r
      from-transparent
      via-white/20
      to-transparent
      skew-x-[-20deg]
      transition-all duration-700 ease-out
      group-hover:left-[130%]
      pointer-events-none
    "
  />
</div>
        </div>
      </section>

      {/* 2. Reliable Execution & PCB Assembly Capabilities Section */}
      <section className="py-20 lg:py-24 bg-white bg-grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Reliable Execution Row */}
              <span className="text-xs font-bold text-[#0d3b2e] tracking-wider uppercase font-montserrat">
                Reliable Execution
              </span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d3b2e] font-montserrat tracking-tight leading-snug">
                Precision, consistency, and reliability.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed pt-2">
                Advanced electronic manufacturing capabilities designed for precision, consistency, and reliability.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6 text-gray-600 text-base leading-relaxed">
              <p>
                Alica Technologies LLP offers structured and process-driven electronic manufacturing capabilities to support complex PCB assemblies and electronic products. Our facility integrates advanced SMT equipment, inspection systems, and controlled workflows to ensure accuracy, repeatability, and dependable output.
              </p>
              <p>
                From fine-pitch component placement to multi-stage inspection, our capabilities are designed to meet demanding technical requirements across industries.
              </p>
            </div>
          </div>

          {/* PCB Assembly Capabilities Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image: Circuit Assembly */}
            <div className="lg:col-span-6">
              <div className="rounded-[8px] overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/2151575719.jpg"
                  alt="PCB Assembly Capabilities at Alica"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Text with Hover Check Icons */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block bg-[#e8eff1] text-[#0d3b2e] text-[11px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full font-montserrat">
                SURFACE MOUNT & THRU-HOLE ASSEMBLY
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d3b2e] font-montserrat tracking-tight leading-tight">
                PCB Assembly Capabilities
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Our production lines support SMT, THT, and mixed-technology PCB assemblies with high placement accuracy and controlled soldering processes.
              </p>

              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-[#0d3b2e] tracking-wider uppercase font-montserrat">
                  Assembly Capabilities Include:
                </h4>

                <div className="space-y-2.5">
                  {[
                    'SMT & Thru-Hole PCB assembly',
                    'Single-sided and double-sided boards',
                    'Mixed-technology builds',
                    'Leaded and lead-free processes',
                    'Prototype to low/medium volume production',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-3 cursor-pointer py-1 transition-all duration-300 ease-out hover:translate-x-2"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-[#eaf1f1] text-[#0d3b2e] transition-all duration-300 ease-out group-hover:bg-[#0d3b2e] group-hover:text-[#ffc82e] group-hover:scale-110 group-hover:rotate-[8deg] group-hover:shadow-md">
                        <Check size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-gray-700 font-semibold text-sm sm:text-base transition-colors duration-300 group-hover:text-[#0d3b2e]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Step Process Bar */}
          <div className="bg-white rounded-full border border-gray-200 shadow-md p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center justify-center space-x-3 group">
              <div className="w-9 h-9 rounded-full border-2 border-gray-300 group-hover:border-[#006828] group-hover:bg-[#006828] group-hover:text-white font-bold text-gray-800 flex items-center justify-center text-sm shrink-0 transition-colors">
                1
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                PCB Preparation
              </span>
            </div>

            <div className="flex items-center justify-center space-x-3 sm:border-l sm:border-gray-200 group">
              <div className="w-9 h-9 rounded-full border-2 border-gray-300 group-hover:border-[#006828] group-hover:bg-[#006828] group-hover:text-white font-bold text-gray-800 flex items-center justify-center text-sm shrink-0 transition-colors">
                2
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                Component Placement
              </span>
            </div>

            <div className="flex items-center justify-center space-x-3 sm:border-l sm:border-gray-200 group">
              <div className="w-9 h-9 rounded-full border-2 border-gray-300 group-hover:border-[#006828] group-hover:bg-[#006828] group-hover:text-white font-bold text-gray-800 flex items-center justify-center text-sm shrink-0 transition-colors">
                3
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0d3b2e] uppercase font-montserrat">
                Reflow & Inspection
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Component Handling Capabilities Section */}
      <section className="bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content with Hover Check Icons */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d3b2e] font-montserrat tracking-tight leading-tight">
                Component Handling Capabilities
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Our SMT lines are equipped to handle a wide range of components with high repeatability and accuracy.
              </p>

              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-[#0d3b2e] tracking-wider uppercase font-montserrat">
                  Component Handling Range:
                </h4>

                <div className="space-y-2.5">
                  {[
                    '01005 package components',
                    'BGA, QFN, CSP and fine-pitch ICs',
                    'High-density PCB layouts',
                    'Odd-form and specialty components',
                    'Large ICs and multi-layer boards',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-3 cursor-pointer py-1 transition-all duration-300 ease-out hover:translate-x-2"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-[#eaf1f1] text-[#0d3b2e] transition-all duration-300 ease-out group-hover:bg-[#0d3b2e] group-hover:text-[#ffc82e] group-hover:scale-110 group-hover:rotate-[8deg] group-hover:shadow-md">
                        <Check size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-gray-700 font-semibold text-sm sm:text-base transition-colors duration-300 group-hover:text-[#0d3b2e]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image: Component Inspection */}
            <div className="lg:col-span-6">
              <div className="rounded-[8px] overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/37239.jpg"
                  alt="High Precision Component Inspection Touchscreen Interface"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Inspection & Quality Capabilities Section */}
      <section className="py-20 lg:py-24 bg-white bg-grid-lines border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image: QA Inspector Engineer */}
            <div className="lg:col-span-6">
              <div className="rounded-[8px] overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/2151615028.jpg"
                  alt="Quality Inspector Engineer at Alica Technologies"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Text with Hover Check Icons */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d3b2e] font-montserrat tracking-tight leading-tight">
                Inspection & Quality Capabilities
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Quality control is integrated into every stage of assembly using advanced inline inspection systems.
              </p>

              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-[#0d3b2e] tracking-wider uppercase font-montserrat">
                  Inspection Systems:
                </h4>

                <div className="space-y-2.5">
                  {[
                    '3D Solder Paste Inspection (SPI)',
                    'Automated Optical Inspection (AOI) – 3D / 4D',
                    '2.5D & 3D X-Ray Inspection',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-3 cursor-pointer py-1 transition-all duration-300 ease-out hover:translate-x-2"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-[#eaf1f1] text-[#0d3b2e] transition-all duration-300 ease-out group-hover:bg-[#0d3b2e] group-hover:text-[#ffc82e] group-hover:scale-110 group-hover:rotate-[8deg] group-hover:shadow-md">
                        <Check size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-gray-700 font-semibold text-sm sm:text-base transition-colors duration-300 group-hover:text-[#0d3b2e]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testing Capabilities Section */}
      <section className="bg-[#fafafa] py-20 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Text with Hover Check Icons */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d3b2e] font-montserrat tracking-tight leading-tight">
                Testing Capabilities
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Functional and electrical testing options to verify assembly performance before final dispatch.
              </p>

              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-[#0d3b2e] tracking-wider uppercase font-montserrat">
                  Testing Services:
                </h4>

                <div className="space-y-2.5">
                  {[
                    'Functional testing',
                    'Voltage and impedance testing',
                    'Custom testing setups (as required)',
                    'Final verification before dispatch',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-3 cursor-pointer py-1 transition-all duration-300 ease-out hover:translate-x-2"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-[#eaf1f1] text-[#0d3b2e] transition-all duration-300 ease-out group-hover:bg-[#0d3b2e] group-hover:text-[#ffc82e] group-hover:scale-110 group-hover:rotate-[8deg] group-hover:shadow-md">
                        <Check size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-gray-700 font-semibold text-sm sm:text-base transition-colors duration-300 group-hover:text-[#0d3b2e]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image: Electronics Testing Setup */}
            <div className="lg:col-span-6">
              <div className="rounded-[8px] overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/2151575719.jpg"
                  alt="Alica Electronics Testing Setup"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};