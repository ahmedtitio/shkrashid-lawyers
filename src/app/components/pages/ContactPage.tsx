import React from 'react';
import { useLanguage } from '../LanguageProvider';
import { useSettings } from '../SettingsProvider';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
import { HeroSection } from '../HeroSection';

interface ContactPageProps {
  onConsultationClick: () => void;
}

export function ContactPage({ onConsultationClick }: ContactPageProps) {
  const { t } = useLanguage();
  const settings = useSettings();

  const contactInfo = {
    phone: settings.settings?.contact?.phone || '044475234',
    mobile: settings.settings?.contact?.mobile || '+971 58 388 3441',
    email: settings.settings?.contact?.email || 'rashidalnuimiest@gmail.com',
    address: settings.settings?.contact?.address || 'UAE/Dubai/Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - Oud Metha - Malaysia Trade Centre - 3rd Floor - Office 303'
  };

  const officeHours = settings.settings?.officeHours?.map(schedule => ({
    day: schedule.day === 'mondayThursday' ? t('contact.hours.mondayThursday') :
         schedule.day === 'friday' ? t('contact.hours.friday') :
         t('contact.hours.weekend'),
    hours: schedule.hours
  })) || [
    { day: t('contact.hours.mondayThursday'), hours: '09:00 am – 04:00 pm' },
    { day: t('contact.hours.friday'), hours: '09:00 am – 12:00 pm' },
    { day: t('contact.hours.weekend'), hours: t('contact.hours.closed') }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Hero Section */}
      <HeroSection
        title={t('hero.contact.title')}
        subtitle={t('hero.contact.subtitle')}
        backgroundImage="/images/hero/pexels-sora-shimazaki-5668792.jpg"
      />

      <div className="container mx-auto px-4 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
              {t('contact.getInTouch')}
            </h2>

            <div className="space-y-6">
              {/* Phone Numbers */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <Phone className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                        {t('contact.phoneNumbers')}
                      </h3>
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        {t('contact.office')}: <a href={`tel:${contactInfo.phone}`} className="hover:underline ltr font-medium">
                          {contactInfo.phone}
                        </a>
                      </p>
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        {t('contact.mobile')}: <a href={`tel:${contactInfo.mobile}`} className="hover:underline ltr font-medium">
                          {contactInfo.mobile}
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <Mail className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                        {t('contact.emailAddress')}
                      </h3>
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="hover:underline ltr font-medium"
                        >
                          {contactInfo.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <MapPin className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                        {t('contact.officeAddress')}
                      </h3>
                      <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* {t('contact.officeHours')} */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <Clock className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                        {t('contact.officeHours')}
                      </h3>
                      <div className="space-y-2">
                        {officeHours.map((schedule, index) => (
                          <div key={index} className="flex justify-between">
                            <span style={{ color: 'var(--color-text-secondary)' }}>
                              {schedule.day}:
                            </span>
                            <span style={{ color: 'var(--color-text)' }} className="font-medium">
                              {schedule.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div>
            {/* {t('contact.quickContact')} */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                {t('contact.quickContact')}
              </h2>

              <Card className="p-6 text-center">
                <CardContent className="space-y-6">
                  <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                    {t('contact.needImmediateAssistance')}
                  </h3>

                  {/* Company Logo */}
                  <div className="flex justify-center">
                    <img
                      src="/9666898968.jpg"
                      alt="Sheikh Rashid Al Nuaimi Law Firm Logo"
                      className="w-50 h-50 object-contain"
                    />
                  </div>

                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    {t('contact.quickContactMessage')}
                  </p>

                  <div className="space-y-3">
                    <Button
                      onClick={onConsultationClick}
                      className="w-full"
                      style={{
                        backgroundColor: 'var(--color-cta)',
                        color: 'var(--color-cta-text)'
                      }}
                    >
                      {t('nav.consultation')}
                    </Button>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a href={`tel:${contactInfo.mobile}`}>{t('contact.callNow')}</a>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a
                          href={`https://wa.me/${contactInfo.mobile.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t('contact.whatsapp')}
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Map */}
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                {t('contact.location')}
              </h3>

              <Card>
                <CardContent className="p-0">
                  <div className="w-full h-64 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.1234567890123!2d55.30912345678901!3d25.23456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c5c5c5c5c5c%3A0x1234567890abcdef!2sMalaysia%20Trade%20Centre%2C%20Dubai%2C%20UAE!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Malaysia Trade Centre Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                      {t('contact.malaysiaTradeCentre')}
                    </p>
                    <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm mt-1">
                      {contactInfo.address}
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Malaysia+Trade+Centre+Dubai+UAE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm mt-2 inline-block hover:underline"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {t('contact.getDirections')} →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                {t('contact.connectWithUs')}
              </h3>

              <div className="flex gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4 mr-2" />
                    {t('contact.instagram')}
                  </a>
                </Button>

                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://wa.me/${contactInfo.mobile.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">W</span>
                    </div>
                    {t('contact.whatsappBusiness')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
