import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Phone } from 'lucide-react';

export const ServicesPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const faqs = [
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
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Top Green Hero Banner */}
      <section className="bg-[#355c31] text-white py-16 sm:py-20 text-center relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat tracking-tight leading-tight">
            SMT & THT PCB Assembly
          </h1>
          <ChevronDown size={22} className="opacity-80 animate-bounce" />
        </div>
      </section>

      {/* 2. Main Section: Left Sticky Sidebar + Right Scrolling Content */}
      <section className="py-16 lg:py-24 bg-white bg-grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid Container without items-start so col-span-4 spans full height of right content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 relative">
            
            {/* LEFT COLUMN WRAPPER: Full height matching right column */}
            <div className="lg:col-span-4 relative">
              {/* INNER STICKY CONTAINER: Sticks at top-28 (below 80px header) while scrolling */}
              <div className="lg:sticky lg:top-28 space-y-8 pb-8">
                
                {/* Service Quick Links */}
                <div className="bg-[#f8faf9] rounded-[10px] p-2 space-y-1 border border-gray-200/80 shadow-xs">
                  <a
                    href="#services"
                    className="flex items-center justify-between px-5 py-4 text-sm font-extrabold text-[#0d3b2e] hover:bg-white hover:shadow-xs rounded-[8px] transition-all"
                  >
                    <span>End-to-End Electronic Manufacturing</span>
                    <span className="text-gray-400">›</span>
                  </a>
                  <a
                    href="#services"
                    className="flex items-center justify-between px-5 py-4 text-sm font-extrabold text-[#0d3b2e] hover:bg-white hover:shadow-xs rounded-[8px] transition-all"
                  >
                    <span>Testing & Inspection</span>
                    <span className="text-gray-400">›</span>
                  </a>
                  <a
                    href="#services"
                    className="flex items-center justify-between px-5 py-4 text-sm font-extrabold text-[#0d3b2e] hover:bg-white hover:shadow-xs rounded-[8px] transition-all"
                  >
                    <span>Turnkey Project Delivery</span>
                    <span className="text-gray-400">›</span>
                  </a>
                </div>

                {/* Get a Free Quote Box */}
                <div className="bg-[#f8faf9] rounded-[10px] p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
                  <h3 className="text-xl font-extrabold text-[#0d3b2e] font-montserrat">
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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-gray-200 px-4 py-3 rounded-[6px] text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#184441] focus:outline-none"
                      />

                      <input
                        type="email"
                        placeholder="Your Email Address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-gray-200 px-4 py-3 rounded-[6px] text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#184441] focus:outline-none"
                      />

                      <textarea
                        placeholder="Your message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-gray-200 px-4 py-3 rounded-[6px] text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#184441] focus:outline-none resize-none"
                      ></textarea>

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
                      className="text-lg font-extrabold text-[#0d3b2e] hover:text-[#006828] transition-colors font-montserrat"
                    >
                      +91 97271 78787
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: SCROLLING CONTENT */}
            <div className="lg:col-span-8 space-y-12">
              {/* Featured Image with Overlay */}
              <div className="relative rounded-[10px] overflow-hidden shadow-2xl group">
                <img
                  src="/hero-robotic-arm.png"
                  alt="SMT and THT PCB Assembly Service"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
                  <span className="text-xs font-extrabold tracking-widest uppercase text-gray-300 mb-2">
                    SERVICES —
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-montserrat mb-3 leading-tight">
                    SMT & THT PCB Assembly
                  </h2>
                  <p className="text-gray-200 text-sm sm:text-base max-w-2xl leading-relaxed">
                    High-precision surface mount and thru-hole PCB assembly for reliable electronic products.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                <p>
                  Our SMT and Thru-Hole PCB assembly services are designed to meet high accuracy, repeatability, and quality requirements. Alica&apos;s production lines are equipped to handle complex layouts, fine-pitch components, and mixed-technology assemblies.
                </p>
              </div>

              {/* Plan Benefits Checklist */}
              <div className="pt-8 border-t border-b border-gray-200 py-10 space-y-8">
                <h3 className="text-3xl font-extrabold text-[#0d3b2e] font-montserrat">
                  Plan Benefits
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex items-center space-x-3">
                    <Check size={20} className="text-[#006828] shrink-0" strokeWidth={3} />
                    <span className="text-gray-800 font-semibold text-base">
                      Precision assembly with minimal defects
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Check size={20} className="text-[#006828] shrink-0" strokeWidth={3} />
                    <span className="text-gray-800 font-semibold text-base">
                      Component sizes from 01005 to large packages
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Check size={20} className="text-[#006828] shrink-0" strokeWidth={3} />
                    <span className="text-gray-800 font-semibold text-base">
                      Consistent output across production runs
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Check size={20} className="text-[#006828] shrink-0" strokeWidth={3} />
                    <span className="text-gray-800 font-semibold text-base">
                      BGA, QFN, fine-pitch IC handling
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Check size={20} className="text-[#006828] shrink-0" strokeWidth={3} />
                    <span className="text-gray-800 font-semibold text-base">
                      Support for prototypes and small batches
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Check size={20} className="text-[#006828] shrink-0" strokeWidth={3} />
                    <span className="text-gray-800 font-semibold text-base">
                      Double-sided PCB assembly
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Check size={20} className="text-[#006828] shrink-0" strokeWidth={3} />
                    <span className="text-gray-800 font-semibold text-base">
                      Advanced SMT line with inline inspection
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Check size={20} className="text-[#006828] shrink-0" strokeWidth={3} />
                    <span className="text-gray-800 font-semibold text-base">
                      Leaded and lead-free processes
                    </span>
                  </div>

                  <div className="sm:col-span-2 flex items-center space-x-3 pt-1">
                    <Check size={20} className="text-[#006828] shrink-0" strokeWidth={3} />
                    <span className="text-gray-800 font-semibold text-base">
                      High placement accuracy and repeatability
                    </span>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-6">
                <h3 className="text-3xl font-extrabold text-[#0d3b2e] font-montserrat">
                  Questions? You&apos;re covered.
                </h3>

                <div className="space-y-4">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        key={index}
                        className="rounded-[8px] overflow-hidden transition-all border border-gray-100"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : index)}
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
