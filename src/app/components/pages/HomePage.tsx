import React from 'react';
import { useLanguage } from '../LanguageProvider';
import { TestimonialsSection } from '../TestimonialsSection';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  Scale, Shield, Users, Award, Building, FileText,
  Gavel, Home, Briefcase, TrendingUp, Copyright, ShieldCheck,
  Anchor, Calculator
} from 'lucide-react';

import { HeroSection } from '../HeroSection';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useSettings } from '../SettingsProvider';

interface HomePageProps {
  onConsultationClick: () => void;
}

export function HomePage({ onConsultationClick }: HomePageProps) {
  const { t, language } = useLanguage();
  const settings = useSettings();

  const services = [
    { icon: Briefcase, key: 'commercial', color: 'text-blue-600' },
    { icon: Scale, key: 'arbitration', color: 'text-purple-600' },
    { icon: Users, key: 'family', color: 'text-pink-600' },
    { icon: Building, key: 'formation', color: 'text-green-600' },
    { icon: FileText, key: 'contracts', color: 'text-orange-600' },
    { icon: Shield, key: 'criminal', color: 'text-red-600' },
    { icon: Gavel, key: 'civil', color: 'text-indigo-600' },
    { icon: Home, key: 'real', color: 'text-yellow-600' },
    { icon: Users, key: 'employment', color: 'text-teal-600' },
    { icon: TrendingUp, key: 'banking', color: 'text-emerald-600' },
    { icon: Copyright, key: 'intellectual', color: 'text-violet-600' },
    { icon: ShieldCheck, key: 'insurance', color: 'text-cyan-600' },
    { icon: Anchor, key: 'maritime', color: 'text-blue-800' },
    { icon: Calculator, key: 'tax', color: 'text-slate-600' }
  ];

  const stats = [
    { value: '500+', key: 'cases' },
    { value: '15+', key: 'experience' },
    { value: '300+', key: 'clients' },
    { value: '95%', key: 'rate' }
  ];

  const companies = [
    {
      name: 'Emirates Airlines',
      nameAr: 'طيران الإمارات',
      location: 'Dubai International Airport',
      locationAr: 'مطار دبي الدولي',
      logo: '/images/companies/airport.jpg'
    },
    {
      name: 'ADNOC',
      nameAr: 'أدنوك',
      location: 'Abu Dhabi',
      locationAr: 'أبوظبي',
      logo: '/images/companies/adnoc.webp'
    },
    {
      name: 'Dubai Bank',
      nameAr: 'بنك دبي',
      location: 'Dubai Financial District',
      locationAr: 'الحي المالي دبي',
      logo: '/images/companies/Alpen.jpg'
    },
    {
      name: 'Etisalat',
      nameAr: 'اتصالات',
      location: 'Dubai & Abu Dhabi',
      locationAr: 'دبي وأبوظبي',
      logo: '/images/companies/webpc.webp'
    },
    {
      name: 'DP World',
      nameAr: 'موانئ دبي العالمية',
      location: 'Jebel Ali Port',
      locationAr: 'ميناء جبل علي',
      logo: '/images/companies/Vesse.jpg'
    },
    {
      name: 'Mubadala',
      nameAr: 'مبادلة',
      location: 'Abu Dhabi Global Market',
      locationAr: 'سوق أبوظبي العالمي',
      logo: '/images/companies/432345353.jfif'
    },
    {
      name: 'Dubai Mall',
      nameAr: 'دبي مول',
      location: 'Downtown Dubai',
      locationAr: 'وسط مدينة دبي',
      logo: '/images/companies/DubaiMall.avif'
    },
    {
      name: 'Mashreq Bank',
      nameAr: 'بنك المشرق',
      location: 'Dubai Creek',
      locationAr: 'خور دبي',
      logo: '/images/companies/mashreq-bank.jfif'
    },
    {
      name: 'ADCB',
      nameAr: 'بنك أبوظبي التجاري',
      location: 'Abu Dhabi Corniche',
      locationAr: 'كورنيش أبوظبي',
      logo: '/images/companies/adcb.jpg'
    },
    {
      name: 'First Abu Dhabi Bank',
      nameAr: 'بنك أبوظبي الأول',
      location: 'Abu Dhabi CBD',
      locationAr: 'منطقة الأعمال أبوظبي',
      logo: '/images/companies/CBD.webp'
    },
    {
      name: 'Jumeirah Hotels',
      nameAr: 'فنادق جميرا',
      location: 'Jumeirah Beach',
      locationAr: 'شاطئ جميرا',
      logo: '/images/companies/JumeirahHotels.webp'
    },
    {
      name: 'DAMAC Properties',
      nameAr: 'داماك العقارية',
      location: 'Business Bay',
      locationAr: 'الخليج التجاري',
      logo: '/images/companies/Damac-Properties-Dubai.webp'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={t('hero.home.title')}
        subtitle={t('hero.home.subtitle')}
        backgroundImage="/images/hero/businessman.jpg"
      >
        {/* Lawyer Photo and CTA */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mt-8">
          <div className="flex-1 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={onConsultationClick}
                size="lg"
                style={{
                  backgroundColor: 'var(--color-cta)',
                  color: 'var(--color-cta-text)'
                }}
                className="text-lg px-8 py-3 shadow-lg"
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(settings.settings?.buttons?.consultation as any)?.[language === 'ar' ? 'text_ar' : 'text_en'] || t('nav.consultation')}
              </Button>

              
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="w-48 h-64 lg:w-56 lg:h-72 rounded-lg overflow-hidden shadow-2xl border-4 border-white/20">
              <ImageWithFallback
                src="/images/hero/467742164.jpg"
                alt="Sheikh Rashid Al Nuaimi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Services Section */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              {t('services.title')}
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.key}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border-0 shadow-md"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <service.icon className={`h-10 w-10 ${service.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                    {t(`services.${service.key}`)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {t(`services.${service.key}.desc`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-cta)' }}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-cta-text)' }}>
              {t('stats.title')}
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--color-cta-text)' }}>
              {t('stats.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.key} className="text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  <Award className="h-10 w-10 text-black" />
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-cta-text)' }}>
                  {stat.value}
                </div>
                <div className="text-lg" style={{ color: 'var(--color-cta-text)' }}>
                  {t(`stats.${stat.key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Companies Section */}
      <section className="py-16 px-4" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className="group cursor-pointer"
              >
                <div
                  className="relative w-full h-32 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                  style={{
                    backgroundImage: `url(${company.logo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/60 group-hover:via-black/20" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                    <h3 className="font-bold text-sm mb-1 group-hover:text-yellow-300 transition-colors duration-300">
                      {t('nav.home') === 'الرئيسية' ? company.nameAr : company.name}
                    </h3>
                    <p className="text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {t('nav.home') === 'الرئيسية' ? company.locationAr : company.location}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: 'var(--color-highlight)' }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-white opacity-90">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onConsultationClick}
              variant="outline"
              size="lg"
              className="border-2 text-lg px-8 py-3 border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(settings.settings?.buttons?.consultation as any)?.[language === 'ar' ? 'text_ar' : 'text_en'] || t('cta.consultation')}
            </Button>
            <Button
              size="lg"
              className="text-lg px-8 py-3"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'black'
              }}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(settings.settings?.buttons?.services as any)?.[language === 'ar' ? 'text_ar' : 'text_en'] || t('cta.services')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
