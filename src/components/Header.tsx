import { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const serviceDropdownItems = [
    { name: 'SMT & THT PCB Assembly', page: 'service-smt' },
    { name: 'Testing & Inspection', page: 'service-testing' },
    { name: 'Turnkey Project Delivery', page: 'service-turnkey' },
    { name: 'End-to-End Electronic Manufacturing', page: 'service-end-to-end' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md shadow-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 focus:outline-none py-1 group cursor-pointer"
        >
          <Logo height={24} className="sm:hidden" />
          <Logo height={34} className="hidden sm:inline-block" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Home Link */}
          <button
            onClick={() => handleNavClick('home')}
            className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 cursor-pointer ${
              currentPage === 'home' ? 'text-[#006828] font-bold' : 'text-gray-800 hover:text-[#006828]'
            }`}
          >
            Home
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-[#006828] transition-all duration-300 ${
                currentPage === 'home' ? 'w-full' : 'w-0 hover:w-full'
              }`}
            />
          </button>
          {/* blogs */}
          <button
            onClick={() => handleNavClick('blogs')}
            className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 cursor-pointer ${
              currentPage === 'blogs' ? 'text-[#006828] font-bold' : 'text-gray-800 hover:text-[#006828]'
            }`}
          >
            Blogs
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-[#006828] transition-all duration-300 ${
                currentPage === 'blogs' ? 'w-full' : 'w-0 hover:w-full'
              }`}
            />
          </button>


          {/* About Us Link */}
          <button
            onClick={() => handleNavClick('about')}
            className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 cursor-pointer ${
              currentPage === 'about' ? 'text-[#006828] font-bold' : 'text-gray-800 hover:text-[#006828]'
            }`}
          >
            About Us
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-[#006828] transition-all duration-300 ${
                currentPage === 'about' ? 'w-full' : 'w-0 hover:w-full'
              }`}
            />
          </button>

          {/* Services Link with Clickable Smooth Dropdown Menu */}
          <div
            className="relative group py-2"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => handleNavClick('service-smt')}
              className={`relative py-2 text-[15px] font-bold transition-colors duration-200 inline-flex items-center gap-1 cursor-pointer ${
                currentPage.startsWith('service') ? 'text-[#006828]' : 'text-gray-900 hover:text-[#006828]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-gray-600 ${
                  servicesDropdownOpen ? 'rotate-180 text-[#006828]' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#006828] transition-all duration-300 ${
                  currentPage.startsWith('service') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            {/* Clickable Services Dropdown Box */}
            <div
              className={`absolute top-full left-0 pt-1 w-80 transition-all duration-200 z-50 ${
                servicesDropdownOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                  : 'opacity-0 -translate-y-1 pointer-events-none invisible'
              }`}
            >
              <div className="bg-white rounded-none shadow-xl border border-gray-100 border-t-2 border-t-[#006828] py-2">
                <div className="flex flex-col py-1">
                  {serviceDropdownItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(item.page);
                      }}
                      className="w-full text-left px-6 py-3.5 text-[15px] font-medium text-gray-700 hover:text-[#006828] hover:bg-gray-50/90 transition-all duration-200 leading-snug cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities Link */}
          <button
            onClick={() => handleNavClick('capabilities')}
            className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 cursor-pointer ${
              currentPage === 'capabilities' ? 'text-[#006828] font-bold' : 'text-gray-800 hover:text-[#006828]'
            }`}
          >
            Capabilities
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-[#006828] transition-all duration-300 ${
                currentPage === 'capabilities' ? 'w-full' : 'w-0 hover:w-full'
              }`}
            />
          </button>

          {/* Industries Link */}
          <button
            onClick={() => handleNavClick('industries')}
            className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 cursor-pointer ${
              currentPage === 'industries' ? 'text-[#006828] font-bold' : 'text-gray-800 hover:text-[#006828]'
            }`}
          >
            Industries
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-[#006828] transition-all duration-300 ${
                currentPage === 'industries' ? 'w-full' : 'w-0 hover:w-full'
              }`}
            />
          </button>

          {/* Contact Us Link */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 cursor-pointer ${
              currentPage === 'contact' ? 'text-[#006828] font-bold' : 'text-gray-800 hover:text-[#006828]'
            }`}
          >
            Contact Us
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-[#006828] transition-all duration-300 ${
                currentPage === 'contact' ? 'w-full' : 'w-0 hover:w-full'
              }`}
            />
          </button>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-800 hover:text-[#006828] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left px-3 py-2 text-base font-bold text-gray-800 hover:text-[#006828] hover:bg-gray-50"
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left px-3 py-2 text-base font-bold text-gray-800 hover:text-[#006828] hover:bg-gray-50"
          >
            About Us
          </button>

          <div className="space-y-1 pl-3 border-l-2 border-[#006828] my-2">
            <span className="text-xs font-bold text-[#006828] uppercase tracking-wider block px-3 py-1">
              Services
            </span>
            {serviceDropdownItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#006828]"
              >
                • {item.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('capabilities')}
            className="block w-full text-left px-3 py-2 text-base font-bold text-gray-800 hover:text-[#006828] hover:bg-gray-50"
          >
            Capabilities
          </button>

          <button
            onClick={() => handleNavClick('industries')}
            className="block w-full text-left px-3 py-2 text-base font-bold text-gray-800 hover:text-[#006828] hover:bg-gray-50"
          >
            Industries
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left px-3 py-2 text-base font-bold text-gray-800 hover:text-[#006828] hover:bg-gray-50"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};
