import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { WhatWeDo } from './components/WhatWeDo';
import { WhyChooseAlica } from './components/WhyChooseAlica';
import { LocationBanner } from './components/LocationBanner';
import { Blogs } from './components/Blogs';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { CapabilitiesPage } from './components/CapabilitiesPage';
import { IndustriesPage } from './components/IndustriesPage';
import { ContactPage } from './components/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageOpacity, setPageOpacity] = useState<boolean>(true);

  const handleNavigate = (page: string) => {
    setPageOpacity(false);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setPageOpacity(true);
      }, 30);
    }, 150);
  };

  useEffect(() => {
    setPageOpacity(true);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'services':
      case 'service-smt':
        return (
          <ServicesPage
            serviceType="service-smt"
            onNavigateService={(key) => handleNavigate(key)}
          />
        );
      case 'service-testing':
        return (
          <ServicesPage
            serviceType="service-testing"
            onNavigateService={(key) => handleNavigate(key)}
          />
        );
      case 'service-turnkey':
        return (
          <ServicesPage
            serviceType="service-turnkey"
            onNavigateService={(key) => handleNavigate(key)}
          />
        );
      case 'service-end-to-end':
        return (
          <ServicesPage
            serviceType="service-end-to-end"
            onNavigateService={(key) => handleNavigate(key)}
          />
        );
      case 'capabilities':
        return <CapabilitiesPage />;
      case 'industries':
        return <IndustriesPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <AboutUs />
            <WhatWeDo onNavigate={handleNavigate} />
            <WhyChooseAlica />
            <LocationBanner />
            <Blogs />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#ffc82e] selection:text-black">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main
        className={`transition-all duration-300 ease-in-out ${
          pageOpacity ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
