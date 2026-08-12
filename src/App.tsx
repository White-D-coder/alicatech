import { useState, useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { WhatWeDo } from './components/WhatWeDo';
import { WhyChooseAlica } from './components/WhyChooseAlica';
import { LocationBanner } from './components/LocationBanner';
import { Blogs } from './components/Blogs';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { CapabilitiesPage } from './pages/CapabilitiesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ContactPage } from './pages/ContactPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogPostPage } from './pages/BlogPostPage';


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
  const location = useLocation();
  const [pageOpacity, setPageOpacity] = useState(true);

  // Force scroll to top and page opacity transition whenever location pathname changes
  useLayoutEffect(() => {
    setPageOpacity(false);
    scrollToTopInstant();

    // Set page title for home route (other pages handle their own titles)
    if (location.pathname === '/') {
      document.title = "Alica Technologies LLP | Electronic Manufacturing Services (EMS)";
    }

    const rafId = requestAnimationFrame(() => {
      scrollToTopInstant();
    });
    const timer = setTimeout(() => {
      scrollToTopInstant();
      setPageOpacity(true);
    }, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  // Initial mount scroll reset
  useEffect(() => {
    scrollToTopInstant();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1e293b] font-sans">
      <Header />

      <main
        className={`flex-1 pt-16 sm:pt-20 transition-opacity duration-300 ease-in-out ${
          pageOpacity ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <AboutUs />
                <WhatWeDo />
                <WhyChooseAlica />
                <LocationBanner />
                <Blogs />
                <Testimonials />
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/smt-tht-pcb-assembly" element={<ServicesPage serviceType="smt-tht-pcb-assembly" />} />
          <Route path="/testing-inspection" element={<ServicesPage serviceType="testing-inspection" />} />
          <Route path="/turnkey-project-delivery" element={<ServicesPage serviceType="turnkey-project-delivery" />} />
          <Route path="/end-to-end-electronic-manufacturing" element={<ServicesPage serviceType="end-to-end-electronic-manufacturing" />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route
            path="*"
            element={
              <>
                <Hero />
                <AboutUs />
                <WhatWeDo />
                <WhyChooseAlica />
                <LocationBanner />
                <Blogs />
                <Testimonials />
              </>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;