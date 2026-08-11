import { EnquiryForm } from './EnquiryForm';

export const AboutUs = () => {
  return (
    <section id="about-us" className="relative bg-[#ffffff] pb-10 lg:pb-25 bg-grid-lines overflow-visible">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 pt-16 lg:pt-20">
            <span className="text-[#0d3b2e] font-bold text-sm tracking-wider block">
              About Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d3b2e] tracking-tight leading-tight font-montserrat">
              Precision Electronic Manufacturing.
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed pt-2 font-normal">
              Alica Technologies LLP is a trusted Electronic Manufacturing Services (EMS) company specializing in PCB assembly (PCBA), rapid prototyping, box build assembly, and turnkey electronics manufacturing. We provide end-to-end manufacturing solutions for OEMs and businesses, from prototype development to full-scale production. With advanced manufacturing equipment, strict quality control, and experienced engineering support, we deliver reliable, high-quality electronic products that meet industry standards and customer requirements.
            </p>
          </div>

          {/* Right Column: Enquiry Form Box (Positioned in About Us, pulled up by -48px so ONLY 'send a message' overlays the Hero banner above) */}
          <div className="lg:col-span-5 relative -mt-10 lg:-mt-18 z-30 flex justify-center lg:justify-end">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
