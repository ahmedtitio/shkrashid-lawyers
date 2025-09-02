import React from 'react';
import { useLanguage } from '../LanguageProvider';

export function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
            {t('terms.title')}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Last updated: [Date to be added]
          </p>
        </div>

        {/* Terms Content */}
        <div className="prose max-w-none">
          <div className="space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                1. Acceptance of Terms
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Terms acceptance clause to be added - explaining that by using the website or services, users agree to these terms]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                2. Legal Services Disclaimer
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Disclaimer about legal services to be added - explaining that website content is for informational purposes and does not constitute legal advice]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                3. Attorney-Client Relationship
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Terms regarding attorney-client relationship to be added - when it is established and what it entails]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                4. Consultation Services
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed mb-4">
                [Terms regarding consultation services to be added]
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>[Consultation term 1 to be added]</li>
                <li>[Consultation term 2 to be added]</li>
                <li>[Consultation term 3 to be added]</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                5. Fee Structure and Payment Terms
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Information about fee structure and payment terms to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                6. Confidentiality and Privilege
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Terms regarding confidentiality and attorney-client privilege to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                7. Website Use and Content
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed mb-4">
                [Terms regarding website use and content to be added]
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>[Website use term 1 to be added]</li>
                <li>[Website use term 2 to be added]</li>
                <li>[Website use term 3 to be added]</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                8. Intellectual Property Rights
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Terms regarding intellectual property rights to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                9. Limitation of Liability
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Limitation of liability clause to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                10. Jurisdiction and Governing Law
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Information about governing law and jurisdiction to be added - likely UAE law]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                11. Professional Standards and Ethics
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Information about adherence to professional standards and ethics to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                12. Termination of Services
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Terms regarding termination of legal services to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                13. Changes to Terms
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">
                [Information about how changes to terms will be communicated to be added]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                14. Contact Information
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed mb-4">
                For questions about these Terms and Conditions, please contact:
              </p>
              <div style={{ color: 'var(--color-text-secondary)' }} className="space-y-2">
                <p><strong>Sheikh Rashid bin Nasser Al Nuaimi Law Firm</strong></p>
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