import { Check } from 'lucide-react';

export const CapabilitiesPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section with Big Yellow Overlapping Title "Manufacturing Capabilities" */}
      <section className="bg-white pt-12 sm:pt-16 pb-16 lg:pb-24 text-center relative overflow-hidden bg-grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Huge Yellow 2-Line Overlapping Title */}
          <div className="relative z-20 space-y-0">
            <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-bold text-[#ffc82e] font-montserrat tracking-tight leading-[0.95] text-center drop-shadow-xs">
              <span className="block">Manufacturing</span>
              <span className="block mt-1">Capabilities</span>
            </h1>
          </div>

          {/* Centered Image overlapping with top text */}
          <div className="relative z-10 -mt-8 sm:-mt-12 lg:-mt-16 rounded-[4px] overflow-hidden shadow-2xl max-w-5xl mx-auto border border-gray-100">
            <img
              src="/37264.jpg"
              alt="Alica Technologies Manufacturing Robotic Line"
              className="w-full h-auto object-cover max-h-[580px]"
            />
          </div>
        </div>
      </section>

      {/* 2. Reliable Execution & PCB Assembly Capabilities Section */}
      <section className="py-20 lg:py-24 bg-white bg-grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Reliable Execution Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-[#0d3b2e] tracking-wider uppercase block">
                Reliable Execution
              </span>
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

            {/* Right Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block bg-[#e8eff1] text-[#0d3b2e] text-[11px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full">
                SURFACE MOUNT & THRU-HOLE ASSEMBLY
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d3b2e] font-montserrat tracking-tight leading-tight">
                PCB Assembly{' '}
                <span className="bg-[#e2ebf8] px-2 py-0.5 rounded-xs">
                  Capabilities
                </span>
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Our production lines support SMT, THT, and mixed-technology PCB assemblies with high placement accuracy and controlled soldering processes.
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-[#0d3b2e] tracking-wider uppercase">
                  Assembly Capabilities Include:
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm font-medium leading-relaxed">
                  <li>– SMT & Thru-Hole PCB assembly</li>
                  <li>– Single-sided and double-sided boards</li>
                  <li>– Mixed-technology builds</li>
                  <li>– Leaded and lead-free processes</li>
                  <li>– Prototype to low/medium volume production</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3 Step Process Bar */}
          <div className="bg-white rounded-full border border-gray-200 shadow-md p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#3b6932] font-bold text-white flex items-center justify-center text-xs shrink-0">
                1
              </div>
              <span className="text-xs font-bold tracking-wider text-[#0d3b2e] uppercase flex items-center gap-2">
                <span>PCB Preparation</span>
                <span className="text-gray-400">›</span>
              </span>
            </div>

            <div className="flex items-center justify-center space-x-3 sm:border-l sm:border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#3b6932] font-bold text-white flex items-center justify-center text-xs shrink-0">
                2
              </div>
              <span className="text-xs font-bold tracking-wider text-[#0d3b2e] uppercase flex items-center gap-2">
                <span>Component Placement</span>
                <span className="text-gray-400">›</span>
              </span>
            </div>

            <div className="flex items-center justify-center space-x-3 sm:border-l sm:border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#3b6932] font-bold text-white flex items-center justify-center text-xs shrink-0">
                3
              </div>
              <span className="text-xs font-bold tracking-wider text-[#0d3b2e] uppercase">
                Reflow & Inspection
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Component Handling Capabilities Section */}
      <section className="bg-[#fafafa] py-20 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d3b2e] font-montserrat tracking-tight leading-tight">
                Component Handling Capabilities
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Our SMT lines are equipped to handle a wide range of components with high repeatability and accuracy.
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-[#0d3b2e] tracking-wider uppercase">
                  Component Handling Range:
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm font-medium leading-relaxed">
                  <li>– 01005 package components</li>
                  <li>– BGA, QFN, CSP and fine-pitch ICs</li>
                  <li>– High-density PCB layouts</li>
                  <li>– Odd-form and specialty components</li>
                  <li>– Large ICs and multi-layer boards</li>
                </ul>
              </div>
            </div>

            {/* Right Image: Touchscreen Interface */}
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

            {/* Right Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#0d3b2e] tracking-wider uppercase block">
                ADVANCED INSPECTION SYSTEMS
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d3b2e] font-montserrat tracking-tight leading-tight">
                Inspection & Quality Capabilities
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Inspection is integrated at critical stages of our manufacturing workflow to ensure early defect detection and consistent quality output.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#3b6932] text-white flex items-center justify-center shrink-0">
                    <Check size={15} strokeWidth={3} />
                  </div>
                  <span className="text-gray-800 font-medium text-base">
                    3D Solder Paste Inspection (SPI)
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#3b6932] text-white flex items-center justify-center shrink-0">
                    <Check size={15} strokeWidth={3} />
                  </div>
                  <span className="text-gray-800 font-medium text-base">
                    Automated Optical Inspection (AOI) – 3D / 4D
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#3b6932] text-white flex items-center justify-center shrink-0">
                    <Check size={15} strokeWidth={3} />
                  </div>
                  <span className="text-gray-800 font-medium text-base">
                    2.5D & 3D X-Ray Inspection
                  </span>
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
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d3b2e] font-montserrat tracking-tight leading-tight">
                Testing Capabilities
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                We provide testing services tailored to project-specific requirements to ensure assembled boards meet defined electrical and functional standards.
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-[#0d3b2e] tracking-wider uppercase">
                  Testing Capabilities:
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm font-medium leading-relaxed">
                  <li>– Functional testing</li>
                  <li>– Voltage and impedance testing</li>
                  <li>– Custom testing setups (as required)</li>
                  <li>– Final verification before dispatch</li>
                </ul>
              </div>
            </div>

            {/* Right Image: Touchscreen Display */}
            <div className="lg:col-span-6">
              <div className="rounded-[8px] overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/37239.jpg"
                  alt="Testing Capabilities Inspection Display"
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