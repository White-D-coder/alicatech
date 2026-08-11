import { AnimatedCounter } from './AnimatedCounter';

export const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#f8fafd] bg-grid-lines border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Text & Key Statistics */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="inline-block tracking-widest text-[#0d3b2e] text-s font-bold">
                What Our Clients Say
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d3b2e] tracking-tight leading-tight font-montserrat">
                Built on quality. Proven by performance.
              </h2>

              <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed">
                Our clients trust Alica Technologies for consistent quality, process transparency, and dependable electronic manufacturing services. From rapid prototyping to full-scale production, we focus on delivering assemblies that meet strict technical and performance requirements.
              </p>
            </div>

            {/* Bottom 3 Stats Grid with Animated Counters */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div>
                <span className="text-3xl sm:text-4xl font-bold text-[#0d3b2e] block tracking-tight font-montserrat">
                  <AnimatedCounter end={500} suffix="K+" />
                </span>
                <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mt-1">
                  PCBS ASSEMBLED
                </span>
              </div>

              <div>
                <span className="text-3xl sm:text-4xl font-bold text-[#0d3b2e] block tracking-tight font-montserrat">
                  <AnimatedCounter end={90} suffix="+" />
                </span>
                <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mt-1">
                  SUCCESSFUL PROJECTS
                </span>
              </div>

              <div>
                <span className="text-3xl sm:text-4xl font-bold text-[#0d3b2e] block tracking-tight font-montserrat">
                  <AnimatedCounter end={100} suffix="%" />
                </span>
                <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mt-1">
                  INSPECTION COVERAGE
                </span>
              </div>
            </div>
          </div>

          {/* Right Column Green Testimonial Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#355c31] text-white p-8 sm:p-12 shadow-2xl rounded-[10px] relative border border-emerald-800/40 space-y-6">
              <p className="text-lg sm:text-xl font-normal leading-relaxed text-emerald-50">
                &ldquo;Alica Technologies provided high-quality PCB assembly services and maintained strong quality control throughout our project. Their experienced team, careful inspection process, and attention to detail helped deliver reliable electronic products that met our requirements. We were confident in the quality of the final PCB assembly.&rdquo;
              </p>

              <div className="pt-4 border-t border-emerald-500/30 space-y-1">
                <h4 className="text-lg font-bold text-white tracking-wide font-montserrat">
                  Operations Manager
                </h4>
                <p className="text-xs text-emerald-200/80 tracking-wider uppercase">
                  Electronics Manufacturing Client
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
