import { Logo } from './Logo';
import { Mail, MapPin, Clock, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (page: string) => {
    navigate(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <footer className="relative bg-[#355c31] text-white pt-16 pb-8 overflow-hidden">
      {/* World Map Dotted Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='500' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF'%3E%3Ccircle cx='150' cy='120' r='2'/%3E%3Ccircle cx='170' cy='140' r='2'/%3E%3Ccircle cx='200' cy='110' r='2'/%3E%3Ccircle cx='230' cy='150' r='2'/%3E%3Ccircle cx='300' cy='130' r='2'/%3E%3Ccircle cx='350' cy='180' r='2'/%3E%3Ccircle cx='400' cy='160' r='2'/%3E%3Ccircle cx='450' cy='200' r='2'/%3E%3Ccircle cx='550' cy='140' r='2'/%3E%3Ccircle cx='600' cy='170' r='2'/%3E%3Ccircle cx='650' cy='130' r='2'/%3E%3Ccircle cx='700' cy='190' r='2'/%3E%3Ccircle cx='750' cy='150' r='2'/%3E%3Ccircle cx='800' cy='220' r='2'/%3E%3Ccircle cx='850' cy='180' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3-Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-14">
          {/* Column 1: Brand Info & Social Links */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <button onClick={() => handleLinkClick('home')} className="cursor-pointer">
                <Logo color="#ffffff" height={44} />
              </button>
            </div>

            <p className="text-emerald-100/80 text-sm leading-relaxed max-w-md font-normal">
              Have a project requirement, technical query, or manufacturing inquiry? Reach out to Alica Technologies LLP and our team will respond with the right technical support and guidance.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#linkedin"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-lg font-bold text-white tracking-wide">
              Contact
            </h3>

            <div className="space-y-5 text-sm">
              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-1.5 rounded text-[#f4cf68] mt-0.5">
                  <Mail size={20} strokeWidth={1.75} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-emerald-200/70 block">
                    Looking for collaboration?
                  </span>
                  <a
                    href="mailto:info@alicatechnologies.com"
                    className="font-semibold text-white hover:text-[#f4cf68] transition-colors"
                  >
                    info@alicatechnologies.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-1.5 rounded text-[#f4cf68] mt-0.5">
                  <MapPin size={20} strokeWidth={1.75} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-emerald-200/70 block">
                    Visit our Office
                  </span>
                  <address className="not-italic text-sm text-emerald-100/90 leading-relaxed font-normal">
                    Alica Technologies LLP, Meet House,<br />
                    Besides Zydus Research Centre,<br />
                    Changodar, Ahmedabad 382-213, India.
                  </address>
                </div>
              </div>

              {/* Timings & Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-1.5 rounded text-[#f4cf68] mt-0.5">
                  <Clock size={20} strokeWidth={1.75} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-emerald-200/70 block">
                    Monday-Friday: 08am-9pm
                  </span>
                  <a
                    href="tel:+919727178787"
                    className="font-bold text-white text-sm hover:text-[#f4cf68] transition-colors block"
                  >
                    +91 97271 78787
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Services Links */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-lg font-bold text-white tracking-wide">
              Services
            </h3>

            <ul className="space-y-3.5 text-sm text-emerald-100/80 font-normal">
              <li>
                <button
                  onClick={() => handleLinkClick('smt-tht-pcb-assembly')}
                  className="hover:text-[#f4cf68] transition-colors text-left cursor-pointer"
                >
                  SMT & THT PCB Assembly
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('testing-inspection')}
                  className="hover:text-[#f4cf68] transition-colors text-left cursor-pointer"
                >
                  Testing & Inspection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('turnkey-project-delivery')}
                  className="hover:text-[#f4cf68] transition-colors text-left cursor-pointer"
                >
                  Turnkey Project Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('end-to-end-electronic-manufacturing')}
                  className="hover:text-[#f4cf68] transition-colors text-left cursor-pointer"
                >
                  End-to-End Electronic Manufacturing
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="border-t border-emerald-600/40" />

        {/* Bottom Bar: Copyright & Bottom Nav Links */}
        <div className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
          <div>
            <p>Copyright ©2026 Alica.</p>
          </div>

          <div className="flex items-center space-x-6 sm:space-x-8">
            <button onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors cursor-pointer">
              Company
            </button>
            <button onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors cursor-pointer">
              Careers
            </button>
            <button onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors cursor-pointer">
              Press media
            </button>
            <button onClick={() => handleLinkClick('blogs')} className="hover:text-white transition-colors cursor-pointer">
              Our Blog
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 bg-white text-gray-900 w-11 h-11 rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
        aria-label="Scroll to top"
      >
        <ChevronUp size={22} strokeWidth={2.5} />
      </button>
    </footer>
  );
};
