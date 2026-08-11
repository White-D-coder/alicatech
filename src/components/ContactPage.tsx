import React, { useState } from 'react';
import { ChevronDown, MapPin, Mail, Phone, Check } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Top Green Hero Banner */}
      <section className="bg-[#355c31] text-white py-16 sm:py-20 text-center relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-3">
          <h1 className="text-4xl sm:text-6xl font-extrabold font-montserrat tracking-tight text-white">
            Contact Us
          </h1>
          <ChevronDown size={22} className="opacity-80 animate-bounce text-white" />
        </div>
      </section>

      {/* 2. Main 2-Column Section */}
      <section className="py-20 lg:py-28 bg-white bg-grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left Card: Get in Touch Box */}
            <div className="lg:col-span-6 bg-white rounded-[10px] border border-gray-200/90 p-8 sm:p-12 shadow-xs space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d3b2e] font-montserrat tracking-tight">
                  Get in touch
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We are here to answer any question you may have. Feel free to reach via contact form.
                </p>
              </div>

              <div className="space-y-6 pt-2 text-gray-700 text-sm sm:text-base">
                <div className="flex items-start space-x-4">
                  <MapPin size={22} className="text-[#0d3b2e] shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    Meet House, <br />
                    Besides Zydus Research Centre, <br />
                    Changodar, Ahmedabad 382-213
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail size={22} className="text-[#0d3b2e] shrink-0" />
                  <a
                    href="mailto:info@alicatechnologies.com"
                    className="hover:text-[#006828] font-medium transition-colors"
                  >
                    Email: info@alicatechnologies.com
                  </a>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone size={22} className="text-[#0d3b2e] shrink-0" />
                  <a
                    href="tel:+919727178787"
                    className="hover:text-[#006828] font-medium transition-colors"
                  >
                    Phone: +91 97271 78787
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form Box */}
            <div className="lg:col-span-6">
              {submitted ? (
                <div className="bg-[#f8faf9] rounded-[10px] p-12 text-center space-y-4 border border-gray-200">
                  <div className="w-16 h-16 bg-[#0d3b2e] text-[#ffc82e] rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Check size={36} strokeWidth={3} />
                  </div>
                  <h4 className="text-2xl font-bold text-[#0d3b2e] font-montserrat">Message Sent!</h4>
                  <p className="text-gray-600 text-sm">
                    Thank you for reaching out. Our engineering team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#f8f6f3] border-0 px-5 py-4 rounded-[6px] text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#006828] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#f8f6f3] border-0 px-5 py-4 rounded-[6px] text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#006828] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Your message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#f8f6f3] border-0 px-5 py-4 rounded-[6px] text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#006828] focus:outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ffc82e] hover:bg-[#f5b918] text-gray-950 font-extrabold py-4 rounded-[6px] text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 focus:outline-none font-montserrat uppercase tracking-wider cursor-pointer"
                  >
                    get in touch
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
