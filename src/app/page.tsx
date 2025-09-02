"use client";
import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConsultationPopup } from './components/ConsultationPopup';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'about' | 'contact' | 'privacy' | 'terms';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  // Handle initial loading
  useEffect(() => {
    const initializeApp = async () => {
      // Simulate loading time for resources
      const minimumLoadTime = 2000; // 2 seconds minimum
      const startTime = Date.now();

      try {
        // Wait for document to be ready
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            window.addEventListener('load', resolve);
          });
        }

        // Preload critical images
        const criticalImages = [
          'https://images.unsplash.com/photo-1733740615104-0d3d624f7557',
          'https://images.unsplash.com/photo-1528747008803-f9f5cc8f1a64'
        ];

        await Promise.all(
          criticalImages.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve; // Continue even if image fails
              img.src = src;
            });
          })
        );

        // Ensure minimum loading time for UX
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minimumLoadTime - elapsedTime;
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        setIsAppReady(true);
      } catch (error) {
        console.error('Loading error:', error);
        setIsAppReady(true); // Continue even if there's an error
      }
    };

    initializeApp();
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || 'home';
      if (['home', 'about', 'contact', 'privacy', 'terms'].includes(path)) {
        setCurrentPage(path as Page);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial page based on URL
    const initialPath = window.location.pathname.slice(1) || 'home';
    if (['home', 'about', 'contact', 'privacy', 'terms'].includes(initialPath)) {
      setCurrentPage(initialPath as Page);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);

    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultationClick = () => {
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onConsultationClick={handleConsultationClick} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage onConsultationClick={handleConsultationClick} />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage onConsultationClick={handleConsultationClick} />;
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen
        isLoading={isLoading || !isAppReady}
        onLoadingComplete={handleLoadingComplete}
      />

      {/* Main Application */}
      <div
        className={`min-h-screen flex flex-col transition-opacity duration-1000 ${
          isLoading || !isAppReady ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        {/* Header */}
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onConsultationClick={handleConsultationClick}
        />

        {/* Main Content */}
        <main className="flex-1" style={{ paddingTop: '120px' }}>
          {renderCurrentPage()}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Consultation Popup */}
        <ConsultationPopup
          isOpen={isConsultationOpen}
          onClose={handleCloseConsultation}
        />

        {/* WhatsApp Floating Button */}
        <WhatsAppFloat />

        {/* Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </>
  );
}