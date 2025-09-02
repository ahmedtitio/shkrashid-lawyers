"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Sun, Moon, Globe, Home, Users, MessageSquare, Scale, Shield, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';
import { useSettings } from './SettingsProvider';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onConsultationClick: () => void;
}

export function Header({ currentPage, onNavigate, onConsultationClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const settings = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleMobileNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const contactInfo = {
    email: settings.settings?.contact?.email || 'rashidalnuimiest@gmail.com',
    phone: settings.settings?.contact?.phone || '044475234',
    mobile: settings.settings?.contact?.mobile || '+971 58 388 3441',
    address: settings.settings?.contact?.address || 'UAE/Dubai/Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - Oud Metha - Malaysia Trade Centre - 3rd Floor - Office 303'
  };

  const navigationItems = [
    { key: 'home', label: t('nav.home'), icon: Home, href: settings.settings?.navigation?.home || '/' },
    { key: 'about', label: t('nav.about'), icon: Users, href: settings.settings?.navigation?.about || '/about' },
    { key: 'contact', label: t('nav.contact'), icon: MessageSquare, href: settings.settings?.navigation?.contact || '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      {/* Upper Header */}
      <div style={{ backgroundColor: 'var(--color-accent)' }} className="text-black py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-800" />
                <span className="font-medium">{t('header.email')}:</span>
                <a href={`mailto:${contactInfo.email}`} className="hover:underline ltr">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="font-medium">{t('header.phone')}:</span>
                <a href={`tel:${contactInfo.phone}`} className="hover:underline ltr">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="font-medium">{t('header.mobile')}:</span>
                <a href={`tel:${contactInfo.mobile}`} className="hover:underline ltr">
                  {contactInfo.mobile}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                <span className="font-medium">{t('header.address')}:</span>
                <span className="text-xs">{contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background py-4 border-b border-border/20">
        <div className="container mx-auto px-4">
          {/* Top Row - Logo and Controls */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center gap-3 cursor-pointer"
              >
                <div
                  style={{ backgroundColor: 'black' }}
                  className="w-30 h-10 sm:w-25 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 overflow-hidden"
                >
                  {language === 'ar' ? (
                    <ImageWithFallback
                      src="/logo.png"
                      alt="شعار مكتب المحاماة"
                      className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                    />
                  ) : (
                    <ImageWithFallback
                      src="/logo.png"
                      alt="Law Firm Logo"
                      className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                    />
                  )}
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
                    {language === 'ar'
                      ? 'الشيخ راشد النعيمي'
                      : 'Sheikh Rashid Al Nuaimi'
                    }
                  </h1>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {language === 'ar' ? 'مكتب محاماة' : 'Law Firm'}
                  </p>
                </div>
                {/* Mobile Logo Text */}
                <div className="sm:hidden">
                  <h1 className="text-sm font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
                    {language === 'ar'
                      ? 'الشيخ راشد النعيمي'
                      : 'S.R. Al Nuaimi'
                    }
                  </h1>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {language === 'ar' ? 'محاماة' : 'Law Firm'}
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center gap-2 ${
                    currentPage === item.key
                      ? 'text-white shadow-lg transform scale-105'
                      : 'hover:bg-accent/10 hover:shadow-md hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: currentPage === item.key ? 'var(--color-cta)' : 'transparent',
                    color: currentPage === item.key ? 'var(--color-cta-text)' : 'var(--color-text)'
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}

              <Button
                onClick={onConsultationClick}
                style={{
                  backgroundColor: 'var(--color-cta)',
                  color: 'var(--color-cta-text)'
                }}
                className="hover:opacity-90 shadow-lg flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <MessageSquare className="h-4 w-4" />
                {t('nav.consultation')}
              </Button>
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="p-2 flex items-center gap-1 sm:gap-2 hover:bg-accent/10 rounded-lg transition-colors"
                title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
              >
                {language === 'ar' ? (
                  // American flag representation (shows when current language is Arabic)
                  <div className="w-5 h-3 sm:w-6 sm:h-4 rounded-sm overflow-hidden border border-gray-300 relative shadow-sm">
                    <div className="w-full h-full bg-red-600 relative">
                      <div className="absolute top-0 left-0 w-full h-1/7 bg-white"></div>
                      <div className="absolute top-2/7 left-0 w-full h-1/7 bg-white"></div>
                      <div className="absolute top-4/7 left-0 w-full h-1/7 bg-white"></div>
                      <div className="absolute top-6/7 left-0 w-full h-1/7 bg-white"></div>
                      <div className="absolute top-0 left-0 w-2/5 h-1/2 bg-blue-800"></div>
                    </div>
                  </div>
                ) : (
                  // UAE flag representation (shows when current language is English)
                  <div className="w-5 h-3 sm:w-6 sm:h-4 rounded-sm overflow-hidden border border-gray-300 relative shadow-sm">
                    <div className="w-full h-full bg-white relative">
                      <div className="absolute top-0 left-0 w-full h-1/3 bg-green-500"></div>
                      <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white"></div>
                      <div className="absolute top-2/3 left-0 w-full h-1/3 bg-black"></div>
                      <div className="absolute top-0 left-0 w-1/4 h-full bg-red-500"></div>
                    </div>
                  </div>
                )}
                <span className="text-xs font-medium hidden sm:inline">
                  {language === 'ar' ? 'EN' : 'AR'}
                </span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Overlay */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
              <div
                className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background shadow-2xl transform transition-transform duration-300 ease-out ${
                  isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: 'black' }}
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg overflow-hidden"
                    >
                      {language === 'ar' ? (
                        <ImageWithFallback
                          src="/logo.png"
                          alt="شعار مكتب المحاماة"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageWithFallback
                          src="/logo.png"
                          alt="Law Firm Logo"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
                        {language === 'ar' ? 'القائمة' : 'Menu'}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {language === 'ar' ? 'التنقل' : 'Navigation'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-accent/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Menu Content */}
                <div className="p-6 space-y-6 bg-[rgba(5,20,43,1)]">
                  {/* Consultation Button */}
                  <Button
                    onClick={() => {
                      onConsultationClick();
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      backgroundColor: 'var(--color-cta)',
                      color: 'var(--color-cta-text)'
                    }}
                    className="w-full py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl"
                  >
                    <MessageSquare className="h-6 w-6" />
                    {t('nav.consultation')}
                  </Button>

                  {/* Navigation Items */}
                  <nav className="space-y-3">
                    {navigationItems.map((item, index) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`w-full px-6 py-4 rounded-xl transition-all duration-200 font-medium flex items-center gap-4 transform hover:scale-105 ${
                          currentPage === item.key
                            ? 'text-white shadow-lg scale-105'
                            : 'hover:bg-accent/10 hover:shadow-md'
                        }`}
                        style={{
                          backgroundColor: currentPage === item.key ? 'var(--color-cta)' : 'var(--color-bg-secondary)',
                          color: currentPage === item.key ? 'var(--color-cta-text)' : 'var(--color-text)',
                          animationDelay: `${index * 50}ms`,
                          animation: isMobileMenuOpen ? 'slideInFromRight 0.3s ease-out forwards' : ''
                        }}
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="text-lg">{item.label}</span>
                        {currentPage === item.key && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </Link>
                    ))}
                  </nav>

                  {/* Settings Section */}
                  <div className="pt-6 border-t border-border/20 space-y-3">
                    <h4 className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      {language === 'ar' ? 'الإعدادات' : 'Settings'}
                    </h4>

                    {/* Theme Toggle */}
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-4 hover:bg-accent/10 hover:scale-105"
                      style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)' }}
                    >
                      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      <span>{theme === 'light' ? (language === 'ar' ? 'الوضع المظلم' : 'Dark Mode') : (language === 'ar' ? 'الوضع المضيء' : 'Light Mode')}</span>
                    </button>

                    {/* Language Toggle */}
                    <button
                      onClick={() => {
                        toggleLanguage();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-4 hover:bg-accent/10 hover:scale-105"
                      style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)' }}
                    >
                      {language === 'ar' ? (
                        <div className="w-6 h-4 rounded-sm overflow-hidden border border-gray-300 relative shadow-sm">
                          <div className="w-full h-full bg-red-600 relative">
                            <div className="absolute top-0 left-0 w-full h-1/7 bg-white"></div>
                            <div className="absolute top-2/7 left-0 w-full h-1/7 bg-white"></div>
                            <div className="absolute top-4/7 left-0 w-full h-1/7 bg-white"></div>
                            <div className="absolute top-6/7 left-0 w-full h-1/7 bg-white"></div>
                            <div className="absolute top-0 left-0 w-2/5 h-1/2 bg-blue-800"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-6 h-4 rounded-sm overflow-hidden border border-gray-300 relative shadow-sm">
                          <div className="w-full h-full bg-white relative">
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-green-500"></div>
                            <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white"></div>
                            <div className="absolute top-2/3 left-0 w-full h-1/3 bg-black"></div>
                            <div className="absolute top-0 left-0 w-1/4 h-full bg-red-500"></div>
                          </div>
                        </div>
                      )}
                      <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
