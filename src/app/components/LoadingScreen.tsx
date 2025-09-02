"use client";

import React, { useState, useEffect } from 'react';
import { Scale, Shield, Briefcase } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

export function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const { language, t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { 
      icon: Scale, 
      text: language === 'ar' ? 'تحميل الخدمات القانونية' : 'Loading Legal Services',
      progress: 33 
    },
    { 
      icon: Shield, 
      text: language === 'ar' ? 'إعداد النظام الآمن' : 'Setting Up Secure System',
      progress: 66 
    },
    { 
      icon: Briefcase, 
      text: language === 'ar' ? 'تجهيز الاستشارات' : 'Preparing Consultations',
      progress: 100 
    }
  ];

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15 + 5;
          
          // Update current step based on progress
          if (newProgress >= 33 && currentStep === 0) {
            setCurrentStep(1);
          } else if (newProgress >= 66 && currentStep === 1) {
            setCurrentStep(2);
          }
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onLoadingComplete();
            }, 800);
            return 100;
          }
          return Math.min(newProgress, 100);
        });
      }, 150);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading, currentStep, onLoadingComplete]);

  if (!isLoading) return null;

  const CurrentIcon = loadingSteps[currentStep]?.icon || Scale;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1000"
      style={{ 
        background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%)',
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-5 animate-spin-slow">
          <Scale className="w-96 h-96" style={{ color: 'var(--color-accent)' }} />
        </div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-5 animate-spin-slow-reverse">
          <Shield className="w-80 h-80" style={{ color: 'var(--color-cta)' }} />
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo Section */}
        <div className="mb-8">
          <div 
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-2xl animate-pulse-gentle mb-4"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <CurrentIcon className="w-10 h-10 text-black animate-bounce-gentle" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            {language === 'ar' ? 'الشيخ راشد النعيمي' : 'Sheikh Rashid Al Nuaimi'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {language === 'ar' ? 'مكتب محاماة' : 'Law Firm'}
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <CurrentIcon className="w-5 h-5 mr-3 animate-pulse" style={{ color: 'var(--color-accent)' }} />
            <span className="text-sm font-medium animate-fade-in" style={{ color: 'var(--color-text)' }}>
              {loadingSteps[currentStep]?.text || loadingSteps[0].text}
            </span>
          </div>

          {/* Progress Bar */}
          <div 
            className="w-full h-2 rounded-full overflow-hidden shadow-inner"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
          >
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ 
                width: `${progress}%`,
                background: `linear-gradient(90deg, var(--color-accent) 0%, var(--color-cta) 100%)`
              }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="mt-3 text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading Steps Indicators */}
        <div className="flex justify-center space-x-4 mb-6">
          {loadingSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  index <= currentStep ? 'animate-pulse-gentle' : ''
                }`}
                style={{ 
                  backgroundColor: index <= currentStep ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                  transform: index === currentStep ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                <step.icon 
                  className={`w-4 h-4 ${index <= currentStep ? 'text-black' : 'text-gray-400'} transition-colors duration-500`}
                />
              </div>
              {index < loadingSteps.length - 1 && (
                <div 
                  className="w-8 h-1 mt-2 rounded"
                  style={{ 
                    backgroundColor: index < currentStep ? 'var(--color-accent)' : 'var(--color-bg-secondary)'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Loading Message */}
        <p className="text-xs opacity-70 animate-pulse" style={{ color: 'var(--color-text-secondary)' }}>
          {language === 'ar' 
            ? 'يرجى الانتظار، جاري تحميل المحتوى...' 
            : 'Please wait, loading content...'
          }
        </p>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ 
                backgroundColor: 'var(--color-accent)',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}