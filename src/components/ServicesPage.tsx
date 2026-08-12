import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Phone } from 'lucide-react';

export interface ServicesPageProps {
  serviceType?: 'service-smt' | 'service-testing' | 'service-turnkey' | 'service-end-to-end';
  onNavigateService?: (serviceKey: string) => void;
}

export const ServicesPage = ({
  serviceType = 'service-smt',
  onNavigateService,
}: ServicesPageProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  // Data config for all 4 Service Pages matching exact uploaded screenshots
  const servicesConfig = {
    'service-smt': {
      title: 'SMT & THT PCB Assembly',
      heroSubtitle: 'High-precision surface mount and thru-hole PCB assembly for reliable electronic products.',
      image: '/2151575719.jpg',
      quickNav: [
        { label: 'End-to-End Electronic Manufacturing', key: 'service-end-to-end' },
        { label: 'Testing & Inspection', key: 'service-testing' },
        { label: 'Turnkey Project Delivery', key: 'service-turnkey' },
      ],
      p1: 'Our SMT and Thru-Hole PCB assembly services are designed to meet high accuracy, repeatability, and quality requirements. Alica\'s production lines are equipped to handle complex layouts, fine-pitch components, and mixed-technology assemblies.',
      p2: 'Automated stencil printing, high-speed pick-and-place machines, and controlled reflow processes ensure consistent assembly quality across all builds.',
      benefitsTitle: 'Plan Benefits',
      benefits: [
        'Precision assembly with minimal defects',
        'Component sizes from 01005 to large packages',
        'Consistent output across production runs',
        'BGA, QFN, fine-pitch IC handling',
        'Support for prototypes and small batches',
        'Double-sided PCB assembly',
        'Advanced SMT line with inline inspection',
        'Leaded and lead-free processes',
        'High placement accuracy and repeatability',
      ],
      faqs: [
        {
          q: 'What types of PCB assemblies do you support?',
          a: 'We support SMT, Thru-Hole, and mixed-technology PCB assemblies for a wide range of electronic applications.',
        },
        {
          q: 'What component sizes can you handle?',
          a: 'Our SMT lines can handle components down to 01005 package size up to large ICs, BGAs, QFNs, and custom odd-form components.',
        },
        {
          q: 'Do you handle double-sided PCB assemblies?',
          a: 'Yes, we provide single-sided and double-sided SMT and THT PCB assemblies with high placement accuracy and inline inspection.',
        },
        {
          q: 'Do you support lead-free manufacturing?',
          a: 'Yes, we strictly comply with RoHS and IPC standards, supporting both leaded and lead-free soldering processes.',
        },
      ],
    },

    'service-testing': {
      title: 'Testing & Inspection',
      heroSubtitle: 'Advanced inspection and testing to ensure quality, reliability, and compliance.',
      image: '/2151615028.jpg',
      quickNav: [
        { label: 'End-to-End Electronic Manufacturing', key: 'service-end-to-end' },
        { label: 'SMT & THT PCB Assembly', key: 'service-smt' },
        { label: 'Turnkey Project Delivery', key: 'service-turnkey' },
      ],
      p1: 'Quality control is integrated into every stage of our manufacturing process. Our testing and inspection services are designed to identify defects early, reduce rework, and ensure compliance with defined specifications.',
      p2: 'We use industry-leading inspection systems to verify solder quality, component placement, and functional performance.',
      benefitsTitle: 'Service Benefits',
      benefits: [
        'Early defect detection',
        'Solder Paste Inspection (SPI) – 3D volume measurement',
        'Reduced rework and production risk',
        'Automated Optical Inspection (AOI) – 3D / 4D inline',
        'Improved product reliability',
        '2.5D & 3D X-Ray Inspection – BGA and fine-pitch analysis',
        'Inspection coverage across critical stages',
        'Functional Testing (as per project requirement)',
        'Impedance & Voltage Testing',
      ],
      faqs: [
        {
          q: 'What inspection methods are used during manufacturing?',
          a: 'We use SPI, AOI (3D/4D), 2.5D and 3D X-Ray inspection, along with functional testing based on project needs.',
        },
        {
          q: 'Why is X-ray inspection important for PCB assemblies?',
          a: 'X-Ray inspection allows non-destructive verification of hidden solder joints, such as BGAs, QFNs, and multi-layer boards.',
        },
        {
          q: 'Do you offer functional testing?',
          a: 'Yes, we develop custom functional testing setups to verify electrical logic and operational parameters before dispatch.',
        },
      ],
    },

    'service-turnkey': {
      title: 'Turnkey Project Delivery',
      heroSubtitle: 'Complete electronic manufacturing solutions managed under one partner.',
      image: '/procurement-manager-reviewing-manufacturing-contract-factory.jpg',
      quickNav: [
        { label: 'End-to-End Electronic Manufacturing', key: 'service-end-to-end' },
        { label: 'SMT & THT PCB Assembly', key: 'service-smt' },
        { label: 'Testing & Inspection', key: 'service-testing' },
      ],
      p1: 'Our turnkey project delivery services simplify electronic manufacturing by managing the complete process from component procurement to final delivery. This approach reduces coordination effort, shortens lead times, and ensures consistent quality.',
      p2: 'Turnkey manufacturing is ideal for clients looking for a single, accountable EMS partner.',
      benefitsTitle: 'Service Benefits',
      benefits: [
        'Single-point responsibility',
        'Component sourcing and procurement',
        'Improved cost and schedule control',
        'PCB assembly and inspection',
        'Reduced supply chain complexity',
        'Functional testing',
        'Reliable execution and delivery',
        'Box build and final assembly',
        'Packaging and delivery coordination',
      ],
      faqs: [
        {
          q: 'What is included in turnkey project delivery?',
          a: 'Turnkey project delivery includes component sourcing, PCB assembly, inspection, testing, box build, and final delivery.',
        },
        {
          q: 'Do you manage component procurement?',
          a: 'Yes, our procurement team sources components from certified global distributors with complete BOM traceability.',
        },
        {
          q: 'Is turnkey manufacturing suitable for low-volume projects?',
          a: 'Yes, we support turnkey projects from prototype and low-volume builds up to full volume production.',
        },
        {
          q: 'How does turnkey manufacturing reduce project complexity?',
          a: 'By managing procurement, assembly, testing, and box build under one roof, we eliminate multi-vendor coordination risks.',
        },
      ],
    },

    'service-end-to-end': {
      title: 'End-to-End Electronic Manufacturing',
      heroSubtitle: 'Complete electronic manufacturing services supporting your product from prototype to production.',
      image: '/PCB-assembly-partner-in-Ahmedabad.jpg',
      quickNav: [
        { label: 'SMT & THT PCB Assembly', key: 'service-smt' },
        { label: 'Testing & Inspection', key: 'service-testing' },
        { label: 'Turnkey Project Delivery', key: 'service-turnkey' },
      ],
      p1: 'Alica Technologies LLP provides comprehensive electronic manufacturing services covering every stage of the product lifecycle. Our end-to-end approach ensures controlled processes, consistent quality, and dependable delivery for electronic assemblies.',
      p2: 'We combine advanced manufacturing equipment, trained technical teams, and IPC-recommended operating procedures to support reliable and repeatable production outcomes.',
      benefitsTitle: 'Plan Benefits',
      benefits: [
        'Prototype to low and medium volume production',
        'Single manufacturing partner for complete execution',
        'SMT & Thru-Hole PCB assembly',
        'Reduced coordination and production risk',
        'Advanced inspection and testing',
        'Consistent quality and traceability',
        'Controlled manufacturing environment',
        'Faster turnaround and controlled timelines',
        'End-to-end project coordination',
      ],
      faqs: [
        {
          q: 'What does end-to-end electronic manufacturing include?',
          a: 'End-to-end electronic manufacturing covers PCB assembly, inspection, testing, and final delivery under a single controlled manufacturing process.',
        },
        {
          q: 'Do you support both prototyping and production?',
          a: 'Yes, we provide seamless scaling from initial NPI prototype validation into full-scale production runs.',
        },
        {
          q: 'How do you ensure quality across the manufacturing process?',
          a: 'Through inline SPI, AOI, X-Ray, and strict IPC-A-610 standards enforced at every manufacturing milestone.',
        },
      ],
    },
  };

  const currentConfig = servicesConfig[serviceType] || servicesConfig['service-smt'];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Top Green Hero Banner (Always Primary Green #355c31) */}
      <section className="bg-[#355c31] text-white pt-20 sm:pt-28 pb-16 text-center relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold font-montserrat tracking-tight leading-tight max-w-4xl mx-auto">
            {currentConfig.title}
          </h1>
          <button
            onClick={() => {
              const section = document.getElementById('services-content');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Scroll down to content"
            className="focus:outline-none cursor-pointer group p-2 inline-block"
          >
            <ChevronDown size={22} className="opacity-80 animate-bounce text-white group-hover:scale-125 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2. Main Section: Main Content first on mobile view, Left Sidebar after FAQ section on mobile view */}
      <section id="services-content" className="py-12 sm:py-16 lg:py-24 bg-white bg-grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">

      {/* LEFT COLUMN — STICKY */}
      <div className="lg:col-span-4 lg:self-start">
        <div className="lg:sticky lg:top-28 space-y-8">

          {/* Quick Navigation */}
          <div className="bg-[#f8faf9] rounded-[10px] p-2 space-y-1 border border-gray-200/80 shadow-xs">
            {currentConfig.quickNav.map((item) => (
              <button
                key={item.key}
                onClick={() =>
                  onNavigateService && onNavigateService(item.key)
                }
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-[#0d3b2e] hover:bg-white hover:shadow-xs rounded-[8px] transition-all text-left cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="text-gray-400 font-bold">›</span>
              </button>
            ))}
          </div>

          {/* Get a Free Quote */}
          <div className="bg-[#f8faf9] rounded-[10px] p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#0d3b2e] font-montserrat">
              Get a Free Quote
            </h3>

            {submitted ? (
              <div className="py-6 text-center text-[#0d3b2e] font-bold text-sm">
                Thank you! We will get in touch shortly.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-gray-200 px-4 py-3 rounded-[6px] text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#184441] focus:outline-none"
                />

                <input
                  type="email"
                  placeholder="Your Email Address"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-gray-200 px-4 py-3 rounded-[6px] text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#184441] focus:outline-none"
                />

                <textarea
                  placeholder="Your message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-gray-200 px-4 py-3 rounded-[6px] text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#184441] focus:outline-none resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-[#184441] hover:bg-[#0f2e2c] text-white font-bold py-3.5 rounded-[6px] text-sm tracking-wider uppercase transition-all cursor-pointer shadow-sm"
                >
                  get in touch
                </button>
              </form>
            )}
          </div>

          {/* Phone Call Box */}
          <div className="bg-white rounded-[10px] p-6 border border-gray-200/80 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#e8f7f0] text-[#006828] flex items-center justify-center shrink-0">
              <Phone size={22} />
            </div>

            <div>
              <span className="text-xs text-gray-500 font-medium block">
                Get in touch
              </span>

              <a
                href="tel:+919727178787"
                className="text-m font-bold text-[#0d3b2e] hover:text-[#006828] transition-colors font-montserrat"
              >
                +91 9727178787
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN — NORMAL SCROLL */}
      <div className="lg:col-span-8 space-y-12">

        {/* Featured Banner Image */}
        <div className="relative rounded-[10px] overflow-hidden shadow-2xl group">
          <img
            src={currentConfig.image}
            alt={currentConfig.title}
            className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">

            <h2 className="text-3xl sm:text-4xl font-bold font-montserrat mb-3 leading-tight">
              {currentConfig.title}
            </h2>

            <p className="text-gray-200 text-sm sm:text-base max-w-2xl leading-relaxed">
              {currentConfig.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 text-gray-700 text-base leading-relaxed">
          <p>{currentConfig.p1}</p>
          <p>{currentConfig.p2}</p>
        </div>

        {/* Benefits Checklist */}
        <div className="pt-8 border-t border-b border-gray-200 py-10 space-y-8">
          <h3 className="text-3xl font-bold text-[#0d3b2e] font-montserrat">
            {currentConfig.benefitsTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {currentConfig.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3"
              >
                <Check
                  size={20}
                  className="text-[#006828] shrink-0"
                  strokeWidth={3}
                />

                <span className="text-gray-800 font-semibold text-sm sm:text-base">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-[#0d3b2e] font-montserrat">
            Questions? You&apos;re covered.
          </h3>

          <div className="space-y-4">
            {currentConfig.faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className="rounded-[8px] overflow-hidden transition-all border border-gray-100"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className={`w-full flex items-center justify-between p-5 text-left font-bold text-base transition-colors ${
                      isOpen
                        ? 'bg-[#184441] text-white'
                        : 'bg-[#f8faf9] text-[#0d3b2e] hover:bg-gray-100'
                    }`}
                  >
                    <span className="pr-4">{faq.q}</span>

                    {isOpen ? (
                      <ChevronUp size={20} className="shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-5 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
    </div>
  );
};
