import React from 'react';
import { Phone, Mail, MapPin, Instagram, Clock } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { useSettings } from './SettingsProvider';
import { CalendlyWidget } from './CalendlyWidget';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();
  const settings = useSettings();

  const contactInfo = {
    phone: settings.settings?.contact?.phone || '044475234',
    mobile: settings.settings?.contact?.mobile || '+971 58 388 3441',
    email: settings.settings?.contact?.email || 'rashidalnuimiest@gmail.com',
    address: settings.settings?.contact?.address || 'UAE/Dubai/Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - Oud Metha - Malaysia Trade Centre - 3rd Floor - Office 303'
  };

  const officeHours = settings.settings?.officeHours || [
    { day: t('contact.hours.mondayThursday'), hours: '09:00 am – 04:00 pm' },
    { day: t('contact.hours.friday'), hours: '09:00 am – 12:00 pm' },
    { day: t('contact.hours.weekend'), hours: t('contact.hours.closed') }
  ];

  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Calendly Section - بدون عناوين */}
        <div className="mb-6">
          <CalendlyWidget />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
              {t('footer.contact')}
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                <div>
                  <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                    Phone: <a href={`tel:${contactInfo.phone}`} className="hover:underline ltr">
                      {contactInfo.phone}
                    </a>
                  </p>
                  <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                    Mobile: <a href={`tel:${contactInfo.mobile}`} className="hover:underline ltr">
                      {contactInfo.mobile}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                <div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:underline ltr"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                <div>
                  <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
              <Clock className="h-5 w-5" />
              {t('contact.officeHours')}
            </h3>

            <div className="space-y-3">
              {officeHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 px-3 rounded-lg transition-colors hover:bg-accent/5">
                  <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                    {schedule.day}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
                {t('contact.needImmediateAssistance')}
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
              {t('footer.social')}
            </h3>

            <div className="flex gap-4">
              <a
                href={settings.settings?.socialMedia?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent/10"
                style={{ color: 'var(--color-text)' }}
              >
                <Instagram className="h-5 w-5" />
                <span className="text-sm">Instagram</span>
              </a>

              <a
                href={settings.settings?.socialMedia?.whatsapp || `https://wa.me/${contactInfo.mobile.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent/10"
                style={{ color: 'var(--color-text)' }}
              >
                <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">W</span>
                </div>
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-6 pt-4 text-center">
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
