import { useState, useEffect, useLayoutEffect } from 'react';
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

// Helper to force scroll to top instantly without smooth scroll interference
const scrollToTopInstant = () => {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  const originalScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Restore scrollBehavior after current frame
  requestAnimationFrame(() => {
    html.style.scrollBehavior = originalScrollBehavior;
  });
};

// Ensure history.scrollRestoration is manual
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function App() {
  // Get initial page from hash on refresh
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      return hash || 'home';
    }
    return 'home';
  });

  const [pageOpacity, setPageOpacity] = useState(true);

  // Force scroll to top whenever currentPage changes or component updates
  useLayoutEffect(() => {
    scrollToTopInstant();
    const rafId = requestAnimationFrame(() => {
      scrollToTopInstant();
    });
    const timer = setTimeout(() => {
      scrollToTopInstant();
    }, 40);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [currentPage]);

  // Initial mount scroll reset
  useEffect(() => {
    scrollToTopInstant();
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = (page: string) => {
    // Save current page in URL hash
    window.history.pushState({}, '', `#${page}`);

    setPageOpacity(false);

    // Instant top scroll right away
    scrollToTopInstant();

    setTimeout(() => {
      setCurrentPage(page);
      scrollToTopInstant();

      setTimeout(() => {
        setPageOpacity(true);
        scrollToTopInstant();
      }, 30);
    }, 100);
  };

  // Handle browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      setPageOpacity(false);
      scrollToTopInstant();

      setTimeout(() => {
        setCurrentPage(hash || 'home');
        scrollToTopInstant();

        setTimeout(() => {
          setPageOpacity(true);
          scrollToTopInstant();
        }, 30);
      }, 100);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
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

      case 'blogs':
        return (
          <div className="pt-16 sm:pt-20">
            <Blogs />
          </div>
        );

      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
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
    <div className="min-h-screen flex flex-col bg-white text-[#1e293b] font-sans">
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