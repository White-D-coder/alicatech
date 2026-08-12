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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the terms of service.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          formType: 'enquiry',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '', agreed: false });
      } else {
        setError(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[5px] shadow-2xl pt-[30px] px-[20px] pb-[50px] border border-gray-200/80 w-full max-w-[600px] transition-all duration-300">
      {submitted ? (
        <div className="py-12 space-y-6">
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
            <span className="text-[#0d3b2e] text-sm sm:text-base font-bold block mb-8">
              Send A Message
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0d3b2e] tracking-tight font-montserrat">
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

          {error && (
            <p className="text-red-600 text-xs font-semibold">{error}</p>
          )}

          {/* Submit CTA Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#ffc82e] hover:bg-[#f5b918] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed text-gray-950 font-bold py-3.5 rounded-[8px] text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 focus:outline-none font-montserrat cursor-pointer"
          >
            {submitting ? 'sending...' : 'talk to us'}
          </button>
        </form>
      )}
    </div>
  );
};
