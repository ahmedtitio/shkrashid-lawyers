import React from 'react';
import { useLanguage } from '../LanguageProvider';

export function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
            {t('privacy.title')}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Last updated: [Date to be added]
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="prose max-w-none">
          <div className="space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                1. Introduction
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Privacy policy introduction to be added - explaining the firm&#39;s commitment to protecting client privacy and personal information]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                2. Information We Collect
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed mb-4">
                [Description of what information is collected to be added]
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>[Type of information 1 to be added]</li>
                <li>[Type of information 2 to be added]</li>
                <li>[Type of information 3 to be added]</li>
                <li>[Type of information 4 to be added]</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                3. How We Use Your Information
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed mb-4">
                [Description of how information is used to be added]
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>[Usage purpose 1 to be added]</li>
                <li>[Usage purpose 2 to be added]</li>
                <li>[Usage purpose 3 to be added]</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                4. Information Sharing and Disclosure
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Information about when and how information might be shared to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                5. Data Security
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Description of security measures to protect client information to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                6. Client Rights
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed mb-4">
                [Description of client rights regarding their personal information to be added]
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>[Client right 1 to be added]</li>
                <li>[Client right 2 to be added]</li>
                <li>[Client right 3 to be added]</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                7. Attorney-Client Privilege
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Information about attorney-client privilege and confidentiality to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                8. Website Cookies and Analytics
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Information about website cookies and analytics to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                9. Changes to This Privacy Policy
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Information about how privacy policy changes will be communicated to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                10. Contact Information
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div style={{ color: 'var(--color-text-secondary)' }} className="space-y-2">
                <p>Email: rashidalnuimiest@gmail.com</p>
                <p>Phone: 044475234</p>
                <p>Mobile: +971 58 388 3441</p>
                <p>Address: UAE/Dubai/Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - Oud Metha - Malaysia Trade Centre - 3rd Floor - Office 303</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}