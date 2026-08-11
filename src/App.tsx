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
  // Get the current page from the URL after refresh
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  const [pageOpacity, setPageOpacity] = useState(true);

  // ALWAYS scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setPageOpacity(false);

    // Save the current page in the URL
    window.history.pushState({}, '', `#${page}`);

    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      setTimeout(() => {
        setPageOpacity(true);
      }, 30);
    }, 120);
  };

  // Handle browser Back / Forward
  useEffect(() => {
    setPageOpacity(true);

    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');

      setPageOpacity(false);

      setTimeout(() => {
        setCurrentPage(hash || 'home');
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        setTimeout(() => {
          setPageOpacity(true);
        }, 30);
      }, 120);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
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
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          pageOpacity
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2'
        }`}
      >
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;