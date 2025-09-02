import React from 'react';
import { useLanguage } from '../LanguageProvider';
import { Card, CardContent } from '../ui/card';
import {
  User,
  Award,
  BookOpen,
  Globe,
  Shield,
  Star,
  Heart,
  Briefcase,
  Scale,
  Users,
  Building,
  Gavel,
  Home,
  Trophy,
  Target,
  CheckCircle
} from 'lucide-react';
import { HeroSection } from '../HeroSection';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AboutPage() {
  const { t } = useLanguage();

  const qualifications = [
    {
      icon: BookOpen,
      title: t('about.qualifications.education'),
      description: t('about.qualifications.education.desc'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100'
    },
    {
      icon: Award,
      title: t('about.qualifications.certifications'),
      description: t('about.qualifications.certifications.desc'),
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100'
    },
    {
      icon: Trophy,
      title: t('about.qualifications.experience'),
      description: t('about.qualifications.experience.desc'),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100'
    },
    {
      icon: Globe,
      title: t('about.qualifications.jurisdictions'),
      description: t('about.qualifications.jurisdictions.desc'),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: t('about.values.integrity'),
      description: t('about.values.integrity.desc'),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Star,
      title: t('about.values.excellence'),
      description: t('about.values.excellence.desc'),
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Heart,
      title: t('about.values.client'),
      description: t('about.values.client.desc'),
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const practiceAreas = [
    {
      icon: Briefcase,
      title: t('about.practice.commercial'),
      description: t('services.commercial.desc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Scale,
      title: t('about.practice.arbitration'),
      description: t('services.arbitration.desc'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: t('about.practice.family'),
      description: t('services.family.desc'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Building,
      title: t('about.practice.corporate'),
      description: t('services.formation.desc'),
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Gavel,
      title: t('about.practice.criminal'),
      description: t('services.criminal.desc'),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Home,
      title: t('about.practice.real'),
      description: t('services.real.desc'),
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Hero Section */}
      <HeroSection
        title={t('hero.about.title')}
        subtitle={t('hero.about.subtitle')}
        backgroundImage="/images/hero/pt-bg.jpg"
      />

      <div className="container mx-auto px-4 py-16">

        {/* About Sheikh Rashid Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                <h2 className="text-4xl font-bold mb-8 relative z-10" style={{ color: 'var(--color-text)' }}>
                  {t('about.sheikh.title')}
                </h2>
              </div>
              <div className="space-y-6 text-lg leading-relaxed">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <p style={{ color: 'var(--color-text-secondary)' }}>{t('about.sheikh.bio1')}</p>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <p style={{ color: 'var(--color-text-secondary)' }}>{t('about.sheikh.bio2')}</p>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <p style={{ color: 'var(--color-text-secondary)' }}>{t('about.sheikh.bio3')}</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                <div className="w-full h-200 rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="/images/hero/467742164.jpg"
                    alt="Sheikh Rashid Al Nuaimi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-accent)' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifications Section */}
        <section className="mb-20">
          <div className="rounded-3xl p-12 shadow-xl" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                {t('about.qualifications.title')}
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {qualifications.map((item, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <CardContent className="text-center p-8">
                    <div className="flex justify-center mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300`}>
                        <item.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-4" style={{ color: 'var(--color-text)' }}>
                      {item.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Firm Values Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
              {t('about.values.title')}
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              {t('about.values.mission')}
            </p>
            <div className="w-32 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-300`}>
                    <value.icon className="h-12 w-12 text-white" />
                  </div>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${value.color} opacity-20`}></div>
                </div>
                <h3 className="font-bold text-2xl mb-4 transition-colors duration-300" style={{ color: 'var(--color-text)' }}>
                  {value.title}
                </h3>
                <p className="leading-relaxed transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Practice Areas Section */}
        <section className="mb-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
              {t('about.practice.title')}
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              {t('about.practice.intro')}
            </p>
            <div className="w-40 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
              >
                <div className={`h-2 bg-gradient-to-r ${area.color}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <area.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-xl transition-colors duration-300" style={{ color: 'var(--color-text)' }}>
                      {area.title}
                    </h4>
                  </div>
                  <p className="leading-relaxed transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
