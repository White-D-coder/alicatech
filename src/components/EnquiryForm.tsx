import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the terms of service.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '', agreed: false });
    }, 4000);
  };

  return (
    <div className="bg-white rounded-[5px] shadow-2xl pt-[30px] px-[50px] pb-[50px] border border-gray-200/80 w-full max-w-[499px] transition-all duration-300">
      {submitted ? (
        <div className="py-12 text-center space-y-6">
          <div className="w-16 h-16 bg-[#0d3b2e] text-[#ffc82e] rounded-[10px] flex items-center justify-center mx-auto shadow-lg">
            <Check size={36} strokeWidth={3} />
          </div>
          <h4 className="text-2xl font-bold text-[#0d3b2e] font-montserrat">Thank You!</h4>
          <p className="text-gray-600 text-sm">
            Your inquiry has been received. Our engineering team will contact you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Header */}
          <div className="mb-8">
            <span className="text-[#0d3b2e] text-sm sm:text-base font-bold tracking-wider block mb-4">
              send a message
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b2e] tracking-tight font-montserrat">
              Business Enquires
            </h3>
          </div>

          {/* Inputs */}
          <div>
            <input
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#f8f6f3] border-0 px-4 py-3.5 rounded-[0px] text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#006828] focus:outline-none transition-all"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#f8f6f3] border-0 px-4 py-3.5 rounded-[0px] text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#006828] focus:outline-none transition-all"
            />
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#f8f6f3] border-0 px-4 py-3.5 rounded-[0px] text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#006828] focus:outline-none transition-all"
            />
          </div>

          <div>
            <textarea
              placeholder="Message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#f8f6f3] border-0 px-4 py-3.5 rounded-[0px] text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#006828] focus:outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2 pt-1 pb-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreed}
              onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
              className="w-4 h-4 text-[#006828] border-gray-300 rounded focus:ring-[#006828] cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-gray-500 font-medium select-none cursor-pointer">
              I agree to the terms of service.
            </label>
          </div>

          {/* Submit CTA Button */}
          <button
            type="submit"
            className="w-full bg-[#ffc82e] hover:bg-[#f5b918] text-gray-950 font-bold py-3.5 rounded-[8px] text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 focus:outline-none font-montserrat"
          >
            talk to us
          </button>
        </form>
      )}
    </div>
  );
};
