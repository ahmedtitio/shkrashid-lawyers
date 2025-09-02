"use client";

import React from 'react';
import { LoadingScreen } from '../components/LoadingScreen';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationPopup } from '../components/ConsultationPopup';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { AboutPage } from '../components/pages/AboutPage';
import { Toaster } from '../components/ui/sonner';

export default function About() {
  const [isConsultationOpen, setIsConsultationOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAppReady, setIsAppReady] = React.useState(false);

  // Handle initial loading
  React.useEffect(() => {
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

  const handleConsultationClick = () => {
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
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
          currentPage="about"
          onNavigate={() => {}}
          onConsultationClick={handleConsultationClick}
        />

        {/* Main Content */}
        <main className="flex-1" style={{ paddingTop: '120px' }}>
          <AboutPage />
        </main>

        {/* Footer */}
        <Footer onNavigate={() => {}} />

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
